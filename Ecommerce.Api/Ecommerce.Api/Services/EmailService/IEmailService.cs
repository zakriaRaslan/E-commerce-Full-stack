using Ecommerce.Api.Models;

namespace Ecommerce.Api.Services.EmailService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
