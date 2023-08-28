using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class ResetPasswordDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string EmailToken { get; set; }
        [Required]
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
