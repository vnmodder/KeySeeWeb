using KeySee.Application.Authenticate.Login;
using KeySee.Application.Authenticate.Signup;
using KeySee.Domain.Exceptions;
using KeySee.Domain.Messages;
using KeySee.Infrastructure.Constants;
using KeySee.Infrastructure.Databases.KeySeeDB.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KeySee.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : KeySeeController
    {
        private readonly SignInManager<User> _signInManager;

        public AuthenticateController(SignInManager<User> signInManager) : base()
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await Mediator.Send(request);
            if (!response.LoginSuccessFlag)
            {
                throw new BusinessException(errorCode: nameof(ValidationMessages.VM0065), message: ValidationMessages.VM0065);
            }

            return Response(response);
        }

        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync().ConfigureAwait(false);
            HttpContext.Response.Cookies.Delete(".AspNetCore.Cookies");
            return Ok();
        }


        [HttpPut]
        [Route("Signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            var response = await Mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
