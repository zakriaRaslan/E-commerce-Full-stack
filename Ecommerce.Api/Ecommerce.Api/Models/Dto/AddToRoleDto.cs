using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Api.Models.Dto
{
    public class AddToRoleDto
    {
        [Required]
        public string userId { get; set; }
        [Required]
        public string roleName { get; set; }
    }
}
