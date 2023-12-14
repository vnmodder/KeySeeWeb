using KeySee.Infrastructure.Databases.KeySeeDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace KeySee.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthCheckController : KeySeeController
    {
        private readonly KeySeeDbContext _keySeeDbContext;
        private readonly IConfiguration _configuration;

        public HealthCheckController(
            KeySeeDbContext context,
            IConfiguration configuration) : base()
        {
            _keySeeDbContext = context;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var healthCheck = new StringBuilder();
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            // KEYSEE system time.
            healthCheck.AppendLine($"KEYSEE SYSTEM TIME: {DateTime.UtcNow}")
                .AppendLine(AUnderscoresLine())
                .AppendLine()
                .AppendLine($"KEYSEE ENVIRONMENT CONFIGURED: {environment}")
                .AppendLine(AUnderscoresLine());

            // Commit version information
            healthCheck.AppendLine()
                .AppendLine("GIT COMMIT INFORMATION:")
                .AppendLine()
                //.AppendLine($"Last Commit: {ThisAssembly.Git.Commit}")
                //.AppendLine($"SHA: {ThisAssembly.Git.Sha}")
                //.AppendLine($"Commit Time: {DateTime.Parse(ThisAssembly.Git.CommitDate):yyyy年MM月dd日 HH:mm:ss UTC}")
                //.AppendLine($"Branch: {ThisAssembly.Git.Branch}")
                //.AppendLine($"Commit quantity: {ThisAssembly.Git.Commits} (commits)")
                .AppendLine(AUnderscoresLine());

            // Verify Database connection
            healthCheck.AppendLine().AppendLine("KEYSEE'S DATABASES:")
                .AppendLine("----");
#if DEBUG
            healthCheck.AppendLine("KEYSEE Connection string: \n\t" + _configuration.GetConnectionString("KeySeeDB"));
#endif

            using (var connection = _keySeeDbContext.Database.GetDbConnection())
            {
                var resourceName = $"Server: {connection.DataSource}\r\nDatabase: {connection.Database}\r\nVerify Status";
                var result = await VerifyResourceAsync(resourceName,
                    async () => await _keySeeDbContext.Database.OpenConnectionAsync());

                healthCheck.AppendLine(result);
            }

            healthCheck.AppendLine(AUnderscoresLine());

            return new OkObjectResult(healthCheck.ToString());
        }

        private static async Task<string> VerifyResourceAsync(string resourceName, Func<Task> task)
        {
            try
            {
                await task();
                return $"{resourceName} => OK";
            }
            catch (Exception ex)
            {
                return $"{resourceName} => Failed: {ex}";
            }
        }

        private static string AUnderscoresLine() => "_______________________________________________________________________________________________________________";
    }
}

