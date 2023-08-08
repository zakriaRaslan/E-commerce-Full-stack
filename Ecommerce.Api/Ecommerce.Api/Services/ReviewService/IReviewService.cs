using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.ReviewService
{
    public interface IReviewService
    {
        Task<string> AddReviewAsync(ReviewDto reviewDto);
        List<Review> GetReviewsByProductIdAsync(int productId);
    }
}
