namespace Ecommerce.Api.Services.CartService
{
    public interface ICartService
    {
        Task<bool> InsertToCartAsync(string userId, int productId);
    }
}
