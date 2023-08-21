using Ecommerce.Api.Models.Dto;
using Ecommerce.Api.Services.DashboardService;
using Ecommerce.Api.Services.ProductCategoryService;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly IDataAccess _dataAccess;
        public DashboardController(IDashboardService dashboardService, IDataAccess dataAccess)
        {
            _dashboardService = dashboardService;
            _dataAccess = dataAccess;
        }

        [HttpGet("get-categories")]
        public async Task<IActionResult> GetCategoryListAsync()
        {
            var categoryList = await _dashboardService.GetProductCategoriesAsync();
            if (categoryList == null)
            {
                return NotFound("There Are No Categories Yet Please Add One");
            }
            return Ok(categoryList);
        }


        [HttpGet("get-offers")]
        public async Task<IActionResult> GetAvailableOffersAsync()
        {
            var offersList = await _dashboardService.GetAvailabeOffersAsync();
            if (offersList == null)
            {
                return NotFound("There Are No Offers Yet");
            }
            return Ok(offersList);
        }


        [HttpPost("add-product")]
        public async Task<IActionResult> AddProductAsync(AddProductDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var AddProduct = await _dashboardService.AddProductAsync(model);
            if (!AddProduct)
            {
                return BadRequest("SomeThing Went Wrong");
            }
            return Ok("Product Added Successfuly");
        }

        [HttpDelete("delete-product/{productId}")]
        public async Task<IActionResult> DeleteProductAsync(int productId)
        {
            var result = await _dashboardService.DeleteProductAsync(productId);
            if (!string.IsNullOrEmpty(result))
            {
                return BadRequest(result);
            }
            return Ok();
        }
        [HttpPost("add-category")]
        public async Task<IActionResult> AddCategoryAsync(CategoryDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _dataAccess.AddCategoryAsync(model);
            if (!string.IsNullOrEmpty(result)) return BadRequest(result);
            return Ok("Category Added Successfuly");
        }
    }
}
