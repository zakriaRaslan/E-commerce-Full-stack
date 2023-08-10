using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Ecommerce.Api.Services.ProductCategoryService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Cart> MakeCartAsync(string userId)
        {
            Cart cart = new Cart()
            {
                CreatedDate = DateTime.Now,
                IsOrdered = false,
                UserId = userId,
            };
            await _context.ShoppingCart.AddAsync(cart);
            await _context.SaveChangesAsync();
            return cart;
        }
        public List<Cart> GetCarts(string userId)
        {
            var carts = new List<Cart>();
            carts = _context.ShoppingCart.Where(x => x.UserId == userId).Include(x => x.CartItems).ToList();
            return carts;
        }
        public Cart GetCartByUserId(string userId)
        {
            return _context.ShoppingCart.Where(x => x.IsOrdered == false && x.UserId == userId).FirstOrDefault();
        }
        public async Task<bool> InsertToCartItemsAsync(string userId, int productId)
        {
            var cart = GetCartByUserId(userId);
            if (cart == null)
            {
                cart = await MakeCartAsync(userId);
            }
            var product = await _context.products.AsNoTracking().Where(x => x.ProductId == productId)
                .Include(x => x.Category).Include(x => x.Offer).FirstOrDefaultAsync();

            var cartItems = new CartItems()
            {
                CartId = cart.Id,
                ProductId = productId,
                Product = product,
            };
            cartItems.Product.Category.CategoryId = 0;
            cartItems.Product.ProductId = 0;
            cartItems.Product.Offer.OfferId = 0;
            await _context.CartItems.AddAsync(cartItems);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Cart> RemoveFromCartAsync(string userId, int productId)
        {
            var cart = GetCartByUserId(userId);
            if (cart == null)
            {
                cart = await MakeCartAsync(userId);
            }
            var itmeToRemove = cart.CartItems.FirstOrDefault(x => x.ProductId == productId);
            cart.CartItems.Remove(itmeToRemove);
            return cart;
        }

        public async Task<Cart> GetActiveCartAsync(string userId)
        {
            var cart = await _context.ShoppingCart.Where(x => x.IsOrdered == false)
                .Include(x => x.CartItems)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Offer)
                .Include(x => x.CartItems)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .FirstOrDefaultAsync();

            return cart;
        }

        public async Task<List<Cart>> GetAllPreviousUserCartsAsync(string userId)
        {
            var carts = await _context.ShoppingCart.Where(x => x.IsOrdered == true && x.UserId == userId)
                 .Include(x => x.CartItems).ThenInclude(x => x.Product)
                 .ThenInclude(x => x.Offer).Include(x => x.CartItems)
                 .ThenInclude(x => x.Product).ThenInclude(x => x.Category)
                 .ToListAsync();
            return carts;
        }
    }
}
