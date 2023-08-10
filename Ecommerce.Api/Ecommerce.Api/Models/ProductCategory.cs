using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Api.Models
{
    public class ProductCategory
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        [Key]
        public int CategoryId { get; set; }
        public string Category { get; set; } = "";
        public string Subcategory { get; set; } = "";
    }
}
