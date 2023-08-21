using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.DashboardService
{
    public interface IDashboardService
    {
        Task<bool> AddProductAsync(AddProductDto model);
        Task<List<Offer>> GetAvailabeOffersAsync();
        Task<List<ProductCategory>> GetProductCategoriesAsync();
        Task<string> DeleteProductAsync(int productId);
    }
}
