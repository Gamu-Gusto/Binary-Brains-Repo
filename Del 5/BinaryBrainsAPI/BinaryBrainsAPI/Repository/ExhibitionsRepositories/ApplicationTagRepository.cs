using BinaryBrainsAPI.Data;
using BinaryBrainsAPI.Entities.Exhibitions;
using BinaryBrainsAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Repository.ExhibitionsRepositories
{
    public class ApplicationTagRepository : IAppRepository<ApplicationTag>
    {

        readonly ArtechDbContext _artechDb;


        public ApplicationTagRepository(ArtechDbContext artechDb)
        {
            _artechDb = artechDb;
        }

        public void Add(ApplicationTag entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(ApplicationTag entity)
        {
            throw new NotImplementedException();
        }

        public ApplicationTag Get(long id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ApplicationTag> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ApplicationTag> GetByString(string str)
        {
            throw new NotImplementedException();
        }

        public void Update(ApplicationTag dbEntity, ApplicationTag entity)
        {
            throw new NotImplementedException();
        }
    }
}
