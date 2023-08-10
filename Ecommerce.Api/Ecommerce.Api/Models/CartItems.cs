using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class CartItems
    {
        [Key]
        public int ItemCartId { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; } // relationship one-to-one
    }
}
