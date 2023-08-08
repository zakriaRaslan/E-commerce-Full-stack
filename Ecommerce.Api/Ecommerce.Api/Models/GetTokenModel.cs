namespace Ecommerce.Api.Models
{
    public class GetTokenModel
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
