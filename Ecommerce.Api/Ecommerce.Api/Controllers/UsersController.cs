using Ecommerce.Api.Services.AccountService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public UsersController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("userinfo/{userId}")]
        public async Task<IActionResult> GetUserInfoAsync(string userId)
        {
            var result = await _accountService.GetUserInformationAsync(userId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
