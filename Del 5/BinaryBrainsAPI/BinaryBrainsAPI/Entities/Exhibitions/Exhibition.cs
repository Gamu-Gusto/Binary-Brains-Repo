using BinaryBrainsAPI.Entities.Exhibitions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities
{
    public class Exhibition
    {
        [Key]
        public int ExhibitionID { get; set; }

        [Required]
        public string ExhibitionName { get; set; }

        [Required]
        public string ExhibitionDescription { get; set; }

        [Required]
        public DateTime ExhibitionDate { get; set; }

        [Required]
        public DateTime ExhibitionTime { get; set; }

        [Required]
        public string Exhibition_Image { get; set; }

        [ForeignKey("ExhibitionTypeID")]
        public int ExhibitionTypeID { get; set; }
        public ExhibitionType ExhibitionType { get; set; }

        [ForeignKey("ScheduleID")]
        public int ScheduleID { get; set; }
        public Schedule Schedule { get; set; }

        [ForeignKey("OrganisationID")]
        public int OrganisationID { get; set; }
        public Organisation Organisation { get; set; }

        [ForeignKey("ExhibitionAnnouncementID")]
        public int ExhibitionAnnouncementID { get; set; }
        public ExhibitionAnnouncement ExhibitionAnnouncement { get; set; }

        [ForeignKey("VenueID")]
        public int VenueID { get; set; }
        public Venue Venue { get; set; }

    }
}
