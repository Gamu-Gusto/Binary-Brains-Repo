using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities.Images
{
    public class Image
    {
        [Key]
        public int ImageID { get; set; }
        public string ImageContent { get; set; }

        [ForeignKey("ImageTypeID")]

        public int ImageTypeID { get; set; }
        public ImageType ImageType { get; set; }
    }
}
