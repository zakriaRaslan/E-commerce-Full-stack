using Ecommerce.Api.Helpers;
using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Ecommerce.Api.Services.EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Ecommerce.Api.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _config;


        public AuthService(UserManager<AppUser> userManger, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt, IEmailService emailService, IConfiguration config)
        {
            _userManager = userManger;
            _roleManager = roleManager;
            _jwt = jwt.Value;
            _emailService = emailService;
            _config = config;
        }



        public async Task<AuthModel> RegisterAsync(RegisterModel model)
        {
            if (model == null)
            {
                return new AuthModel { Message = "User Can Not Be Null" };
            }
            if (await _userManager.FindByEmailAsync(model.Email) != null)
            {
                return new AuthModel()
                {
                    Message = "Email Or UserName Is Already Exist"
                };
            }
            if (await _userManager.FindByNameAsync(model.UserName) != null)
            {
                return new AuthModel()
                {
                    Message = "Email Or UserName Is Already Exist"
                };
            }

            var user = new AppUser
            {
                Email = model.Email,
                UserName = model.UserName,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                PhoneNumber = model.Mobile,
                CreatedAt = DateTime.Now.ToString(),
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach (var error in result.Errors)
                {
                    errors += $"{error.Description},";
                }
                return new AuthModel { Message = errors };
            }
            await _userManager.AddToRoleAsync(user, UserRole.User);
            var JwtToken = await GenerateJwtTokenAsync(user);
            var refreshToken = GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);
            return new AuthModel
            {
                Token = new JwtSecurityTokenHandler().WriteToken(JwtToken),
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiration = refreshToken.ExpiresOn,
                Email = model.Email,
                IsAuthenticated = true,
                Message = "Registered Successfully",
                Roles = new List<string> { UserRole.User },

            };

        }

        public async Task<AuthModel> GetTokenAsync(GetTokenModel model)
        {
            var authModel = new AuthModel();
            var JwtHandler = new JwtSecurityTokenHandler();
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authModel.Message = "Email Or Password Is Invalid";
                return authModel;
            }
            var JwtToken = await GenerateJwtTokenAsync(user);
            var userRole = await _userManager.GetRolesAsync(user);
            authModel.Message = "Login Successfully";
            authModel.Email = user.Email;
            authModel.IsAuthenticated = true;
            authModel.Roles = userRole.ToList();
            authModel.Token = JwtHandler.WriteToken(JwtToken);

            if (user.RefreshTokens.Any(r => r.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.First(r => r.IsActive);
                authModel.RefreshToken = activeRefreshToken.Token;
                authModel.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;
            }
            else
            {
                var newRefreshToken = GenerateRefreshToken();
                user.RefreshTokens.Add(newRefreshToken);
                await _userManager.UpdateAsync(user);
                authModel.RefreshToken = newRefreshToken.Token;
                authModel.RefreshTokenExpiration = newRefreshToken.ExpiresOn;
            }

            return authModel;
        }

        public async Task<AuthModel> RefreshTokenAsync(string refreshtoken)
        {
            var authModel = new AuthModel();
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(r => r.Token == refreshtoken));
            if (user == null)
            {
                authModel.Message = "Invalid Token";
                return authModel;
            }
            var refreshToken = user.RefreshTokens.Single(r => r.Token == refreshtoken);
            if (!refreshToken.IsActive)
            {
                authModel.Message = "Inactive Token";
                return authModel;
            }
            refreshToken.RevokedOn = DateTime.UtcNow;
            var newRefreshToken = GenerateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            await _userManager.UpdateAsync(user);
            var JwtToken = await GenerateJwtTokenAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);
            authModel.IsAuthenticated = true;
            authModel.Email = user.Email;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(JwtToken);
            authModel.RefreshToken = newRefreshToken.Token;
            authModel.RefreshTokenExpiration = newRefreshToken.ExpiresOn;
            authModel.Roles = userRoles.ToList();

            return authModel;

        }

        public async Task<string> AddToRoleAsync(AddToRoleDto model)
        {
            var user = await _userManager.FindByIdAsync(model.userId);
            if (user == null || !await _roleManager.RoleExistsAsync(model.roleName))
            {
                return "Inavild User ID Or Role";
            }
            if (await _userManager.IsInRoleAsync(user, model.roleName))
            {
                return "User Is Already Assigned To This Role";
            }

            var result = await _userManager.AddToRoleAsync(user, model.roleName);

            return result.Succeeded ? string.Empty : "SomeThing Went Wrong";
        }
        public async Task<AppUser> GetUserById(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }
        public async Task<AuthModel> ModfiyUserAsync(ModifyUserDto model)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var authModel = new AuthModel();
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (!await _userManager.CheckPasswordAsync(user, model.password))
            {
                authModel.Message = "Incorrect Password";
                return authModel;
            }
            if (user == null)
            {
                authModel.Message = "This User Does Not Exist";
                return authModel;
            }
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Address = model.Address;
            user.PhoneNumber = model.Mobile;
            user.ModifiedAt = DateTime.Now.ToString();
            await _userManager.UpdateAsync(user);

            var jwtToken = await GenerateJwtTokenAsync(user);
            var userRole = await _userManager.GetRolesAsync(user);
            authModel.Message = "User Modfied Successfuly";
            authModel.Email = user.Email;
            authModel.IsAuthenticated = true;
            authModel.Roles = userRole.ToList();
            authModel.Token = jwtHandler.WriteToken(jwtToken);

            if (user.RefreshTokens.Any(r => r.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.First(r => r.IsActive);
                authModel.RefreshToken = activeRefreshToken.Token;
                authModel.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;
            }
            else
            {
                var newRefreshToken = GenerateRefreshToken();
                user.RefreshTokens.Add(newRefreshToken);
                await _userManager.UpdateAsync(user);
                authModel.RefreshToken = newRefreshToken.Token;
                authModel.RefreshTokenExpiration = newRefreshToken.ExpiresOn;
            }
            return authModel;

        }
        public async Task<bool> RevokeTokenAsync(string token)
        {
            var authModel = new AuthModel();
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(r => r.Token == token));
            if (user == null)
            {
                return false;
            }
            var refreshToken = user.RefreshTokens.Single(r => r.Token == token);
            if (!refreshToken.IsActive)
            {
                return false;
            }
            refreshToken.ExpiresOn = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);
            return true;
        }

        public async Task<List<UserInfoDto>> GetUsersInfoAsync()
        {
            var users = new List<UserInfoDto>();
            var allusers = await _userManager.Users.ToListAsync();
            foreach (var user in allusers)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var userinfo = new UserInfoDto()
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    UserName = user.UserName,
                    Address = user.Address,
                    Mobile = user.PhoneNumber,
                    Roles = userRoles.ToList(),
                };
                users.Add(userinfo);
            }
            return users;
        }

        public async Task<AuthModel> ChangePasswordAsync(ChangePasswordDto model)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var authModel = new AuthModel();
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                authModel.Message = "Something Went Wrong";
                return authModel;
            }
            if (!await _userManager.CheckPasswordAsync(user, model.OldPassword))
            {
                authModel.Message = "Incorrect Password";
                return authModel;
            }
            await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            var jwtToken = await GenerateJwtTokenAsync(user);
            var userRole = await _userManager.GetRolesAsync(user);
            authModel.Message = "Password Changed Successfuly";
            authModel.Email = user.Email;
            authModel.IsAuthenticated = true;
            authModel.Roles = userRole.ToList();
            authModel.Token = jwtHandler.WriteToken(jwtToken);

            if (user.RefreshTokens.Any(r => r.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.First(r => r.IsActive);
                authModel.RefreshToken = activeRefreshToken.Token;
                authModel.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;
            }
            else
            {
                var newRefreshToken = GenerateRefreshToken();
                user.RefreshTokens.Add(newRefreshToken);
                await _userManager.UpdateAsync(user);
                authModel.RefreshToken = newRefreshToken.Token;
                authModel.RefreshTokenExpiration = newRefreshToken.ExpiresOn;
            }
            return authModel;
        }

        public async Task<string> SendResetPasswordEmailAsync(string email)
        {
            var errorMessage = string.Empty;
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                errorMessage = "This Email Does Not  Exist";
                return errorMessage;
            }
            var emailToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordTokenExpiry = DateTime.Now.AddHours(1);
            string from = _config["EmailSettings:From"];
            var emailModel = new EmailModel(email, "Reset Password!", EmailBody.EmailStringBody(email, emailToken));
            _emailService.SendEmail(emailModel);
            await _userManager.UpdateAsync(user);
            return errorMessage;

        }

        public async Task<string> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var errorMessage = string.Empty;
            var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == resetPasswordDto.Email);
            if (user == null)
            {
                errorMessage = "This User Does Not  Exist";
                return errorMessage;
            }

            var token = user.ResetPasswordToken;
            DateTime emailTokenExpiry = user.ResetPasswordTokenExpiry;
            if (token != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
            {
                errorMessage = "Invalid Reset Password Token";
                return errorMessage;
            }

            if (user.PasswordHash != null)
            {
                await _userManager.RemovePasswordAsync(user);
            }

            await _userManager.AddPasswordAsync(user, resetPasswordDto.Password);
            await _userManager.UpdateAsync(user);
            //  await _userManger.ResetPasswordAsync(user, resetPasswordDto.EmailToken, resetPasswordDto.Password);
            //await _userManger.UpdateAsync(user);
            return errorMessage;
        }

        public async Task<UserInfoDto> GetUserByIdAsync(string userId)
        {
            var userInfo = new UserInfoDto();
            var user = await _userManager.FindByIdAsync(userId);
            var userRoles = await _userManager.GetRolesAsync(user);
            userInfo.UserId = userId;
            userInfo.UserName = user.UserName;
            userInfo.Email = user.Email;
            userInfo.FirstName = user.FirstName;
            userInfo.LastName = user.LastName;
            userInfo.Address = user.Address;
            userInfo.Mobile = user.PhoneNumber;
            userInfo.Roles = userRoles.ToList();

            return userInfo;
        }

        public async Task<bool> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
                return true;
            }
            return false;
        }
        private async Task<JwtSecurityToken> GenerateJwtTokenAsync(AppUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
            foreach (var role in roles)
            {
                roleClaims.Add(new Claim("role", role));
            }
            var Claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Name,user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName,user.LastName),
                new Claim(JwtRegisteredClaimNames.Sub,user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim("uId",user.Id),
                new Claim("CreatedAt",user.CreatedAt),
                new Claim("Mobile",user.PhoneNumber),
                new Claim("Address",user.Address),
                new Claim("ModifiedAt",user.ModifiedAt)
            }.Union(userClaims).Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredantails = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var JwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                signingCredentials: signingCredantails,
                claims: Claims,
                expires: DateTime.Now.AddMinutes(_jwt.DurationInMinutes)
                );

            return JwtSecurityToken;
        }

        //private RefreshToken GenerateRefreshToken()
        //{
        //    var randomNumber = new byte[32];
        //    using var generator = new RNGCryptoServiceProvider();
        //    generator.GetBytes(randomNumber);
        //    return new RefreshToken
        //    {
        //        Token = Convert.ToBase64String(randomNumber),
        //        CreatedOn = DateTime.UtcNow,
        //        ExpiresOn = DateTime.UtcNow.AddDays(10),
        //    };

        //}
        private RefreshToken GenerateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);
            var TokenIsInUser = _userManager.Users.Any(u => u.RefreshTokens.Any(r => r.Token == refreshToken));
            if (TokenIsInUser)
            {
                return GenerateRefreshToken();
            }
            return new RefreshToken
            {
                Token = refreshToken,
                CreatedOn = DateTime.UtcNow,
                ExpiresOn = DateTime.UtcNow.AddDays(10),
            };

        }

    }
}
