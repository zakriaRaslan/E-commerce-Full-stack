using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class CartItems
    {
        [Key]
        public int ItemCartId { get; set; }
        public int CartId { get; set; }
        public int SalesProductId { get; set; }
        public int Quantity { get; set; }
        public int OriginalProductId { get; set; }
        public SalesProduct SalesProduct { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
