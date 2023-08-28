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
        [HttpPatch("modify-user")]
        public async Task<IActionResult> ModifiyUserAsync(ModifyUserDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.ModfiyUserAsync(model);
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

        [HttpPatch("change-password")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.ChangePasswordAsync(model);
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

        [HttpGet("get-user-by-id/{userId}")]
        public async Task<IActionResult> GetUserByIdAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { message = "UserId Is Required" });
            }

            var result = await _authService.GetUserByIdAsync(userId);
            if (result == null)
            {
                return NotFound(new { message = "User Not Found" });
            }
            return Ok(result);
        }

        [HttpPost("send-reset-password-email/{email}")]
        public async Task<IActionResult> SendResetPasswordEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email Is Required");
            }
            var result = await _authService.SendResetPasswordEmailAsync(email);
            if (!string.IsNullOrEmpty(result))
            {
                return BadRequest(result);
            }
            return Ok(new { message = "Email Send Successfully" });

        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.ResetPasswordAsync(resetPasswordDto);
            if (!string.IsNullOrEmpty(result))
            {
                return BadRequest(result);
            }
            return Ok(new { message = "Password Reset Successfully" });
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
