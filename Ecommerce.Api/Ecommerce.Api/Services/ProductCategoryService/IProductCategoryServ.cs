using Ecommerce.Api.Models;

namespace Ecommerce.Api.Services.ProductCategoryService
{
    public interface IProductCategoryServ
    {
        List<ProductCategory> GetProductCategories();

    }
}
