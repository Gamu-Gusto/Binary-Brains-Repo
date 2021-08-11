using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.Exhibitions
{
    public class ExhibitionAnnouncement
    {
        [Key]
        public int ExhibitionAnnouncementID { get; set; }
        public string ExhibitionAnnouncementDescription { get; set; }
    }
}
