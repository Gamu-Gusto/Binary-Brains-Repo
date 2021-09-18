using BinaryBrainsAPI.Entities.Users;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
