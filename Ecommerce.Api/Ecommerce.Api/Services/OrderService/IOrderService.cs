using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.OrderService
{
    public interface IOrderService
    {
        Task<List<PaymentMethod>> GetPaymentMethodsAsync();
        Task<string> SaveOrderAsync(OrderDto orderDto);
    }
}
