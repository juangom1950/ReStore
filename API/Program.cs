using System;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //It creates the castro server by default to run the API there
            var host = CreateHostBuilder(args).Build();
            //"using" here is going to releaze resources when this method isn't longer in the scope
            //It is going to dispose scope resources. It is doing the same thatn "finally" after the catch
            using var scope = host.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            //We add this logger here to be able to through our exeptions in the command prompt if there is any
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try 
            {
                context.Database.Migrate();
                DbInitializer.Initialize(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem migrating data");
            }
            // finally
            // {
            //     scope.Dispose();
            // }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
