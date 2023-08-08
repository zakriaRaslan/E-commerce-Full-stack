using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public AppUser User { get; set; } = new AppUser();
        [Required]
        public Product Product { get; set; } = new Product();
        [Required]
        public string Value { get; set; }
        [Required]
        public string CreatedAt { get; set; }
    }
}
