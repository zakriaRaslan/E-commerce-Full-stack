using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.CartService
{
    public interface ICartService
    {
        Task<Cart> MakeCartAsync(string userId);
        List<Cart> GetCarts(string userId);
        Task<bool> AddToCartItemsAsync(InsertItemToCartDTO insertModel);
        Cart GetCartByUserId(string userId);
        Task<Cart> RemoveFromCartAsync(int cartId, int productId);
        Task<Cart> GetActiveCartAsync(string userId);
        Task<List<Cart>> GetAllPreviousUserCartsAsync(string userId);
    }
}
