using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Api.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;
        private readonly UserManager<AppUser> _userManger;
        public OrderService(AppDbContext context, UserManager<AppUser> userManger)
        {
            _context = context;
            _userManger = userManger;
        }

        public async Task<List<PaymentMethod>> GetPaymentMethodsAsync()
        {
            return await _context.PaymentMethods.ToListAsync();
        }


        public async Task<string> SaveOrderAsync(OrderDto orderDto)
        {
            string Message = "";
            var Order = new Order();
            var Payment = new Payment();
            var Cart = await _context.ShoppingCart.FindAsync(orderDto.CartId);
            if (Cart == null) { return Message = "Cant Find This Cart"; }
            var User = await _userManger.FindByIdAsync(orderDto.UserId);
            if (User == null) { return Message = "This User Does Not Exist"; }
            Payment.ShippingCharges = orderDto.ShippingCharges;
            Payment.AmountPaid = orderDto.AmountPaid;
            Payment.AmountReduced = orderDto.AmountReduced;
            Payment.TotalPrice = orderDto.TotalPrice;
            Payment.PaymentMethodId = orderDto.PaymentMethod.id;
            Payment.CreatedAT = DateTime.Now;
            Order.CartId = Cart.Id;
            Order.User = User;
            Order.Payment = Payment;
            Order.UserId = orderDto.UserId;
            Order.PaymentId = Payment.Id;
            Order.CreatedAt = DateTime.Now;
            Cart.OrderedAt = DateTime.Now;
            Cart.IsOrdered = true;
            await _context.Payments.AddAsync(Payment);
            await _context.Orders.AddAsync(Order);
            await _context.SaveChangesAsync();
            return Message;
        }
    }
}
