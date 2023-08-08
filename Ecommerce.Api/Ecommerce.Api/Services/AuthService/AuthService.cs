using Ecommerce.Api.Helpers;
using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecommerce.Api.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManger;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;


        public AuthService(UserManager<AppUser> userManger, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            _userManger = userManger;
            _roleManager = roleManager;
            _jwt = jwt.Value;
        }



        public async Task<AuthModel> RegisterAsync(RegisterModel model)
        {
            if (model == null)
            {
                return new AuthModel { Message = "User Can Not Be Null" };
            }
            if (await _userManger.FindByEmailAsync(model.Email) != null)
            {
                return new AuthModel()
                {
                    Message = "Email Or UserName Is Already Exist"
                };
            }
            if (await _userManger.FindByNameAsync(model.UserName) != null)
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
                Mobile = model.Mobile,
                CreatedAt = DateTime.Now.ToString(),
            };
            var result = await _userManger.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach (var error in result.Errors)
                {
                    errors += $"{error.Description},";
                }
                return new AuthModel { Message = errors };
            }
            await _userManger.AddToRoleAsync(user, UserRole.User);
            return new AuthModel
            {
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
            var user = await _userManger.FindByEmailAsync(model.Email);
            if (user == null || !await _userManger.CheckPasswordAsync(user, model.Password))
            {
                authModel.Message = "Email Or Password Is Invalid";
                return authModel;
            }
            var JwtToken = await CreateJwtTokenAsync(user);
            var userRole = await _userManger.GetRolesAsync(user);
            authModel.Message = "Login Successfully";
            authModel.Email = user.Email;
            authModel.IsAuthenticated = true;
            authModel.Roles = userRole.ToList();
            authModel.Token = JwtHandler.WriteToken(JwtToken);

            return authModel;
        }

        public async Task<AppUser> GetUserById(string id)
        {
            return await _userManger.FindByIdAsync(id);
        }

        private async Task<JwtSecurityToken> CreateJwtTokenAsync(AppUser user)
        {
            var userClaims = await _userManger.GetClaimsAsync(user);
            var roles = await _userManger.GetRolesAsync(user);
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
                new Claim("Mobile",user.Mobile),
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
                expires: DateTime.Now.AddDays(_jwt.DurationInDays)
                );
            return JwtSecurityToken;
        }


    }
}
