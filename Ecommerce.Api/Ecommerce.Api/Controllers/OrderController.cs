using Ecommerce.Api.Models.Dto;
using Ecommerce.Api.Services.OrderService;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("get-payment-methods")]
        public async Task<IActionResult> GetPaymentMethods()
        {
            var paymentMethods = await _orderService.GetPaymentMethodsAsync();
            if (paymentMethods == null)
            {
                return BadRequest(new { message = "Some Thing Went Wrong" });
            }
            return Ok(paymentMethods);
        }

        [HttpPost("save-order")]
        public async Task<IActionResult> SaveOrder(OrderDto orderDto)
        {
            var result = await _orderService.SaveOrderAsync(orderDto);
            if (!string.IsNullOrEmpty(result)) { return BadRequest(result); }
            result = "Payment Successfully.. Order Is Being Placed'";
            return Ok(result);
        }
    }
}
