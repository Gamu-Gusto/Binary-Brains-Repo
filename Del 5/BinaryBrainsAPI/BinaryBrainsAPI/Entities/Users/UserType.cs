using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.Users
{
    public class UserType
    {
        [Key]
        public int UserTypeID { get; set; }
        public string UserRoleDescription { get; set; }
    }
}
