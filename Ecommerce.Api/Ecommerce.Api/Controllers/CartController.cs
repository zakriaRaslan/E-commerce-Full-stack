using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Ecommerce.Api.Services.CartService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly UserManager<AppUser> _userManager;

        public CartController(ICartService cartService, UserManager<AppUser> userManager)
        {
            _cartService = cartService;
            _userManager = userManager;
        }

        [HttpPost("addcart/{userId}")]
        public async Task<IActionResult> AddUserCart(string userId)
        {
            var checkUser = await CheckUserByIdAsync(userId);
            if (!checkUser)
            {
                return NotFound(new { message = "User Does Not Exist" });
            }
            var cart = await _cartService.MakeCartAsync(userId);
            if (cart == null)
            {
                BadRequest(new { message = "Some Thing Went Wronge" });
            }
            return Ok(cart);
        }

        [HttpGet("getcarts/{userId}")]
        public async Task<IActionResult> GetCart(string userId)
        {
            var checkUser = await CheckUserByIdAsync(userId);
            if (!checkUser)
            {
                return NotFound(new { message = "User Does Not Exist" });
            }
            var carts = _cartService.GetCarts(userId);
            return Ok(carts);
        }

        [HttpPost("addtocart")]
        public async Task<IActionResult> AddToCart(InsertItemToCartDTO insertModel)
        {
            var checkUser = await CheckUserByIdAsync(insertModel.UserId);
            if (!checkUser)
            {
                return NotFound(new { message = "User Does Not Exist" });
            }
            var result = await _cartService.AddToCartItemsAsync(insertModel);
            if (!result)
            {
                return BadRequest(new { message = "Some Thing Went Wrong" });
            }
            else
            {
                return Ok(new { message = "Item Inserted Successfuly" });
            }

        }

        [HttpGet("getusercart/{userId}")]
        public async Task<IActionResult> GetUserActiveCart(string userId)
        {
            var checkUser = await CheckUserByIdAsync(userId);
            if (!checkUser)
            {
                return NotFound(new { message = "User Does Not Exist" });
            }
            var cart = await _cartService.GetActiveCartAsync(userId);
            if (cart == null)
            {
                return BadRequest(new { message = "SomeThing Went Wrong" });
            }
            return Ok(cart);
        }

        [HttpGet("get-previous-user-carts/{userId}")]
        public async Task<IActionResult> GetPreviousUserCarts(string userId)
        {
            var checkUser = await CheckUserByIdAsync(userId);
            if (!checkUser)
            {
                return NotFound(new { message = "User Does Not Exist" });
            }
            var carts = await _cartService.GetAllPreviousUserCartsAsync(userId);
            return Ok(carts);
        }
        [HttpDelete("remove-item-cart/{cartId}/{cartItemId}")]
        public async Task<IActionResult> RemoveItemFromCart(int cartId, int cartItemId)
        {
            var result = await _cartService.RemoveFromCartAsync(cartId, cartItemId);
            if (result == null) { return BadRequest(new { message = "SomeThing Went Wrong" }); }
            return Ok(result);
        }

        private async Task<bool> CheckUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
