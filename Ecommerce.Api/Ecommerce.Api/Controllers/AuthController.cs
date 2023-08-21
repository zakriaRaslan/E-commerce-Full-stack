using Ecommerce.Api.Models;
using Ecommerce.Api.Models.Dto;
using Ecommerce.Api.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.RegisterAsync(model);
            if (!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }
            SetRefreshTokenInCookies(result.RefreshToken, result.RefreshTokenExpiration);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] GetTokenModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.GetTokenAsync(model);
            if (!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }
            if (!string.IsNullOrEmpty(result.RefreshToken))
            {
                SetRefreshTokenInCookies(result.RefreshToken, result.RefreshTokenExpiration);
            }
            return Ok(result);
        }

        [HttpPost("addrole")]
        public async Task<IActionResult> AddToRoleAsync([FromBody] AddToRoleDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.AddToRoleAsync(model);
            if (!string.IsNullOrEmpty(result))
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync(string? refreshToken)
        {
            var Token = refreshToken ?? Request.Cookies["refreshToken"];
            var result = await _authService.RefreshTokenAsync(Token);
            if (!result.IsAuthenticated)
            {
                return BadRequest(result.Message);
            }
            SetRefreshTokenInCookies(result.RefreshToken, result.RefreshTokenExpiration);
            return Ok(result);
        }

        [HttpPost("revoke-token")]
        public async Task<IActionResult> RevokeTokenAsync([FromBody] RevokeTokenDto model)
        {
            var token = model.token ?? Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Token Is Required");
            }
            var result = await _authService.RevokeTokenAsync(token);
            if (!result)
            {
                return BadRequest("Invalid Token");
            }
            return Ok();
        }
        [HttpGet("get-users-list")]
        public async Task<IActionResult> GetUsersInfo()
        {
            var result = await _authService.GetUsersInfoAsync();
            if (result == null)
            {
                return NotFound("We Have Not Users Yet");
            }
            return Ok(result);
        }

        private void SetRefreshTokenInCookies(string refreshToken, DateTime expires)
        {
            var cookieOtions = new CookieOptions
            {
                HttpOnly = true,
                Expires = expires.ToLocalTime(),
            };
            Response.Cookies.Append("refreshToken", refreshToken, cookieOtions);
        }
    }
}
