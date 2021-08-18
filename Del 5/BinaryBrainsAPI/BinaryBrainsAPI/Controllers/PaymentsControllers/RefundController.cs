using BinaryBrainsAPI.Entities.Payments;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.PaymentsControllers
{
    [Route("api/Refund")]
    [ApiController]
    public class RefundController : ControllerBase
    {
        private readonly IAppRepository<Refund> _appRepository;

        public RefundController(IAppRepository<Refund> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/Refund
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Refund> refunds = _appRepository.GetAll();

            return Ok(refunds);
        }

        // GET: api/Refund/{id}

        [HttpGet("{id}", Name = "GetRefund")]
        public IActionResult Get(long id)
        {
            Refund refund = _appRepository.Get(id);


            if (refund == null)
            {
                return NotFound("Requested Refund does not exist.");
            }

            return Ok(refund);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] Refund refund)
        {
            if (refund == null)
            {
                return BadRequest("Refund is null.");
            }
            _appRepository.Add(refund);
            return CreatedAtRoute(
                  "GetRefund",
                  new { Id = refund.RefundID },
                  refund);
        }

        // PUT: api/Refund/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Refund refund)
        {
            if (refund == null)
            {
                return BadRequest("Refund is null.");
            }

            Refund refundToUpdate = _appRepository.Get(id);
            if (refundToUpdate == null)
            {
                return NotFound("The Refund does not exist.");
            }
            _appRepository.Update(refundToUpdate, refund);

            return NoContent();
        }


        // DELETE: api/Refund/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Refund refund = _appRepository.Get(id);
            if (refund == null)
            {
                return NotFound("The Refund does not exist.");
            }
            _appRepository.Delete(refund);

            return NoContent();
        }
    }
}
