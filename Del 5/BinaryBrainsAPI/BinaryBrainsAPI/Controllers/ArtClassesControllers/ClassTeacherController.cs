using BinaryBrainsAPI.Entities.ArtClasses;
using BinaryBrainsAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Controllers.ArtClassesControllers
{
    [Route("api/ClassTeacher")]
    [ApiController]
    public class ClassTeacherController : ControllerBase
    {
        private readonly IAppRepository<ClassTeacher> _appRepository;

        public ClassTeacherController(IAppRepository<ClassTeacher> appRepository)
        {
            _appRepository = appRepository;
        }

        // GET: api/ClassTeacher
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<ClassTeacher> classTeachers = _appRepository.GetAll();

            return Ok(classTeachers);
        }

        // GET: api/ClassTeacher/{id}

        [HttpGet("{id}", Name = "GetClassTeacher")]
        public IActionResult Get(long id)
        {
            ClassTeacher classTeacher = _appRepository.Get(id);


            if (classTeacher == null)
            {
                return NotFound("Requested Class Teacher does not exist.");
            }

            return Ok(classTeacher);
        }

        // GET: api/Create
        [HttpPost]
        public IActionResult Post([FromBody] ClassTeacher classTeacher)
        {
            if (classTeacher == null)
            {
                return BadRequest("Class Teacher is null.");
            }
            _appRepository.Add(classTeacher);
            return CreatedAtRoute(
                  "GetClassTeacher",
                  new { Id = classTeacher.ClassTeacherID },
                  classTeacher);
        }

        // PUT: api/ClassTeacher/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] ClassTeacher classTeacher)
        {
            if (classTeacher == null)
            {
                return BadRequest("Class Teacher is null.");
            }
            ClassTeacher classTeacherToUpdate = _appRepository.Get(id);
            if (classTeacherToUpdate == null)
            {
                return NotFound("The Class Teacher record couldn't be found.");
            }
            _appRepository.Update(classTeacherToUpdate, classTeacher);

            return NoContent();
        }


        // DELETE: api/ClassTeacher/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            ClassTeacher classTeacher = _appRepository.Get(id);
            if (classTeacher == null)
            {
                return NotFound("The class teacher does not exist.");
            }
            _appRepository.Delete(classTeacher);

            return NoContent();
        }
    }
}
