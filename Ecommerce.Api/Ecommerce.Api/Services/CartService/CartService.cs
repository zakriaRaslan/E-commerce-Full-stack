using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
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
        public async Task<bool> AddToCartItemsAsync(InsertItemToCartDTO insertModel)
        {
            var cart = GetCartByUserId(insertModel.UserId);
            if (cart == null)
            {
                cart = await MakeCartAsync(insertModel.UserId);
            }
            var product = await _context.products.Where(x => x.ProductId == insertModel.ProductId)
                .Include(x => x.Category)
                .Include(x => x.Offer).SingleOrDefaultAsync();
            var SalesProduct = new SalesProduct()
            {
                Price = product.Price,
                Description = product.Description,
                ImageName = product.ImageName,
                Category = product.Category.Category,
                discount = product.Offer.Discount,
                IsSaled = false,
                SubCategory = product.Category.Subcategory,
                Title = product.Title,
                Quantity = insertModel.quantity,
            };
            var cartItems = new CartItems()
            {
                CartId = cart.Id,
                Quantity = insertModel.quantity,
                CreatedAt = DateTime.Now,
                SalesProduct = SalesProduct,
                SalesProductId = SalesProduct.SalesProductId,
                OriginalProductId = product.ProductId
            };
            await _context.CartItems.AddAsync(cartItems);
            product.Quantity -= insertModel.quantity;
            await _context.SaveChangesAsync();
            SalesProduct.CartItemsId = cartItems.ItemCartId;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Cart> RemoveFromCartAsync(int cartId, int cartItemId)
        {

            var cart = await _context.ShoppingCart.Where(x => x.Id == cartId).Include(x => x.User)
                .Include(x => x.CartItems).ThenInclude(x => x.SalesProduct).SingleOrDefaultAsync();
            var cartItem = cart.CartItems.Where(x => x.ItemCartId == cartItemId).SingleOrDefault();
            var Originalproduct = await _context.products.FindAsync(cartItem.OriginalProductId);
            var ReturnQuantity = cartItem.Quantity;
            _context.SalesProducts.Remove(cartItem.SalesProduct);
            _context.CartItems.Remove(cartItem);
            Originalproduct.Quantity += ReturnQuantity;
            await _context.SaveChangesAsync();
            return cart;
        }

        public async Task<Cart> GetActiveCartAsync(string userId)
        {
            var cart = await _context.ShoppingCart.Where(x => x.IsOrdered == false && x.UserId == userId)
                .Include(x => x.CartItems).ThenInclude(x => x.SalesProduct)
                .Include(x => x.User).FirstOrDefaultAsync();
            if (cart == null)
            {
                cart = await MakeCartAsync(userId);
            }
            return cart;
        }

        public async Task<List<Cart>> GetAllPreviousUserCartsAsync(string userId)
        {
            var carts = await _context.ShoppingCart.Where(x => x.IsOrdered == true && x.UserId == userId)
                .Include(x => x.CartItems).ThenInclude(x => x.SalesProduct).OrderByDescending(x => x.Id).ToListAsync();
            return carts;
        }


    }
}
