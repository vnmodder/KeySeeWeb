﻿namespace KeySee.Infrastructure.Databases.CommandInterceptor
{
    public class KeySeeDbContextCommandInterceptor : AbstractCommandInterceptor
    {
        public KeySeeDbContextCommandInterceptor(string filePath) : base(filePath)
        {
        }
    }
}
