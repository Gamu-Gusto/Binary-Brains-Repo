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
    [Route("api/Artwork")]
    [ApiController]
    public class ArtworkController : ControllerBase
    {
        private readonly IAppRepository<Artwork> _appRepository;

        public ArtworkController(IAppRepository<Artwork> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/Artwork
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Artwork> artworks = _appRepository.GetAll();

            return Ok(artworks);
        }

        // GET: api/Artwork/{id}

        [HttpGet("{id}", Name = "GetArtwork")]
        public IActionResult Get(long id)
        {
            Artwork artwork = _appRepository.Get(id);


            if (artwork == null)
            {
                return NotFound("Requested Artwork does not exist.");
            }

            return Ok(artwork);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] Artwork artwork)
        {
            if (artwork == null)
            {
                return BadRequest("Artwork is null.");
            }
            _appRepository.Add(artwork);
            return CreatedAtRoute(
                  "GetArtwork",
                  new { Id = artwork.ArtworkID },
                  artwork);
        }

        // PUT: api/Artwork/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Artwork artwork)
        {
            if (artwork == null)
            {
                return BadRequest("Artwork is null.");
            }

            Artwork artworkToUpdate = _appRepository.Get(id);
            if (artworkToUpdate == null)
            {
                return NotFound("The Artwork does not exist.");
            }
            _appRepository.Update(artworkToUpdate, artwork);

            return NoContent();
        }


        // DELETE: api/Artwork/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Artwork artwork = _appRepository.Get(id);
            if (artwork == null)
            {
                return NotFound("The Artwork does not exist.");
            }
            _appRepository.Delete(artwork);

            return NoContent();
        }
    }
}
