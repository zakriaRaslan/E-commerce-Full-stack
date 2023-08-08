using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class ReviewDto
    {
        [Required]
        public string userId { get; set; }
        [Required]
        public int productId { get; set; }
        [Required]
        public string reviewValue { get; set; }

    }
}
