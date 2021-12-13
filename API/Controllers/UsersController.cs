using System.Security.Claims;
using API.DTO;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly SignInManager<User> _signInManager;

        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager,
         TokenService tokenService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO dto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == dto.Username))
            {
                return BadRequest("Username taken");
            }

            var user = new User
            {
                UserName = dto.Username,
                Budget = dto.Budget
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Registration failed!");
        }

        [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<UserDTO>> GetCurrentUserInfo(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            return CreateUserObject(user);
        }

        private UserDTO CreateUserObject(User user)
        {
            return new UserDTO
            {
                Username = user.UserName,
                Budget = user.Budget,
                Token = _tokenService.CreateToken(user),
                CreationDate = user.CreationDate
            };
        }
    }



    // [HttpPost]
    // public async Task<IActionResult> CreateUser(User user)
    // {
    //     var result = await Mediator.Send(new Validate.Query { User = user });
    //     if (!result)
    //     {
    //         return Ok(await Mediator.Send(new Create.Command { User = user }));
    //     }

    //     return Unauthorized();
    // }

    // [HttpPut("{id}")]
    // public async Task<IActionResult> EditUser(string id, User user)
    // {
    //     user.Id = id;
    //     return Ok(await Mediator.Send(new Edit.Command { User = user }));
    // }

    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteUser(Guid id)
    // {
    //     return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    // }
}
