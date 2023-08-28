using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class ModifyUserDto
    {
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required, MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required, MaxLength(20)]
        public string Mobile { get; set; }
        [Required, MaxLength(500)]
        public string Address { get; set; }
        [Required]
        public string password { get; set; }
    }
}
