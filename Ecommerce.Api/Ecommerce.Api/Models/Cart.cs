using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Api.Models
{
    [Table("ShoppingCart")]
    public class Cart
    {

        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public bool IsOrdered { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime OrderedAt { get; set; }
        public ICollection<CartItems> CartItems { get; set; } = new List<CartItems>(); // relationship one-to-many

    }
}
