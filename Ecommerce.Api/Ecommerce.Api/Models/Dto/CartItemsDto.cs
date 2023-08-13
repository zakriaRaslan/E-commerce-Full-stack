using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Api.Models.Dto
{
    [NotMapped]
    public class CartItemsDto
    {
        public int ItemCartId { get; set; }
        public int CartId { get; set; }
        public int Quantity { get; set; }
    }
}
