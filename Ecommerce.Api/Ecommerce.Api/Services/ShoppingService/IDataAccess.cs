using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;

namespace Ecommerce.Api.Services.ProductCategoryService
{
    public interface IDataAccess
    {
        List<ProductCategory> GetProductCategories();
        ProductCategory GetProductCategoryById(int id);
        Offer GetOffer(int id);
        IEnumerable<Product> GetProducts(string category, string subcategory, int count);
        Product GetProductById(int id);
        Task<List<Product>> GetProductsBySubcategoryAsync(string subcategory);
        Task<bool> ModifyProductAsync(AddProductDto product);
    }
}
