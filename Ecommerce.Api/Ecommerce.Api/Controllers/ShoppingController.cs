using Ecommerce.Api.Models;
using Ecommerce.Api.Services.ProductCategoryService;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        public ShoppingController(IDataAccess productCatServ)
        {
            _dataAccess = productCatServ;
        }

        [HttpGet("product-categorylist")]
        public IActionResult GetCategories()
        {
            var ProductCategories = new List<ProductCategory>();

            ProductCategories = _dataAccess.GetProductCategories();
            return Ok(ProductCategories);
        }
        [HttpGet("Get-Products")]
        public IActionResult GetProducts(string category, string subCategory, int count = 1)
        {
            if (category == null || subCategory == null) { return BadRequest(new { message = " Category Or SubCategory Can Not Be Null" }); }
            var products = _dataAccess.GetProducts(category, subCategory, count);

            return Ok(products);
        }
        [HttpGet("GetProduct/{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _dataAccess.GetProductById(id);
            if (product == null) { return NotFound(new { message = "No Product With This Id" }); }
            return Ok(product);
        }
    }
}
