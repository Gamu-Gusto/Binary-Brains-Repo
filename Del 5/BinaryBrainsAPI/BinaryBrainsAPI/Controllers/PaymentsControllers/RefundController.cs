using BinaryBrainsAPI.Entities.Bookings;
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
        private readonly IAppRepository<Payment> _paymentRepository;
        private readonly IAppRepository<Booking> _bookingRepository;
        private readonly IRefundRepository _refundRepository;


        public RefundController(IAppRepository<Refund> appRepository, IAppRepository<Payment> paymentRepository, IAppRepository<Booking> bookingRepository, IRefundRepository refundRepository)
        {
            _appRepository = appRepository;
            _paymentRepository = paymentRepository;
            _bookingRepository = bookingRepository;
            _refundRepository = refundRepository;
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
        public async Task<IActionResult> Post([FromBody] long? bookingid)
        {

            Refund refund = new Refund();

            IEnumerable<Payment> linkedPayment = _paymentRepository.GetByString(Convert.ToString(bookingid));

            Payment linkedPaymentToUpdate = linkedPayment.First();


            if (linkedPaymentToUpdate.PaymentStatus == "Refund Requested")
            {
                return BadRequest("There is already a refun pending.");

            }

            Booking booking = _bookingRepository.Get((long)bookingid);


            int refundLimit = booking.ArtClass.RefundDayLimit;


            double daysFromClassStart = (booking.ArtClass.ArtClassStartDateTime - DateTime.Now).TotalDays;

            if (daysFromClassStart < refundLimit)
            {
                return BadRequest("Refund request is past refund deadline.");

            }

            if (linkedPaymentToUpdate.PaymentStatus == "Refund Requested")
            {
                return BadRequest("There is already a refund pending.");

            }

            refund.RefundStatus = "In Progress";
            

             if (bookingid == null)
             {
                 return BadRequest("Refund is null.");
             }

             _appRepository.Add(refund);

            int createdRefundId = refund.RefundID;

            int result = await _refundRepository.UpdateRefund(linkedPaymentToUpdate.PaymentID, createdRefundId);

            return Ok(result);

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
