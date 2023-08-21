using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.AccountService
{
    public interface IAccountService
    {
        Task<UserInfoDto> GetUserInformationAsync(string userId);
    }
}
