using KeySee.Infrastructure.Databases.KeySeeDB.Entities;
using KeySee.Infrastructure.Databases.KeySeeDB.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeySee.Infrastructure.Databases.KeySeeDB
{
    public partial class KeySeeDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public KeySeeDbContext(DbContextOptions<KeySeeDbContext> options)
     : base(options)
        {
        }

        #region DbSet declarations.
        public virtual DbSet<User> UserTables { get; set; }
        public virtual DbSet<Test> TestTables { get; set; }
        #endregion

        #region PORE Database Views
        //public virtual DbSet<ViewTotalConsumptionTaxPerTenant> ViewTotalConsumptionTaxPerTenants { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // modelBuilder.UseCollation("Japanese_CI_AS");

            // Apply configuration off IdentityDbContext.
            base.OnModelCreating(modelBuilder);

            // Configure the Id column for AspNetUsers table. Set max length to 50.
            //modelBuilder.Entity<User>().Property(u => u.Id)
            //    .HasColumnType("NVARCHAR")
            //    .HasMaxLength(7);

            // Configure the Id column for AspNetRoles table. Set max length to 50.
            //modelBuilder.Entity<IdentityRole<string>>().Property(u => u.Id)
            //    .HasColumnType("NVARCHAR")
            //    .HasMaxLength(7);

            // Add dumydata
            modelBuilder.AddDummyData();

            // OnModelCreatingPartial(modelBuilder);
            // Apply all configurations that have attached to DbContext.DbSets.
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(KeySeeDbContext).Assembly, entity => entity.Namespace.Contains("KeySeeDB"));
        }
    }
}
