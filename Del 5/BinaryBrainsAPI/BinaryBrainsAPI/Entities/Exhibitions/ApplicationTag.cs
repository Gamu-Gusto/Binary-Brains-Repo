using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.Exhibitions
{
    public class ApplicationTag
    {
        [Key]
        public int ApplicationTagID { get; set; }
        public string ApplicationArtworkTitle { get; set; }
        public string ApplicationDimension{ get; set; }

        public string Price { get; set; }
    }
}
