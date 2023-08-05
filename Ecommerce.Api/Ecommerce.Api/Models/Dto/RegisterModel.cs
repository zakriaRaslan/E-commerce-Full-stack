using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class RegisterModel
    {
        [StringLength(50)]
        public required string FirstName { get; set; }
        [StringLength(50)]
        public required string LastName { get; set; }
        [StringLength(50)]
        public required string UserName { get; set; }
        [StringLength(50)]
        public required string Email { get; set; }
        [StringLength(50)]
        public required string Password { get; set; }
        [StringLength(50)]
        public required string Mobile { get; set; }
        [StringLength(50)]
        public required string Address { get; set; }

    }
}
