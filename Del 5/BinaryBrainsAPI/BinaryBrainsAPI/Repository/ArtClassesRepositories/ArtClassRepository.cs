using BinaryBrainsAPI.Data;
using BinaryBrainsAPI.Entities.ArtClasses;
using BinaryBrainsAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Repository.ArtClassesRepositories
{
    public class ArtClassRepository : IAppRepository<ArtClass>
    {
        readonly ArtechDbContext _artechDb;


        public ArtClassRepository(ArtechDbContext artechDb)
        {
            _artechDb = artechDb;
        }

        public void Add(ArtClass artClass)
        {
            _artechDb.ArtClasse.Add(artClass);
            _artechDb.SaveChanges();
        }

        public void Delete(ArtClass artClass)
        {
            _artechDb.ArtClasse.Remove(artClass);
            _artechDb.SaveChanges();

        }

        public ArtClass Get(long id)
        {
            return _artechDb.ArtClasse.FirstOrDefault(u => u.ArtClassID == id);
        }

        public IEnumerable<ArtClass> GetAll()
        {
            return _artechDb.ArtClasse.ToList();
        }

        public void Update(ArtClass artClass, ArtClass entity)
        {
            artClass.ArtClassName = entity.ArtClassName;
            artClass.ArtClassDescription = entity.ArtClassDescription;
            artClass.ArtClassStartDate = entity.ArtClassStartDate;
            artClass.ArtClassEndDate = entity.ArtClassEndDate;
            artClass.ArtClassStartTime = entity.ArtClassStartTime;
            artClass.ArtClassEndTime = entity.ArtClassEndTime;
            artClass.ClassLimit = entity.ClassLimit;
            artClass.RefundDayLimit = entity.RefundDayLimit;
            artClass.ClassPrice = entity.ClassPrice;
            _artechDb.SaveChanges();
        }
    }
}
