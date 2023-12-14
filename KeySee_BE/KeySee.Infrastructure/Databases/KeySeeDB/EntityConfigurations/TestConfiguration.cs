using KeySee.Infrastructure.Databases.KeySeeDB.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using KeySee.Infrastructure.Databases.Common.BaseEntityConfiguration;

namespace KeySee.Infrastructure.Databases.KeySeeDB.EntityConfigurations
{
    public class TestConfiguration : BaseEntityConfiguration<Test>
    {
        public override void Configure(EntityTypeBuilder<Test> builder)
        {
            base.Configure(builder);

            builder
                .HasNoKey()
                .ToTable("Test");

            builder.Property(e => e.TestName)
              .HasMaxLength(12)
              .IsUnicode(false)
              .IsFixedLength()
              .HasColumnName("TestName");
        }
    }
}
