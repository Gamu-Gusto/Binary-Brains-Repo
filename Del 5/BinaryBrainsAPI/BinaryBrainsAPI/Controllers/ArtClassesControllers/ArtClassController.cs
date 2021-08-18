using BinaryBrainsAPI.Entities.ArtClasses;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.ArtClassesControllers
{
    [Route("api/ArtClass")]
    [ApiController]
    public class ArtClassController : ControllerBase
    {
        private readonly IAppRepository<ArtClass> _appRepository;

        public ArtClassController(IAppRepository<ArtClass> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/ArtClass
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<ArtClass> artClasses = _appRepository.GetAll();

            return Ok(artClasses);
        }

        // GET: api/User/{id}

        [HttpGet("{id}", Name = "GetArtClass")]
        public IActionResult Get(long id)
        {
            ArtClass artClass = _appRepository.Get(id);


            if (artClass == null)
            {
                return NotFound("Requested Art Class does not exist.");
            }

            return Ok(artClass);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] ArtClass artClass)
        {
            if (artClass == null)
            {
                return BadRequest("Art Class is null.");
            }
            _appRepository.Add(artClass);
            return CreatedAtRoute(
                  "GetArtClass",
                  new { Id = artClass.ArtClassID },
                  artClass);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] ArtClass artClass)
        {
            if (artClass == null)
            {
                return BadRequest("Art Class is null.");
            }
            ArtClass artClassToUpdate = _appRepository.Get(id);
            if (artClassToUpdate == null)
            {
                return NotFound("The Art Class record couldn't be found.");
            }
            _appRepository.Update(artClassToUpdate, artClass);

            return NoContent();
        }


        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            ArtClass artClass = _appRepository.Get(id);
            if (artClass == null)
            {
                return NotFound("The Art Class does not exist.");
            }
            _appRepository.Delete(artClass);

            return NoContent();
        }
    }
}
