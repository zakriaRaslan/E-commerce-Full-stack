using Ecommerce.Api.Models;

namespace Ecommerce.Api.Services.ProductCategoryService
{
    public interface IDataAccess
    {
        List<ProductCategory> GetProductCategories();
        ProductCategory GetProductCategoryById(int id);
        Offer GetOffer(int id);
        IEnumerable<Product> GetProducts(string category, string subcategory, int count);
        Product GetProductById(int id);
    }
}
