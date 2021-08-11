using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.Payments
{
    public class Payment
    {
        [Key]
        public int PaymentID { get; set; }
        public double Amount { get; set; }
        public DateTime PaymentDateTime { get; set; }

        [ForeignKey("PaymentTypeID")]
        public int PaymentTypeID { get; set; }
        public PaymentType PaymentType { get; set; }

        [ForeignKey("PaymentStatusID")]
        public int PaymentStatusID { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        //[ForeignKey("BookingID")]
        //public int BookingID { get; set; }
        //public Booking Booking { get; set; }
    }
}
