using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Api.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;

        public AccountService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UserInfoDto> GetUserInformationAsync(string userId)
        {
            var userInfoDto = new UserInfoDto();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
            userInfoDto.UserName = user.UserName;
            userInfoDto.Email = user.Email;
            userInfoDto.Address = user.Address;
            userInfoDto.FirstName = user.FirstName;
            userInfoDto.LastName = user.LastName;
            userInfoDto.Mobile = user.Mobile;

            return userInfoDto;
        }
    }
}
