using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        [Required]
        public int PaymentId { get; set; }
        public Payment Payment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
