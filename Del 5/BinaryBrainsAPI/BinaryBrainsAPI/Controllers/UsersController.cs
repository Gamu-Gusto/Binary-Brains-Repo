using BinaryBrainsAPI.Data;
using BinaryBrainsAPI.Dtos.UsersDtos;
using BinaryBrainsAPI.Entities.Users;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers
{
    [Route("api/User")]
    public class UsersController : ControllerBase
    {
        private readonly IAppRepository<User> _appRepository;

        public UsersController(IAppRepository<User> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<User> users = _appRepository.GetAll();

            return Ok(users);
        }

        // GET: api/User/{id}

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult Get(long id)
      {
          User user = _appRepository.Get(id);


          if(user == null)
          {
              return NotFound("Requested User does not exist.");
          }

          return Ok(user);
      }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("Employee is null.");
            }
            _appRepository.Add(user);
            return CreatedAtRoute(
                  "GetUser",
                  new { Id = user.UserID },
                  user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User is null.");
            }
            User userToUpdate = _appRepository.Get(id);
            if (userToUpdate == null)
            {
                return NotFound("The User record couldn't be found.");
            }
            _appRepository.Update(userToUpdate, user);

            return NoContent();
        }


        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            User user = _appRepository.Get(id);
            if (user == null)
            {
                return NotFound("The user does not exist.");
            }
            _appRepository.Delete(user);

            return NoContent();
        }
    }
}
