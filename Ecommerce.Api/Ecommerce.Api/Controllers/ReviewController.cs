using Ecommerce.Api.Models.Dto;
using Ecommerce.Api.Services.AuthService;
using Ecommerce.Api.Services.ProductCategoryService;
using Ecommerce.Api.Services.ReviewService;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IDataAccess _dataAccess;
        private readonly IAuthService _authService;
        public ReviewController(IReviewService reviewService, IDataAccess dataAccess, IAuthService authService)
        {
            _reviewService = reviewService;
            _dataAccess = dataAccess;
            _authService = authService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddReviewAsync([FromBody] ReviewDto review)
        {
            if (review == null)
            {
                return BadRequest(new
                {
                    message = "Review Can Not Be Empty"
                });
            }
            var result = await _reviewService.AddReviewAsync(review);
            if (!string.IsNullOrEmpty(result))
            {
                return BadRequest(result);
            }

            return Ok();
        }

        [HttpGet("get-product-reviews/{ProductId}")]
        public IActionResult GetProductReviews(int ProductId)
        {
            var reviews = _reviewService.GetReviewsByProductIdAsync(ProductId);
            if (reviews == null)
            {
                return NotFound(new { message = "There Is No Reviews For This Product Yet" });
            }

            return Ok(reviews);
        }
    }
}
