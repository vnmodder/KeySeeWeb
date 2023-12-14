using KeySee.Infrastructure.Databases.CommandInterceptor;
using KeySee.Infrastructure.Databases.KeySeeDB;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeySee.Infrastructure.Databases
{
    public interface IDbContextFactory
    {
        /// <summary>
        /// Creates the key seeb context instance.
        /// </summary>
        /// <returns></returns>
        public KeySeeDbContext CreateKeySeebContextInstance();
    }
    public class DbContextFactory : IDbContextFactory
    {
        private readonly DbContextOptions<KeySeeDbContext> _keySeeDbContextOptions;

        public DbContextFactory(IConfiguration configuration)
        {
            if (!Directory.Exists($"{configuration["FtpServer:Directory"]}Logs/")){
                Directory.CreateDirectory($"{configuration["FtpServer:Directory"]}Logs/");
            }
            _keySeeDbContextOptions = new DbContextOptionsBuilder<KeySeeDbContext>()
                .AddInterceptors(new KeySeeDbContextCommandInterceptor($"{configuration["FtpServer:Directory"]}Logs/KeySeeDbContextSqlCommandLog.txt"))
                .UseSqlServer(
                    connectionString: configuration.GetConnectionString("KeySeeDB"),
                    sqlServerOptionsAction: sqlOptions =>
                    {
                        sqlOptions.CommandTimeout((int)TimeSpan.FromSeconds(SettingConstants.DatabaseSettings.TIMEOUT_FROM_SECONDS).TotalSeconds);
                        //sqlOptions.EnableRetryOnFailure();
                    })
                .EnableDetailedErrors()
                .Options;
        }

        public KeySeeDbContext CreateKeySeebContextInstance()
        {
            return new KeySeeDbContext(_keySeeDbContextOptions);
        }
    }
}
