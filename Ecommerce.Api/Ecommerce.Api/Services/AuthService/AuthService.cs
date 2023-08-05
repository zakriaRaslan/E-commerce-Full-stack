using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Api.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManger;
        private readonly RoleManager<IdentityRole> _roleManager;


        public AuthService(UserManager<AppUser> userManger, RoleManager<IdentityRole> roleManager)
        {
            _userManger = userManger;
            _roleManager = roleManager;
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
                FirstName = model.FirstName,
                LastName = model.LastName,
                IsAuthenticated = true,
                Message = "Registered Successfully"
            };

        }
    }
}
