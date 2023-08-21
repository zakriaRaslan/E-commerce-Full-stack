using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.AuthService
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterModel model);
        Task<AuthModel> GetTokenAsync(GetTokenModel model);
        Task<AppUser> GetUserById(string id);
        Task<AuthModel> RefreshTokenAsync(string token);
        Task<string> AddToRoleAsync(AddToRoleDto model);
        Task<bool> RevokeTokenAsync(string token);
        Task<List<UserInfoDto>> GetUsersInfoAsync();
    }
}
