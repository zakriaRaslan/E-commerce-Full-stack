using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
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

        public async Task<List<Product>> GetProductsBySubcategoryAsync(string subcategory)
        {
            var products = await _context.products.Where(x => x.Category.Subcategory == subcategory)
                .Include(x => x.Category).Include(x => x.Offer).ToListAsync();
            return products;
        }

        public Product GetProductById(int id)
        {
            var product = _context.products.Where(x => x.ProductId == id)
                .Include(x => x.Category).Include(x => x.Offer).FirstOrDefault();
            return product;
        }

        public async Task<bool> ModifyProductAsync(AddProductDto product)
        {
            var originalProduct = await _context.products.FindAsync(product.productId);
            var Category = await _context.productCategories.FindAsync(product.CategoryId);
            var Offer = await _context.Offers.FindAsync(product.OfferId);
            if (originalProduct != null)
            {
                originalProduct.Price = product.Price;
                originalProduct.Description = product.Description;
                originalProduct.Category = Category;
                originalProduct.Offer = Offer;
                originalProduct.Quantity = product.Quantity;
                originalProduct.Title = product.Title;
                await _context.SaveChangesAsync();
                return true
                ;
            }
            return false;
        }


    }

}
