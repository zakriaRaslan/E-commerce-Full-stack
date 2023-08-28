using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class OfferDto
    {
        [Required, StringLength(100)]
        public string Title { get; set; }
        [Required]
        public int Discount { get; set; }
    }
}
