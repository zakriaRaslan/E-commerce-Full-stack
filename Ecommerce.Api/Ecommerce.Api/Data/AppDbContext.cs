using Ecommerce.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Api.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> option) : base(option)
        {
        }
        protected override void OnModelCreating(ModelBuilder Builder)
        {
            base.OnModelCreating(Builder);
            Builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
            Builder.Entity<AppUser>(entity =>
            {
                entity.ToTable("User", "Auth");
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Email).IsRequired();
            });
            Builder.Entity<IdentityRole>(entity =>
            {
                entity.ToTable("Role", "Auth");
            });
            Builder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("UserRoles", "Auth");

            });
            Builder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("RoleClaims", "Auth");
            });

            Builder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("UserClaims", "Auth");
            });

            Builder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("RoleLogins", "Auth");
            });
            Builder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("UserTokens", "Auth");
            });
            Builder.Entity<Review>(entity =>
            {
                entity.ToTable("Reviews");
            });
        }
        public DbSet<Product> products { get; set; }
        public DbSet<ProductCategory> productCategories { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Cart> ShoppingCart { get; set; }
        public DbSet<CartItems> CartItems { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }

    }
}
