using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.AuthService
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterModel model);
    }
}
