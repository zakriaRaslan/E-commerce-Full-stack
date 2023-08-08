using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Api.Services.ReviewService
{
    public class ReviewService : IReviewService
    {
        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        public ReviewService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> AddReviewAsync(ReviewDto reviewDto)
        {
            var review = new Review();
            var errorMessage = string.Empty;
            var user = await _context.Users.FindAsync(reviewDto.userId);
            if (user == null)
            {
                errorMessage = "This User Is Not Exist";
                return errorMessage;
            }

            var product = await _context.products.FindAsync(reviewDto.productId);
            if (product == null)
            {
                errorMessage = "This Product Is Not Exist";
                return errorMessage;
            }

            if (reviewDto.reviewValue == null || reviewDto.reviewValue == string.Empty)
            {
                errorMessage = "Review Can Not Be Empty";
                return errorMessage;
            }
            review.User = user;
            review.Product = product;
            review.CreatedAt = DateTime.Now.ToString();
            review.Value = reviewDto.reviewValue;
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return errorMessage;
        }

        public List<Review> GetReviewsByProductIdAsync(int productId)
        {
            var reviews = new List<Review>();
            reviews = _context.Reviews.Where(x => x.Product.ProductId == productId)
                .Include(x => x.User).Include(x => x.Product).ToList();
            if (reviews == null)
            {
                return null;
            }

            return reviews;
        }
    }
}

