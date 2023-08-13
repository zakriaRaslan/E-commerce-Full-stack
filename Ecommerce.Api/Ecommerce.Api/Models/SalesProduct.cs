using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class SalesProduct
    {
        [Key]
        public int SalesProductId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int discount { get; set; }
        public string ImageName { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public bool IsSaled { get; set; }
        public int CartItemsId { get; set; }
        // public int OriginalProductId { get; set; }


    }
}
