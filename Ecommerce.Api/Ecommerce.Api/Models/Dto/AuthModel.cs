namespace Ecommerce.Api.Models.Dto
{
    public class AuthModel
    {
        public string Message { get; set; }
        public Boolean IsAuthenticated { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }

    }
}
