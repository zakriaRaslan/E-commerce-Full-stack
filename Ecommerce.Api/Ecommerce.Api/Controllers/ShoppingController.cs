using Ecommerce.Api.Models;
using Ecommerce.Api.Services.ProductCategoryService;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IProductCategoryServ _productCatServ;

        public ShoppingController(IProductCategoryServ productCatServ)
        {
            _productCatServ = productCatServ;
        }

        [HttpGet("product-categorylist")]
        public IActionResult GetCategories()
        {
            var ProductCategories = new List<ProductCategory>();

            ProductCategories = _productCatServ.GetProductCategories();
            return Ok(ProductCategories);
        }

    }
}
