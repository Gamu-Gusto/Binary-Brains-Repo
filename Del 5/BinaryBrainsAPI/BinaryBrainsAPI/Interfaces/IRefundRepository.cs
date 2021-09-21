using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Interfaces
{
    public interface IRefundRepository
    {
        Task<int> UpdateRefund(int paymentID,int refundID);
    }
}
