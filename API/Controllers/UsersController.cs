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
        public async Task<IActionResult> GetUser([FromHeader] string username, [FromHeader] string password)
        {
            Console.WriteLine(username);
            var result = await Mediator.Send(new Get.Query { Username = username, Password = password });
            if (result)
                return Ok();

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            return Ok(await Mediator.Send(new Create.Command { User = user }));
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