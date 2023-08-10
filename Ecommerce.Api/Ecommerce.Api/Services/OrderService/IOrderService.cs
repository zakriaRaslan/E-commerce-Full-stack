using Ecommerce.Api.Models;

namespace Ecommerce.Api.Services.OrderService
{
    public interface IOrderService
    {
        Task<List<PaymentMethod>> GetPaymentMethodsAsync();
    }
}
