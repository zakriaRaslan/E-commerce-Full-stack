using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class CategoryDto
    {
        [Required, StringLength(100)]
        public string Category { get; set; }
        [Required, StringLength(100)]
        public string Subcategory { get; set; }
    }
}
