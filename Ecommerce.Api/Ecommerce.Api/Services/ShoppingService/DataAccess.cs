using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Api.Services.ProductCategoryService
{
    public class DataAccess : IDataAccess
    {
        private AppDbContext _context;
        public DataAccess(AppDbContext context)
        {
            _context = context;
        }



        public List<ProductCategory> GetProductCategories() => _context.productCategories.ToList();
        public Offer GetOffer(int id)
        {
            throw new NotImplementedException();
        }
        public ProductCategory GetProductCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> GetProducts(string category, string subcategory, int count)
        {
            var products = _context.products.Where(x => x.Category.Category == category && x.Category.Subcategory == subcategory)
                .OrderBy(x => Guid.NewGuid()).Take(count)
                .Include(x => x.Category).Include(x => x.Offer);

            return products;
        }

        public Product GetProductById(int id)
        {
            var product = _context.products.Where(x => x.ProductId == id)
                .Include(x => x.Category).Include(x => x.Offer).FirstOrDefault();
            return product;
        }
    }

}
