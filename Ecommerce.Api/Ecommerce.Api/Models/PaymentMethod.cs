using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class PaymentMethod
    {
        [Key]
        public int id { get; set; }
        [Required, StringLength(600)]
        public string Type { get; set; }
        [StringLength(500)]
        public string Provider { get; set; } = string.Empty;
        public bool IsAvailable { get; set; } = true;
        [StringLength(1000)]
        public string Reason { get; set; } = string.Empty;
    }
}
