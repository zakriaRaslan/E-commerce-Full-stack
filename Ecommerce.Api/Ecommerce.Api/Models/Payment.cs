using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int PaymentMethodId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        [Required, StringLength(255)]
        public int TotalPrice { get; set; }
        [Required, StringLength(255)]
        public int ShippingCharges { get; set; }
        [Required, StringLength(255)]
        public int AmountPaid { get; set; }
        [Required, StringLength(255)]
        public int AmountReduced { get; set; }
        [Required, StringLength(255)]
        public DateTime CreatedAT { get; set; }

    }
}
