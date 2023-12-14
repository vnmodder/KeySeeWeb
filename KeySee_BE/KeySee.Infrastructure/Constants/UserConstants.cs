namespace KeySee.Infrastructure.Constants
{
    public static class UserConstants
    {
        public static string SystemUserId = Environment.GetEnvironmentVariable("SystemUserId") ?? String.Empty;
    }
}
