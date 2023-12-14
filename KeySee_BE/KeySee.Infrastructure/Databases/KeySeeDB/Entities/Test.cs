using KeySee.Infrastructure.Databases.Common.BaseEntityModels;

namespace KeySee.Infrastructure.Databases.KeySeeDB.Entities
{
    public partial class Test : BaseEntity
    {
        public string? TestName { get; set; }
    }
}
