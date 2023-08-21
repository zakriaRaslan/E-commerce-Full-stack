using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class GetTokenModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
