using BinaryBrainsAPI.Data;
using BinaryBrainsAPI.Entities.Bookings;
using BinaryBrainsAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Repository.BookingsRepositories
{
    public class BookingRepository : IAppRepository<Booking>
    {
        readonly ArtechDbContext _artechDb;


        public BookingRepository(ArtechDbContext artechDb)
        {
            _artechDb = artechDb;
        }

        public void Add(Booking booking)
        {
            _artechDb.Booking.Add(booking);
            _artechDb.SaveChanges();
        }

        public void Delete(Booking booking)
        {
            _artechDb.Booking.Remove(booking);
            _artechDb.SaveChanges();
        }

        public Booking Get(long id)
        {
            return _artechDb.Booking.FirstOrDefault(s => s.BookingID == id);
        }

        public IEnumerable<Booking> GetAll()
        {
            return _artechDb.Booking.ToList();
        }

        public void Update(Booking booking, Booking entity)
        {
            booking.BookingDateTime = entity.BookingDateTime;
            booking.BookingStatus = entity.BookingStatus;
            _artechDb.SaveChanges();
        }
    }
}
