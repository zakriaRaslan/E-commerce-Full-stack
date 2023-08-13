using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Api.Models.Dto
{
    [NotMapped]
    public class OrderDto
    {
        public string UserId { get; set; }
        public int CartId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public int TotalPrice { get; set; }
        public int ShippingCharges { get; set; }
        public int AmountPaid { get; set; }
        public int AmountReduced { get; set; }
    }
}
