using BinaryBrainsAPI.Entities.Exhibitions;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.ExhibitionsControllers
{
    [Route("api/ExhibitionApplication")]
    [ApiController]
    public class ExhibitionApplicationController : ControllerBase
    {
        private readonly IAppRepository<ExhibitionApplication> _appRepository;

        public ExhibitionApplicationController(IAppRepository<ExhibitionApplication> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/ExhibitionApplication
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<ExhibitionApplication> exhibitionApplications = _appRepository.GetAll();

            return Ok(exhibitionApplications);
        }

        // GET: api/ExhibitionApplication/{id}

        [HttpGet("{id}", Name = "GetExhibitionApplication")]
        public IActionResult Get(long id)
        {
            ExhibitionApplication exhibitionApplication = _appRepository.Get(id);


            if (exhibitionApplication == null)
            {
                return NotFound("Requested Exhibition Application does not exist.");
            }

            return Ok(exhibitionApplication);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] ExhibitionApplication exhibitionApplication)
        {
            if (exhibitionApplication == null)
            {
                return BadRequest("Exhibition Application is null.");
            }
            _appRepository.Add(exhibitionApplication);
            return CreatedAtRoute(
                  "GetExhibitionApplication",
                  new { Id = exhibitionApplication.ExhibitionApplicationID },
                  exhibitionApplication);
        }

        // PUT: api/ExhibitionApplication/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] ExhibitionApplication exhibitionApplication)
        {
            if (exhibitionApplication == null)
            {
                return BadRequest("Exhibition Application is null.");
            }

            ExhibitionApplication exhibitionApplicationToUpdate = _appRepository.Get(id);
            if (exhibitionApplicationToUpdate == null)
            {
                return NotFound("The Exhibition Application does not exist.");
            }
            _appRepository.Update(exhibitionApplicationToUpdate, exhibitionApplication);

            return NoContent();
        }


        // DELETE: api/ExhibitionApplication/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            ExhibitionApplication exhibitionApplication = _appRepository.Get(id);
            if (exhibitionApplication == null)
            {
                return NotFound("The Exhibition Application does not exist.");
            }
            _appRepository.Delete(exhibitionApplication);

            return NoContent();
        }
    }
}
