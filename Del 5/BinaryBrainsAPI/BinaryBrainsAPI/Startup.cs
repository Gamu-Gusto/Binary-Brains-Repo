using BinaryBrainsAPI.Data;
using BinaryBrainsAPI.Entities.Images;
using BinaryBrainsAPI.Entities.Users;
using BinaryBrainsAPI.Interfaces;
using BinaryBrainsAPI.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinaryBrainsAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ArtechDbContext> (options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IAppRepository<User>, UsersRepository>();
            services.AddScoped<IAppRepository<City>, CityRepository>();
            services.AddScoped<IAppRepository<Province>, ProvinceRepository>();
            services.AddScoped<IAppRepository<Suburb>, SurburbRepository>();
            services.AddScoped<IAppRepository<Country>, CountryRepository>();
            services.AddScoped<IAppRepository<UserType>, UserTypeRepository>();
            services.AddScoped<IAppRepository<Privileges>, PrivilegesRepository>();
            services.AddScoped<IAppRepository<Image>, ImagesRepository>();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BinaryBrainsAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BinaryBrainsAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
