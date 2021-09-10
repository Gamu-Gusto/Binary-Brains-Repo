using BinaryBrainsAPI.Entities.Users;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using System.Text;

namespace BinaryBrainsAPI.Controllers
{
    [Route("api/Login")]
    [ApiController]

    public class LoginController : ControllerBase
    {

        private readonly IIdentifier<User> _appRepository;
        private readonly IAppRepository<User> _applicationRepository;

        bool isAuthenticated;
        public LoginController(IIdentifier<User> appRepository, IAppRepository<User> applicationRepository)
        {
            _appRepository = appRepository;

            _applicationRepository = applicationRepository;
        }



        [HttpGet("{username}/{password}", Name = "GetUserDetails")]
        public IActionResult Get(string username, string password)
        {
            
            
            
            User user = _appRepository.getUser(username);

            string encryptionKey = "sblw-3hn8-sqoy19";

            password = CryptoEngine.Encrypt(password, encryptionKey);


            if (user == null)
            {
                return NotFound("Requested User does not exist.");
            }

            if (user != null && user.UserPassword == password)
            {
                isAuthenticated = true;

                return Ok(user);

            }


            if (user != null && user.UserPassword != password)
            {
                return NotFound("Password not matched with username.");
            }

            return Ok(user);
        }

    }
}
