using KeySee.Infrastructure.Constants;
using KeySee.Infrastructure.Databases;
using KeySee.Infrastructure.Databases.CommandInterceptor;
using KeySee.Infrastructure.Databases.KeySeeDB;
using KeySee.Infrastructure.Databases.KeySeeDB.Entities;
using KeySee.Infrastructure.HttpClientHelper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeySee.Infrastructure
{
    public static class InfrastructureServiceCollection
    {

        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Add Application Database context
            services.AddSingleton<IDbContextFactory, DbContextFactory>();
            // PORE
            services.AddKeySeeDbContext(configuration);

            // Add Identity
            services.AddIdentity<User, IdentityRole<Guid>>()
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<KeySeeDbContext>();

            //services.Configure<IdentityOptions>(options =>
            //{
            //    options.Lockout.DefaultLockoutTimeSpan = DateTime.UtcNow.AddYears(KEYSEESettings.DatabaseSettings.MAX_YEAR_LOCK_ACCOUNT).Subtract(DateTime.UtcNow);
            //    options.Lockout.MaxFailedAccessAttempts = KEYSEESettings.DatabaseSettings.MAX_ATTEMPS_WRONG_PASSWORD;
            //});

            // Add Authentication
            services.AddKeySeeAuthentication(configuration);

            // Add Authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("KEYSEE_ALL", policy => policy.RequireRole(RoleConstants.ZERO, RoleConstants.ADMIN, RoleConstants.USER));
            });

            // Add HTTP Integration services with client(s).
            services.AddHttpIntegrationServices();

            return services;
        }

        private static IServiceCollection AddKeySeeDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            if (!Directory.Exists($"{configuration["FtpServer:Directory"]}Logs/"))
            {
                Directory.CreateDirectory($"{configuration["FtpServer:Directory"]}Logs/");
            }
            services.AddDbContext<KeySeeDbContext>(options =>
            {
                options.AddInterceptors(new KeySeeDbContextCommandInterceptor($"{configuration["FtpServer:Directory"]}Logs/KeySeeDbContextSqlCommandLog.txt"));
                options.UseSqlServer(
                    connectionString: configuration.GetConnectionString("KeySeeDB"),
                    sqlServerOptionsAction: sqlOptions =>
                    {
                        sqlOptions.CommandTimeout((int)TimeSpan.FromSeconds(SettingConstants.DatabaseSettings.TIMEOUT_FROM_SECONDS).TotalSeconds);
                        //sqlOptions.EnableRetryOnFailure();
                    });
                options.EnableDetailedErrors();
            });

            return services;
        }

        private static IServiceCollection AddHttpIntegrationServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Register delegating handlers
            services.AddTransient<TimeoutDelegatingHandler>();
            services.AddTransient<HttpClientAuthorizationDelegatingHandler>();
            services.AddTransient<HttpClientRequestIdDelegatingHandler>();

            return services;
        }

        private static IServiceCollection AddKeySeeAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                // Adding JWT Bearer
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["JWT:ValidIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                    };
                });
            return services;
        }
    }
}
