using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Ecommerce.Api.Services.ProductCategoryService;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Api.Services.CartService
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IDataAccess _dataAccess;
        public CartService(AppDbContext context, UserManager<AppUser> userManager, IDataAccess dataAccess)
        {
            _context = context;
            _userManager = userManager;
            _dataAccess = dataAccess;
        }

        public Task<bool> InsertToCartAsync(string userId, int productId)
        {
            throw new NotImplementedException();
        }

        /**    public async Task<bool> InsertToCartAsync(string userId, int productId)
            {

                var product = _dataAccess.GetProductById(productId);
                if (product == null)
                {
                    return false;
                }
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return false;
                }
                var cart = new Cart()
                {
                    User = user,
                    CreatedOn = DateTime.Now.ToString(),

                };
                var cartItem = new CartItems()
                {
                    Product = product,

                };
                await _context.Carts.AddAsync(cart);
                await _context.CartItems.AddAsync(cartItem);
                await _context.SaveChangesAsync();
                return true;
            }**/
    }
}
