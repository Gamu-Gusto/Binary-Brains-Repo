using BinaryBrainsAPI.Entities.Exhibitions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.ArtClasses
{
    public class ArtClass
    {
        [Key]
        public int ArtClassID { get; set; }
        public string ArtClassName { get; set; }
        public string ArtClassDescription { get; set; }
        public DateTime ArtClassStartDate { get; set; }
        public DateTime ArtClassEndDate { get; set; }
        public int ClassLimit { get; set; }
        public int RefundDayLimit { get; set; }
        
        [ForeignKey("ArtClassTypeID")]
        public int ArtClassTypeID { get; set; }
        public ArtClassType ArtClassType { get; set; }

        [ForeignKey("VenueID")]
        public int VenueID { get; set; }
        public Venue Venue { get; set; }
        public double ClassPrice { get; set; }

        [ForeignKey("ClassTeacherID")]
        public int ClassTeacherID { get; set; }
        public ClassTeacher ClassTeacher { get; set; }

        [ForeignKey("ArtClassAnnouncementID")]
        public int ArtClassAnnouncementID { get; set; }
        public ArtClassAnnouncement ArtClassAnnouncement { get; set; }

        [ForeignKey("OrganisationID")]
        public int OrganisationID { get; set; }
        public Organisation Organisation { get; set; }
    }
}
