using App.Users;
using Database;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetUserValidationResult([FromHeader] string username, [FromHeader] string password)
        {
            var result = await Mediator.Send(new GetValidation.Query { Username = username, Password = password });
            if (result)
                return Ok();

            return NotFound();
        }

        [HttpGet("{username}")]
        public async Task<User> GetUserInfo(string username)
        {
            var user = await Mediator.Send(new GetUserInfo.Query { Username = username });
            if (user == null)
            {
                return user;
            }

            return user;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            var result = await Mediator.Send(new Validate.Query { User = user });
            if (!result)
            {
                return Ok(await Mediator.Send(new Create.Command { User = user }));
            }

            return Unauthorized();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid id, User user)
        {
            user.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { User = user }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}