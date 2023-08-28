using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class AppUser : IdentityUser
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; }
        [Required, MaxLength(50)]
        public string LastName { get; set; }
        [Required, MaxLength(100)]
        public string Address { get; set; }
        public string CreatedAt { get; set; }
        public string ModifiedAt { get; set; } = string.Empty;
        public List<RefreshToken> RefreshTokens { get; set; }
        public string? ResetPasswordToken { get; set; }
        public DateTime ResetPasswordTokenExpiry { get; set; }
    }
}
