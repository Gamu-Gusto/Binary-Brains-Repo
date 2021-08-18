using BinaryBrainsAPI.Entities.Users;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace BinaryBrainsAPI.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly IIdentifier<User> _appRepository;

        public LoginController(IIdentifier<User> appRepository)
        {
            _appRepository = appRepository;
        }


        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult Get(string username, string password)
        {
            User user = _appRepository.getUser(username);


            if (user == null)
            {
                return NotFound("Requested User does not exist.");
            }

            if (user != null && user.UserPassword == password)
            {
                
            }


            if (user != null && user.UserPassword != password)
            {
                return NotFound("Password not matched with username.");
            }

            return Ok(user);
        }

    }
}
