using Ecommerce.Api.Models;

namespace Ecommerce.Api.Services.CartService
{
    public interface ICartService
    {
        Task<Cart> MakeCartAsync(string userId);
        List<Cart> GetCarts(string userId);
        Task<bool> InsertToCartItemsAsync(string userId, int productId);
        Cart GetCartByUserId(string userId);
        Task<Cart> RemoveFromCartAsync(string userId, int productId);
        Task<Cart> GetActiveCartAsync(string userId);
        Task<List<Cart>> GetAllPreviousUserCartsAsync(string userId);
    }
}
