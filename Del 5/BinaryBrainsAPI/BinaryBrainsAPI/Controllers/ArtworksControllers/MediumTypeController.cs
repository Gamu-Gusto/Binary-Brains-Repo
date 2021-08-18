using BinaryBrainsAPI.Entities.Artworks;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.ArtworksControllers
{
    [Route("api/MediumType")]
    [ApiController]
    public class MediumTypeController : ControllerBase
    {
        private readonly IAppRepository<MediumType> _appRepository;

        public MediumTypeController(IAppRepository<MediumType> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/MediumType
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<MediumType> mediumTypes = _appRepository.GetAll();

            return Ok(mediumTypes);
        }

        // GET: api/MediumType/{id}

        [HttpGet("{id}", Name = "GetMediumType")]
        public IActionResult Get(long id)
        {
            MediumType mediumType = _appRepository.Get(id);


            if (mediumType == null)
            {
                return NotFound("Requested Medium Type does not exist.");
            }

            return Ok(mediumType);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] MediumType mediumType)
        {
            if (mediumType == null)
            {
                return BadRequest("Medium Type is null.");
            }
            _appRepository.Add(mediumType);
            return CreatedAtRoute(
                  "GetMediumType",
                  new { Id = mediumType.MediumTypeID },
                  mediumType);
        }

        // PUT: api/MediumType/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] MediumType mediumType)
        {
            if (mediumType == null)
            {
                return BadRequest("Medium Type is null.");
            }

            MediumType mediumTypeToUpdate = _appRepository.Get(id);
            if (mediumTypeToUpdate == null)
            {
                return NotFound("The Medium Type does not exist.");
            }
            _appRepository.Update(mediumTypeToUpdate, mediumType);

            return NoContent();
        }


        // DELETE: api/MediumType/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            MediumType mediumType = _appRepository.Get(id);
            if (mediumType == null)
            {
                return NotFound("The Medium Type does not exist.");
            }
            _appRepository.Delete(mediumType);

            return NoContent();
        }
    }
}
