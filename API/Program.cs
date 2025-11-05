using API.Data;
using API.Entities;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

// Load environment variables from .env file (only if it exists - for local dev)
if (File.Exists(".env"))
{
    Env.Load();
}

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to listen on the port provided by the environment (Azure uses PORT=8080)
var listenPort = Environment.GetEnvironmentVariable("PORT") ?? Environment.GetEnvironmentVariable("WEBSITES_PORT") ?? "8080";
builder.WebHost.ConfigureKestrel(options =>
{
    if (int.TryParse(listenPort, out var p))
    {
        options.ListenAnyIP(p);
    }
});
Console.WriteLine($"Configuring application to listen on port: {listenPort}");
// Add services to the container
builder.Services.AddControllers();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Build connection string from environment variables
var dbServer = Environment.GetEnvironmentVariable("DB_SERVER");
var dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "1433";
var dbName = Environment.GetEnvironmentVariable("DB_NAME");
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

// Log configuration (without password) for debugging
Console.WriteLine($"Database Configuration: Server={dbServer}:{dbPort}, Database={dbName}, User={dbUser}");

if (string.IsNullOrEmpty(dbServer) || string.IsNullOrEmpty(dbName))
{
    Console.WriteLine("WARNING: Database environment variables not configured properly!");
}

var connectionString = $"Server={dbServer},{dbPort};Database={dbName};User Id={dbUser};Password={dbPassword};TrustServerCertificate=True;Connection Timeout=30;";

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlServer(connectionString);
});

// Configure Identity
builder.Services.AddIdentityCore<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
    opt.Password.RequireDigit = true;
    opt.Password.RequireLowercase = true;
    opt.Password.RequireUppercase = true;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequiredLength = 6;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<StoreContext>()
.AddSignInManager<SignInManager<User>>();

builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies(options =>
    {
        options.ApplicationCookie?.Configure(opt =>
        {
            opt.Cookie.HttpOnly = true;
            opt.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            opt.Cookie.SameSite = SameSiteMode.None;
            opt.Cookie.Path = "/";
            opt.ExpireTimeSpan = TimeSpan.FromDays(7);
            opt.SlidingExpiration = true;
        });
    });
builder.Services.AddAuthorization();

// Configure Cloudinary settings from environment variables
builder.Services.Configure<CloudinarySettings>(options =>
{
    options.CloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME") ?? "";
    options.ApiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY") ?? "";
    options.ApiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET") ?? "";
});

// Register services
builder.Services.AddScoped<ImageService>();
builder.Services.AddScoped<PaymentsService>();
builder.Services.AddScoped<DiscountService>();
builder.Services.AddSingleton<API.Interfaces.IEmbeddingService, API.Services.GeminiEmbeddingService>();
builder.Services.AddScoped<API.Services.PineconeService>();
builder.Services.AddScoped<API.Services.GeminiChatService>();

builder.Services.AddCors();
builder.Services.AddTransient<API.Middleware.ExceptionMiddleware>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<API.Middleware.ExceptionMiddleware>();
// Configure the HTTP request pipeline.

// Get CORS origin from environment variable
var corsOrigin = Environment.GetEnvironmentVariable("CORS_ORIGIN") ?? "http://localhost:3000";

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(corsOrigin);
    Console.WriteLine("CORS Policy Applied");
});

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

// Initialize database with error handling
try
{
    Console.WriteLine("Attempting to initialize database...");
    DbInitializer.InitDb(app);
    Console.WriteLine("Database initialized successfully");
}
catch (Exception ex)
{
    Console.WriteLine($"ERROR initializing database: {ex.Message}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
    // Don't crash the app, just log the error
}

Console.WriteLine("Application starting...");
app.Run();
