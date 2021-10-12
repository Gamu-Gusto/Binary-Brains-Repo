using BinaryBrainsAPI.Entities;
using BinaryBrainsAPI.Entities.Exhibitions;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.ExhibitionsControllers
{
    [Route("api/ExhibitionApplication")]
    [EnableCors("MyCorsPolicy")]
    public class ExhibitionApplicationController : ControllerBase
    {
        private readonly IAppRepository<ExhibitionApplication> _appRepository;
        private readonly IAppRepository<Exhibition> _exhibitionRepository;
        private readonly IAppRepository<ApplicationStatus> _exhibitionApplicationStatusRepository;

        public ExhibitionApplicationController(IAppRepository<ExhibitionApplication> appRepository
            , IAppRepository<Exhibition> exhibitionRepository
            , IAppRepository<ApplicationStatus> exhibitionApplicationStatusRepository)
        {
            _appRepository = appRepository;
            _exhibitionRepository = exhibitionRepository;
            _exhibitionApplicationStatusRepository = exhibitionApplicationStatusRepository;
        }

        // GET: api/ExhibitionApplication
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<ExhibitionApplication> exhibitionApplications = _appRepository.GetAll();

            foreach(ExhibitionApplication i in exhibitionApplications)
            {
                i.ApplicationStatus = _exhibitionApplicationStatusRepository.Get((long)i.ApplicationStatusID);
                i.Exhibition = _exhibitionRepository.Get((long)i.ExhibitionID);

             }

            return Ok(exhibitionApplications);
        }

        // GET: api/ExhibitionApplication/{id}

        [HttpGet("{id}", Name = "GetExhibitionApplication")]
        public IActionResult Get(long id)
        {
            ExhibitionApplication exhibitionApplication = _appRepository.Get(id);


            if (exhibitionApplication == null)
            {
                return NotFound("Requested Exhibition Application does not exist.");
            }

            return Ok(exhibitionApplication);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] dynamic exhibitionApplication)
        {
            
            string serialExhibitionApplication = exhibitionApplication.ToString();

            dynamic serialExhibitionApp = Newtonsoft.Json.JsonConvert.DeserializeObject(serialExhibitionApplication);


            ExhibitionApplication exhibitionApplication1 = new ExhibitionApplication();

            exhibitionApplication1.ApplicationDescription = serialExhibitionApp.ApplicationDescription;
            exhibitionApplication1.ExhibitionApplicationImage1 = serialExhibitionApp.ExhibitionPicture1BASE64;
            exhibitionApplication1.ExhibitionApplicationImage2 = serialExhibitionApp.ExhibitionPicture2BASE64;
            exhibitionApplication1.ExhibitionApplicationImage3 = serialExhibitionApp.ExhibitionPicture3BASE64;
            exhibitionApplication1.ApplicationStatusID = serialExhibitionApp.ApplicationStatus;
            exhibitionApplication1.ExhibitionID = serialExhibitionApp.ExhibitionID;
            exhibitionApplication1.UserID = serialExhibitionApp.UserID;

            IEnumerable<ExhibitionApplication> existingExhibitionApplications = _appRepository.GetAll();


            if (exhibitionApplication1 == null)
            {
                return BadRequest("Exhibition Application is null.");
            }

            foreach (ExhibitionApplication i in existingExhibitionApplications)
            {

              

                if((i.ExhibitionID == exhibitionApplication1.ExhibitionID && i.UserID == exhibitionApplication1.UserID) && i.ApplicationStatusID != 3)
                {
                    return BadRequest("You already applied for this exhibition.");

                }
              
            }

         
            _appRepository.Add(exhibitionApplication1);
            return CreatedAtRoute(
                  "GetExhibitionApplication",
                  new { Id = exhibitionApplication1.ExhibitionApplicationID },
                  exhibitionApplication1);
        }

        // PUT: api/ExhibitionApplication/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] ExhibitionApplication exhibitionApplication)
        {
            if (exhibitionApplication == null)
            {
                return BadRequest("Exhibition Application is null.");
            }

            ExhibitionApplication exhibitionApplicationToUpdate = _appRepository.Get(id);
            if (exhibitionApplicationToUpdate == null)
            {
                return NotFound("The Exhibition Application does not exist.");
            }
            _appRepository.Update(exhibitionApplicationToUpdate, exhibitionApplication);

            return NoContent();
        }


        // DELETE: api/ExhibitionApplication/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            ExhibitionApplication exhibitionApplication = _appRepository.Get(id);
            if (exhibitionApplication == null)
            {
                return NotFound("The Exhibition Application does not exist.");
            }

            ExhibitionApplication exhibitionApplicationToUpdate = new ExhibitionApplication();

            exhibitionApplicationToUpdate = exhibitionApplication;

            exhibitionApplication.ApplicationStatusID = 4;

            _appRepository.Update(exhibitionApplication,exhibitionApplicationToUpdate);

            return Ok(exhibitionApplication);
        }
    }
}
