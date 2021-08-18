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
    [Route("api/Payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IAppRepository<Payment> _appRepository;

        public PaymentController(IAppRepository<Payment> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/Payment
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Payment> payments = _appRepository.GetAll();

            return Ok(payments);
        }

        // GET: api/Payment/{id}

        [HttpGet("{id}", Name = "GetPayment")]
        public IActionResult Get(long id)
        {
            Payment payment = _appRepository.Get(id);


            if (payment == null)
            {
                return NotFound("Requested Payment does not exist.");
            }

            return Ok(payment);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] Payment payment)
        {
            if (payment == null)
            {
                return BadRequest("Payment is null.");
            }
            _appRepository.Add(payment);
            return CreatedAtRoute(
                  "GetPayment",
                  new { Id = payment.PaymentID },
                  payment);
        }

        // PUT: api/Payment/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] Payment payment)
        {
            if (payment == null)
            {
                return BadRequest("Payment is null.");
            }

            Payment paymentToUpdate = _appRepository.Get(id);
            if (paymentToUpdate == null)
            {
                return NotFound("The Payment does not exist.");
            }
            _appRepository.Update(paymentToUpdate, payment);

            return NoContent();
        }


        // DELETE: api/Payment/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Payment payment = _appRepository.Get(id);
            if (payment == null)
            {
                return NotFound("The Payment does not exist.");
            }
            _appRepository.Delete(payment);

            return NoContent();
        }
    }
}
