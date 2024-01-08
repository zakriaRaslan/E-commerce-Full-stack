using Ecommerce.Api.Data;
using Ecommerce.Api.Helpers;
using Ecommerce.Api.Models;
using Ecommerce.Api.Services.AccountService;
using Ecommerce.Api.Services.AuthService;
using Ecommerce.Api.Services.CartService;
using Ecommerce.Api.Services.DashboardService;
using Ecommerce.Api.Services.EmailService;
using Ecommerce.Api.Services.OrderService;
using Ecommerce.Api.Services.ProductCategoryService;
using Ecommerce.Api.Services.ReviewService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
       builder =>
       {
           builder.WithOrigins(
               "https://e-commerce-68990.web.app",
               "http://localhost",
               "http://localhost:4200",
               "https://localhost:7230",
               "http://localhost:90"
               )
            .AllowAnyMethod()
            .AllowAnyHeader();


       });
    //WithOrigins("http://localhost",
    //            "http://localhost:4200",
    //            "https://localhost:7230",
    //            "http://localhost:90",
    //            "https://e-commerce-68990.web.app")
});
builder.Services.AddControllers()
     .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
     });
//Add Configurations
builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));
//For Entity FramWork
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//For Identity
builder.Services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>();
//Add Config For Email Requierd
builder.Services.Configure<IdentityOptions>(opt => opt.SignIn.RequireConfirmedEmail = true);
builder.Services.Configure<DataProtectionTokenProviderOptions>(opt => opt.TokenLifespan = TimeSpan.FromHours(1));
//test for forgot
builder.Services.AddIdentityCore<AppUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<AppDbContext>()
                .AddTokenProvider<DataProtectorTokenProvider<AppUser>>(TokenOptions.DefaultProvider);
//Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.RequireHttpsMetadata = false;
    o.SaveToken = false;
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDataAccess, DataAccess>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

//Configure the HTTP request pipeline.

//if (app.Environment.IsDevelopment())
//{

//}
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseCors(MyAllowSpecificOrigins); //lazem tb2a fo2 el app.Authporization
app.UseAuthorization();
app.MapControllers();

app.Run();
