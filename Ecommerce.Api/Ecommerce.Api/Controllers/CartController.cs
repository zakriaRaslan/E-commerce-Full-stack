using Ecommerce.Api.Services.CartService;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("add/{userId}/{productId}")]
        public async Task<IActionResult> AddToCartAsync(string userId, int productId)
        {
            var result = await _cartService.InsertToCartAsync(userId, productId);
            if (result == false)
            {
                return BadRequest("Not Inserted");
            }
            else
            {
                return Ok("Inserted");
            }

        }
    }
}
