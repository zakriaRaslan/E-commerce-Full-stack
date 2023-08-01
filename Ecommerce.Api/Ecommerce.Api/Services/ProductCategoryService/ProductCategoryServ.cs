using Ecommerce.Api.Data;
using Ecommerce.Api.Models;

namespace Ecommerce.Api.Services.ProductCategoryService
{
    public class ProductCategoryServ : IProductCategoryServ
    {
        private AppDbContext _context;
        public ProductCategoryServ(AppDbContext context)
        {
            _context = context;
        }

        public List<ProductCategory> GetProductCategories() => _context.productCategories.ToList();

    }
}
