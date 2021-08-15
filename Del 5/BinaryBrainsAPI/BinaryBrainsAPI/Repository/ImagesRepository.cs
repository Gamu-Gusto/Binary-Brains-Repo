using BinaryBrainsAPI.Data;
using BinaryBrainsAPI.Entities.Images;
using BinaryBrainsAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Repository
{
    public  class ImagesRepository : IAppRepository<Image> 
    {

        readonly ArtechDbContext _artechDb;


        public ImagesRepository(ArtechDbContext artechDb)
        {
            _artechDb = artechDb;
        }

        public ImagesRepository()
        {
        }

        public virtual int Add(Image entity)
        {

            _artechDb.Image.Add(entity);

            _artechDb.SaveChanges();

            int id = entity.ImageID;

            return id;
        }
        public IEnumerable<Image> GetAll()

        {
            throw new NotImplementedException();
        }

        public Image Get(long id)
        {
            throw new NotImplementedException();
        }

    

        public void Update(Image dbEntity, Image entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Image entity)
        {
            throw new NotImplementedException();
        }

        void IAppRepository<Image>.Add(Image entity)
        {
            throw new NotImplementedException();
        }
    }

       
    
}
