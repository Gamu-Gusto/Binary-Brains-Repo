﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.Users
{
    public class Country
    {
        [Key]
        public int CountryID { get; set; }
        public string CountryDescription { get; set; }
    }
}
