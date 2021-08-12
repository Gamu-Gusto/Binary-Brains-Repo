using BinaryBrainsAPI.Entities.BridgeEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Entities
{
	public class ExhibitionArtwork
	{
	    public int ArtworkID { get; set; }

		public int ExhibitionID { get; set; }
	}
}
