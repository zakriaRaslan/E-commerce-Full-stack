using Ecommerce.Api.Data;
using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Api.Services.DashboardService
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductCategory>> GetProductCategoriesAsync()
        {
            var categoryList = new List<ProductCategory>();
            categoryList = await _context.productCategories.ToListAsync();
            return categoryList;
        }
        public async Task<List<Offer>> GetAvailabeOffersAsync()
        {
            var OffersList = new List<Offer>();
            OffersList = await _context.Offers.ToListAsync();
            return OffersList;
        }
        public async Task<bool> AddProductAsync(AddProductDto model)
        {
            var product = new Product();
            product.Title = model.Title;
            product.Description = model.Description;
            product.Price = model.Price;
            product.Quantity = model.Quantity;
            product.ImageName = model.ImageName;
            var productCategory = await _context.productCategories.FindAsync(model.CategoryId);
            product.Category = productCategory;

            if (model.OfferId == 0 || model.OfferId == null)
            {
                product.Offer = null;

            }
            else
            {
                var ProductOffer = await _context.Offers.FindAsync(model.OfferId);
                product.Offer = ProductOffer;
            }

            await _context.products.AddAsync(product);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<string> DeleteProductAsync(int productId)
        {
            var errorMesages = string.Empty;
            var product = await _context.products.FindAsync(productId);
            if (product == null)
            {
                errorMesages = "This Product Does Not Exist";
                return errorMesages;
            }
            _context.products.Remove(product);
            await _context.SaveChangesAsync();
            return errorMesages;
        }

        public async Task<string> AddCategoryAsync(CategoryDto model)
        {
            var errorMessage = string.Empty;
            var isCategoryExist = await _context.productCategories
                .AnyAsync(x => x.Subcategory == model.Subcategory && x.Category == model.Category);
            if (isCategoryExist)
            {
                errorMessage = "This Category Is Already Exist";
                return errorMessage;
            }
            var category = new ProductCategory();
            category.Category = model.Category;
            category.Subcategory = model.Subcategory;
            await _context.productCategories.AddAsync(category);
            await _context.SaveChangesAsync();
            return errorMessage;
        }

        public async Task<string> AddOfferAsync(OfferDto model)
        {
            var errorMessage = string.Empty;
            var OfferIsAvaliable = await _context.Offers.AnyAsync(x => x.Title == model.Title && x.Discount == model.Discount);
            if (OfferIsAvaliable)
            {
                errorMessage = "This Offer Is Already Exist";
                return errorMessage;
            }
            var offer = new Offer();
            offer.Title = model.Title;
            offer.Discount = model.Discount;
            await _context.Offers.AddAsync(offer);
            await _context.SaveChangesAsync();
            return errorMessage;
        }
    }
}
