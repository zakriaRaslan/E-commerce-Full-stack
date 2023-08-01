using Ecommerce.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce.Api.Data.Config
{
    public class ProductCategoryConfiq : IEntityTypeConfiguration<ProductCategory>
    {
        public void Configure(EntityTypeBuilder<ProductCategory> builder)
        {
            builder.HasKey(x => x.Id);
            builder.ToTable("ProductCategories");
            builder.Property(x => x.Category).IsRequired().HasMaxLength(25);
            builder.Property(x => x.SubCategory).HasMaxLength(25);
        }
    }
}
