using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models
{
    public class AppUser : IdentityUser
    {
        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }
        [MaxLength(100)]
        public string Address { get; set; }
        [MaxLength(20)]
        public string Mobile { get; set; }
        [MaxLength(50)]
        public string CreatedAt { get; set; }
        [MaxLength(50)]
        public string? ModifiedAt { get; set; }

    }
}
