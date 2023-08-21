using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class RegisterModel
    {
        [Required, StringLength(50)]
        public string FirstName { get; set; }
        [Required, StringLength(50)]
        public string LastName { get; set; }
        [Required, StringLength(50)]
        public string UserName { get; set; }
        [Required, StringLength(50)]
        public string Email { get; set; }
        [Required, StringLength(50)]
        public string Password { get; set; }
        [Required, StringLength(50)]
        public string Mobile { get; set; }
        [Required, StringLength(50)]
        public string Address { get; set; }

    }
}
