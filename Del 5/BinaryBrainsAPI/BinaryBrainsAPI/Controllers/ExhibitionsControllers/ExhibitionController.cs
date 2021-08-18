using BinaryBrainsAPI.Entities;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.ExhibitionsControllers
{
    [Route("api/Exhibition")]
    [ApiController]
    public class ExhibitionController : ControllerBase
    {
        private readonly IAppRepository<Exhibition> _appRepository;

        public ExhibitionController(IAppRepository<Exhibition> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/Exhibition
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Exhibition> exhibitions = _appRepository.GetAll();

            return Ok(exhibitions);
        }

        // GET: api/Exhibition/{id}

        [HttpGet("{id}", Name = "GetExhibition")]
        public IActionResult Get(long id)
        {
            Exhibition exhibition = _appRepository.Get(id);


            if (exhibition == null)
            {
                return NotFound("Requested Exhibition does not exist.");
            }

            return Ok(exhibition);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] Exhibition exhibition)
        {
            if (exhibition == null)
            {
                return BadRequest("Exhibition is null.");
            }
            _appRepository.Add(exhibition);
            return CreatedAtRoute(
                  "GetExhibition",
                  new { Id = exhibition.ExhibitionID },
                  exhibition);
        }

        // PUT: api/Exhibition/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Exhibition exhibition)
        {
            if (exhibition == null)
            {
                return BadRequest("Exhibition is null.");
            }

            Exhibition exhibitionToUpdate = _appRepository.Get(id);
            if (exhibitionToUpdate == null)
            {
                return NotFound("The Exhibition does not exist.");
            }
            _appRepository.Update(exhibitionToUpdate, exhibition);

            return NoContent();
        }


        // DELETE: api/Exhibition/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Exhibition exhibition = _appRepository.Get(id);
            if (exhibition == null)
            {
                return NotFound("The Exhibition does not exist.");
            }
            _appRepository.Delete(exhibition);

            return NoContent();
        }
    }
}
