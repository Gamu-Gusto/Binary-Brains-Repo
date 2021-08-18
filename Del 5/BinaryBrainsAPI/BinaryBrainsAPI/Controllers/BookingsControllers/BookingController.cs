using BinaryBrainsAPI.Entities.Bookings;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.BookingsControllers
{
    [Route("api/Booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IAppRepository<Booking> _appRepository;

        public BookingController(IAppRepository<Booking> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/Booking
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Booking> bookings = _appRepository.GetAll();

            return Ok(bookings);
        }

        // GET: api/Booking/{id}

        [HttpGet("{id}", Name = "GetBooking")]
        public IActionResult Get(long id)
        {
            Booking booking = _appRepository.Get(id);


            if (booking == null)
            {
                return NotFound("Requested Booking does not exist.");
            }

            return Ok(booking);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] Booking booking)
        {
            if (booking == null)
            {
                return BadRequest("Booking is null.");
            }
            _appRepository.Add(booking);
            return CreatedAtRoute(
                  "GetBooking",
                  new { Id = booking.BookingID },
                  booking);
        }

        // PUT: api/Booking/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Booking booking)
        {
            if (booking == null)
            {
                return BadRequest("Booking is null.");
            }

            Booking bookingToUpdate = _appRepository.Get(id);
            if (bookingToUpdate == null)
            {
                return NotFound("The Booking does not exist.");
            }
            _appRepository.Update(bookingToUpdate, booking);

            return NoContent();
        }


        // DELETE: api/Booking/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Booking booking = _appRepository.Get(id);
            if (booking == null)
            {
                return NotFound("The Booking does not exist.");
            }
            _appRepository.Delete(booking);

            return NoContent();
        }
    }
}
