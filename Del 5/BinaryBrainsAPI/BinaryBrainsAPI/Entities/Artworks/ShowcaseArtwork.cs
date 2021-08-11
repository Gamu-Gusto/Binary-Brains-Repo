using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.Artworks
{
    public class ShowcaseArtwork
    {
        [Key]
        public int ShowcaseArtworkID { get; set; }
        public string ShowCaseTitle { get; set; }
        public string ShowCaseImage { get; set; }
    }
}
