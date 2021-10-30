using API.Data;
using API.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // This is often called as the dependency infection container
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                // Swagger is generating documentation about the API
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            //Add DbContext
            services.AddDbContext<StoreContext>(opt => 
            {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            //Add this to allow CORS (Cross Origin Resource Sharing)
            // What is CORS https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
            //(CORS) is an HTTP-header based mechanism that allows a server to indicate any origins 
            //(domain, scheme, or port) other than its own from which a browser should permit loading resources.
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // This is for middleware that we add to our application
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Here we are using the ExceptionMiddleware that we just created 
            app.UseMiddleware<ExceptionMiddleware>();

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();
            // Add this here to allow CORS. It needs to be added here, the order is important.
            app.UseCors(opt => 
            {
                // AllowCredentials will allow to pass cookies to or from our clients on a different domain
                opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
            });

            app.UseAuthorization();

            //This is responsable for maping the endpoint for this controllers
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
