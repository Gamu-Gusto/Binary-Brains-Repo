﻿using BinaryBrainsAPI.Entities;
using BinaryBrainsAPI.Entities.ArtClasses;
using BinaryBrainsAPI.Entities.Artists;
using BinaryBrainsAPI.Entities.Artworks;
using BinaryBrainsAPI.Entities.Bookings;
using BinaryBrainsAPI.Entities.Exhibitions;
using BinaryBrainsAPI.Entities.Payments;
using BinaryBrainsAPI.Entities.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI.Data
{
    public class ArtechDbContext : DbContext
    {
        public ArtechDbContext(DbContextOptions<ArtechDbContext> options) : base(options)
        {

        }

        // Exhibition
        public DbSet<Exhibition> Exhibition { get; set; }
        public DbSet<ExhibitionType> ExhibitionType { get; set; }
        public DbSet<Schedule> Schedule { get; set; }
        public DbSet<ScheduleType> ScheduleType { get; set; }
        public DbSet<Organisation> Organisation { get; set; }
        public DbSet<Venue> Venue { get; set; }
        public DbSet<ExhibitionAnnouncement> ExhibitionAnnouncement { get; set; }
        public DbSet<ExhibitionApplication> ExhibitionApplication { get; set; }
        public DbSet<ApplicationStatus> ApplicationStatus { get; set; }

        // Artworks
        public DbSet<Artwork> Artwork { get; set; }
        public DbSet<SurfaceType> SurfaceType { get; set; }
        public DbSet<MediumType> MediumType { get; set; }
        public DbSet<ArtworkStatus> ArtworkStatus { get; set; }
        public DbSet<ArtworkDimension> ArtworkDimension { get; set; }
        public DbSet<FrameColour> FrameColour { get; set; }
        public DbSet<ShowcaseArtwork> ShowcaseArtwork { get; set; }

        // Payment
        public DbSet<Payment> Payment { get; set; }
        public DbSet<PaymentType> PaymentType { get; set; }
        public DbSet<PaymentStatus> PaymentStatus { get; set; }

        // Bookings
        public DbSet<Booking> Booking { get; set; }
        public DbSet<BookingNotification> BookingNotification { get; set; }

        //Art Classes
        public DbSet<ArtClass> ArtClasse { get; set; }
        public DbSet<ArtClassType> ArtClassType { get; set; }
        public DbSet<Feedback> Feedback { get; set; }
        public DbSet<ClassTeacher> ClassTeacher { get; set; } 
        public DbSet<TeacherType> TeacherType { get; set; }
        public DbSet<ArtClassAnnouncement> ArtClassAnnouncement { get; set; }

        //Users
        public DbSet<User> User { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Suburb> Suburb { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Province> Province { get; set; }
        public DbSet<Country> Country { get; set; }

        // Artists
        public DbSet<Invitation> Invitation { get; set; }
        public DbSet<InvitationStatus> InvitationStatus { get; set; }

    }
}
