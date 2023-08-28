namespace Ecommerce.Api.Models.Dto
{
    public class UserInfoDto
    {
        public string UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string Address { get; set; }
        public List<string> Roles { get; set; }
    }
}
