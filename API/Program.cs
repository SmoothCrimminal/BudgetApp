using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Database;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using var scope = host.Services.CreateScope();

            var services = scope.ServiceProvider;

            try
            {
                // Adding database and tables at the startup of project
                var context = services.GetRequiredService<DataContext>();
                var userManager = services.GetRequiredService<UserManager<User>>();
                await context.Database.MigrateAsync();
            }

            catch (Exception ex)
            {
                // Handling exception
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error has occured during migration");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseKestrel(o =>
                    {
                        o.Listen(System.Net.IPAddress.Loopback, 5000, lo =>
                        {
                            lo.UseHttps(@"C:\Users\lataw\OneDrive\Pulpit\testCert.pfx", "123");
                        });
                    }).UseUrls("https://localhost:5000");
                });
    }
}
