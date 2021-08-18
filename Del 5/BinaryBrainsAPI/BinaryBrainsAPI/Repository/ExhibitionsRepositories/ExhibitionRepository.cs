using BinaryBrainsAPI.Data;
using BinaryBrainsAPI.Entities;
using BinaryBrainsAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Repository.ExhibitionsRepositories
{
    public class ExhibitionRepository : IAppRepository<Exhibition>
    {
        readonly ArtechDbContext _artechDb;


        public ExhibitionRepository(ArtechDbContext artechDb)
        {
            _artechDb = artechDb;
        }

        public void Add(Exhibition exhibition)
        {
            _artechDb.Exhibition.Add(exhibition);
            _artechDb.SaveChanges();
        }

        public void Delete(Exhibition exhibition)
        {
            _artechDb.Exhibition.Remove(exhibition);
            _artechDb.SaveChanges();
        }

        public Exhibition Get(long id)
        {
            return _artechDb.Exhibition.FirstOrDefault(s => s.ExhibitionID == id);
        }

        public IEnumerable<Exhibition> GetAll()
        {
            return _artechDb.Exhibition.ToList();
        }

        public void Update(Exhibition exhibition, Exhibition entity)
        {
            exhibition.ExhibitionName = entity.ExhibitionName;
            exhibition.ExhibitionDescription = entity.ExhibitionDescription;
            exhibition.ExhibitionDate = entity.ExhibitionDate;
            exhibition.ExhibitionTime = entity.ExhibitionTime;
            _artechDb.SaveChanges();
        }
    }
}
