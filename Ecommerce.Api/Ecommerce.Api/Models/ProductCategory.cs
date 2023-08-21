using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class ProductCategory
    {

        [Key]
        public int CategoryId { get; set; }
        public string Category { get; set; } = "";
        public string Subcategory { get; set; } = "";
    }
}
