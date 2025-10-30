using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {
        public static async void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to retrieve store context");

            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            await SeedData(context, userManager, roleManager);

        }

        private static async Task SeedData(StoreContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Drop and recreate the database (use only in development)
            context.Database.EnsureDeleted();
            context.Database.Migrate();

            // Seed Roles
            if (!await roleManager.RoleExistsAsync("Member"))
            {
                await roleManager.CreateAsync(new IdentityRole("Member"));
            }

            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            // Seed Admin User
            if (await userManager.FindByEmailAsync("admin@test.com") == null)
            {
                var adminUser = new User
                {
                    UserName = "admin@test.com",
                    Email = "admin@test.com"
                };

                var result = await userManager.CreateAsync(adminUser, "Admin123!");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }

            if (context.Products.Any()) return;

            var Products = new List<Product>
           {
                    // Electronics
                    new() {
                    Name = "Wireless Bluetooth Headphones",
                    Description = "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and travelers.",
                    Price = 19999, // $199.99
                    PictureUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                    Brand = "Sony",
                    Type = "Electronics",
                    QuantityInStock = 50
                },
                new() {
                    Name = "Gaming Laptop - High Performance",
                    Description = "Powerful gaming laptop with RTX 4070 graphics, Intel i9 processor, 32GB RAM, and 1TB SSD. Handles latest AAA games at ultra settings with high frame rates.",
                    Price = 189999, // $1899.99
                    PictureUrl = "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
                    Brand = "ASUS",
                    Type = "Electronics",
                    QuantityInStock = 15
                },
                new() {
                    Name = "Smart Watch - Fitness Tracker",
                    Description = "Advanced smartwatch with heart rate monitor, GPS tracking, sleep analysis, and 100+ workout modes. Syncs with iOS and Android smartphones.",
                    Price = 24999, // $249.99
                    PictureUrl = "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
                    Brand = "Fitbit",
                    Type = "Electronics",
                    QuantityInStock = 75
                },
                new() {
                    Name = "4K Action Camera",
                    Description = "Waterproof action camera recording in stunning 4K resolution. Includes image stabilization, slow motion, and multiple mounting accessories for extreme sports.",
                    Price = 27999, // $279.99
                    PictureUrl = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
                    Brand = "GoPro",
                    Type = "Electronics",
                    QuantityInStock = 40
                },
                new() {
                    Name = "Wireless Gaming Mouse",
                    Description = "High-precision wireless gaming mouse with customizable RGB lighting, 16000 DPI sensor, and programmable buttons. Perfect for competitive gaming.",
                    Price = 7999, // $79.99
                    PictureUrl = "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
                    Brand = "Logitech",
                    Type = "Electronics",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Mechanical Gaming Keyboard",
                    Description = "RGB mechanical keyboard with Cherry MX switches, aluminum frame, and customizable macros. Tactile feedback for gaming and typing.",
                    Price = 12999, // $129.99
                    PictureUrl = "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400",
                    Brand = "Corsair",
                    Type = "Electronics",
                    QuantityInStock = 60
                },
                
                // Sports & Outdoors
                new() {
                    Name = "Running Shoes - Men's",
                    Description = "Lightweight athletic shoes designed for marathon runners. Features breathable mesh upper, responsive cushioning, and excellent grip for all terrains.",
                    Price = 12999, // $129.99
                    PictureUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
                    Brand = "Nike",
                    Type = "Sports & Outdoors",
                    QuantityInStock = 80
                },
                new() {
                    Name = "Yoga Mat - Eco Friendly",
                    Description = "Non-slip yoga mat made from sustainable materials. Extra thick for comfort, lightweight and portable. Ideal for yoga, pilates, and floor exercises.",
                    Price = 3999, // $39.99
                    PictureUrl = "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
                    Brand = "Manduka",
                    Type = "Sports & Outdoors",
                    QuantityInStock = 120
                },
                new() {
                    Name = "Camping Tent - 4 Person",
                    Description = "Spacious camping tent with easy setup, weather-resistant fabric, and excellent ventilation. Perfect for family camping trips and outdoor adventures.",
                    Price = 18999, // $189.99
                    PictureUrl = "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400",
                    Brand = "Coleman",
                    Type = "Sports & Outdoors",
                    QuantityInStock = 35
                },
                new() {
                    Name = "Mountain Bike - 21 Speed",
                    Description = "Durable mountain bike with aluminum frame, 21-speed gear system, and front suspension. Perfect for trails and off-road adventures.",
                    Price = 45999, // $459.99
                    PictureUrl = "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400",
                    Brand = "Trek",
                    Type = "Sports & Outdoors",
                    QuantityInStock = 25
                },
                new() {
                    Name = "Dumbbell Set - Adjustable",
                    Description = "Space-saving adjustable dumbbell set from 5-52.5 lbs. Quick weight adjustment with secure locking mechanism. Perfect for home gym workouts.",
                    Price = 29999, // $299.99
                    PictureUrl = "https://images.unsplash.com/photo-1517344800993-a8e5f2e8f2e1?w=400",
                    Brand = "Bowflex",
                    Type = "Sports & Outdoors",
                    QuantityInStock = 45
                },

                // Home & Kitchen
                new() {
                    Name = "Stainless Steel Water Bottle",
                    Description = "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof design, BPA-free, perfect for gym, office, or outdoor activities.",
                    Price = 2999, // $29.99
                    PictureUrl = "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
                    Brand = "Hydro Flask",
                    Type = "Home & Kitchen",
                    QuantityInStock = 150
                },
                new() {
                    Name = "Coffee Maker - Automatic",
                    Description = "Programmable coffee maker with built-in grinder, 12-cup capacity, and thermal carafe. Brew perfect coffee every morning with customizable strength settings.",
                    Price = 14999, // $149.99
                    PictureUrl = "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
                    Brand = "Cuisinart",
                    Type = "Home & Kitchen",
                    QuantityInStock = 55
                },
                new() {
                    Name = "Bamboo Cutting Board Set",
                    Description = "Set of three bamboo cutting boards in different sizes. Eco-friendly, antibacterial, and gentle on knife blades. Includes juice grooves for meat preparation.",
                    Price = 4499, // $44.99
                    PictureUrl = "https://images.unsplash.com/photo-1594973977493-e927bb4c41ea?w=400",
                    Brand = "Totally Bamboo",
                    Type = "Home & Kitchen",
                    QuantityInStock = 90
                },
                new() {
                    Name = "Non-Stick Cookware Set",
                    Description = "Complete 10-piece cookware set with non-stick coating, heat-resistant handles, and oven-safe construction. Includes pots, pans, and lids.",
                    Price = 19999, // $199.99
                    PictureUrl = "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400",
                    Brand = "T-fal",
                    Type = "Home & Kitchen",
                    QuantityInStock = 40
                },
                new() {
                    Name = "Air Fryer - 6 Quart",
                    Description = "Large capacity air fryer for healthy cooking with little to no oil. Digital controls, 8 preset cooking functions, and dishwasher-safe basket.",
                    Price = 12999, // $129.99
                    PictureUrl = "https://images.unsplash.com/photo-1585515320310-e6dc8e4c4534?w=400",
                    Brand = "Ninja",
                    Type = "Home & Kitchen",
                    QuantityInStock = 70
                },

                // Clothing
                new() {
                    Name = "Winter Jacket - Waterproof",
                    Description = "Heavy-duty winter jacket with thermal insulation and waterproof outer shell. Features multiple pockets, adjustable hood, and stylish design for cold weather.",
                    Price = 17999, // $179.99
                    PictureUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
                    Brand = "North Face",
                    Type = "Clothing",
                    QuantityInStock = 65
                },
                new() {
                    Name = "Casual T-Shirt - Cotton Blend",
                    Description = "Comfortable everyday t-shirt made from soft cotton blend. Available in multiple colors, perfect for casual wear or layering.",
                    Price = 2499, // $24.99
                    PictureUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
                    Brand = "H&M",
                    Type = "Clothing",
                    QuantityInStock = 200
                },
                new() {
                    Name = "Denim Jeans - Slim Fit",
                    Description = "Classic slim-fit denim jeans with comfortable stretch fabric. Durable construction with reinforced stitching and modern styling.",
                    Price = 5999, // $59.99
                    PictureUrl = "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
                    Brand = "Levi's",
                    Type = "Clothing",
                    QuantityInStock = 110
                },
                new() {
                    Name = "Hoodie - Premium Cotton",
                    Description = "Cozy pullover hoodie with soft fleece lining, kangaroo pocket, and adjustable drawstring hood. Perfect for lounging or casual outings.",
                    Price = 4999, // $49.99
                    PictureUrl = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
                    Brand = "Champion",
                    Type = "Clothing",
                    QuantityInStock = 95
                },

                // Furniture
                new() {
                    Name = "Leather Office Chair",
                    Description = "Ergonomic office chair with premium leather upholstery, adjustable lumbar support, and 360-degree swivel. Designed for all-day comfort and productivity.",
                    Price = 34999, // $349.99
                    PictureUrl = "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
                    Brand = "Herman Miller",
                    Type = "Furniture",
                    QuantityInStock = 30
                },
                new() {
                    Name = "Modern Standing Desk",
                    Description = "Electric height-adjustable standing desk with programmable memory settings. Spacious desktop, sturdy construction, and cable management system.",
                    Price = 49999, // $499.99
                    PictureUrl = "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400",
                    Brand = "Uplift",
                    Type = "Furniture",
                    QuantityInStock = 20
                },
                new() {
                    Name = "Bookshelf - 5 Tier",
                    Description = "Tall wooden bookshelf with five spacious shelves. Modern design fits any room decor, perfect for books, plants, and decorative items.",
                    Price = 12999, // $129.99
                    PictureUrl = "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400",
                    Brand = "IKEA",
                    Type = "Furniture",
                    QuantityInStock = 50
                },

                // Beauty & Personal Care
                new() {
                    Name = "Skincare Set - Anti-Aging",
                    Description = "Complete skincare routine with cleanser, serum, and moisturizer. Formulated with natural ingredients to reduce wrinkles, improve elasticity, and restore youthful glow.",
                    Price = 8999, // $89.99
                    PictureUrl = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
                    Brand = "Olay",
                    Type = "Beauty & Personal Care",
                    QuantityInStock = 85
                },
                new() {
                    Name = "Electric Toothbrush",
                    Description = "Rechargeable electric toothbrush with pressure sensor, multiple brushing modes, and 2-week battery life. Includes travel case and brush heads.",
                    Price = 7999, // $79.99
                    PictureUrl = "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400",
                    Brand = "Oral-B",
                    Type = "Beauty & Personal Care",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Hair Dryer - Professional",
                    Description = "Powerful ionic hair dryer with multiple heat settings, cool shot button, and concentrator nozzle. Reduces frizz and drying time.",
                    Price = 8999, // $89.99
                    PictureUrl = "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400",
                    Brand = "Dyson",
                    Type = "Beauty & Personal Care",
                    QuantityInStock = 45
                },

                // Musical Instruments
                new() {
                    Name = "Electric Guitar - Stratocaster Style",
                    Description = "Professional electric guitar with solid body, three single-coil pickups, and versatile tone controls. Great for rock, blues, and jazz musicians.",
                    Price = 59999, // $599.99
                    PictureUrl = "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400",
                    Brand = "Fender",
                    Type = "Musical Instruments",
                    QuantityInStock = 18
                },
                new() {
                    Name = "Acoustic Guitar - Dreadnought",
                    Description = "Full-size acoustic guitar with spruce top and mahogany back. Rich, balanced tone perfect for strumming and fingerpicking. Includes gig bag.",
                    Price = 29999, // $299.99
                    PictureUrl = "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
                    Brand = "Yamaha",
                    Type = "Musical Instruments",
                    QuantityInStock = 25
                },
                new() {
                    Name = "Digital Piano - 88 Keys",
                    Description = "Full-size digital piano with weighted keys, built-in speakers, and multiple instrument voices. Includes sustain pedal and headphone jack for silent practice.",
                    Price = 79999, // $799.99
                    PictureUrl = "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
                    Brand = "Casio",
                    Type = "Musical Instruments",
                    QuantityInStock = 12
                },

                // Food & Beverages
                new() {
                    Name = "Organic Green Tea - 100 Bags",
                    Description = "Premium organic green tea sourced from mountain gardens. Rich in antioxidants, promotes wellness and relaxation. Perfect for daily consumption.",
                    Price = 2499, // $24.99
                    PictureUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
                    Brand = "Twinings",
                    Type = "Food & Beverages",
                    QuantityInStock = 200
                },
                new() {
                    Name = "Organic Coffee Beans - Dark Roast",
                    Description = "Premium Arabica coffee beans with bold, rich flavor. Ethically sourced and roasted to perfection. Perfect for espresso or drip coffee.",
                    Price = 1899, // $18.99
                    PictureUrl = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
                    Brand = "Starbucks",
                    Type = "Food & Beverages",
                    QuantityInStock = 150
                },
                new() {
                    Name = "Protein Powder - Whey Isolate",
                    Description = "High-quality whey protein isolate with 25g protein per serving. Low carb, low fat, and delicious chocolate flavor. Supports muscle growth and recovery.",
                    Price = 4999, // $49.99
                    PictureUrl = "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
                    Brand = "Optimum Nutrition",
                    Type = "Food & Beverages",
                    QuantityInStock = 80
                },

                // Original products kept for reference
                new() {
                    Name = "Green Angular Board 3000",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureUrl = "/images/products/sb-ang2.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Core Board Speed Rush 3",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/sb-core1.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Net Core Super Board",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-core2.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new() {
                    Name = "React Board Super Whizzy Fast",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "React",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Typescript Entry Board",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureUrl = "/images/products/sb-ts1.png",
                    Brand = "TypeScript",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Core Blue Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/hat-core1.png",
                    Brand = "NetCore",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Green React Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/hat-react1.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Purple React Woolen Hat",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/hat-react2.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Blue Code Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products/glove-code1.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Green Code Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/glove-code2.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Purple React Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/glove-react1.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Green React Gloves",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/glove-react2.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Redis Red Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/boot-redis1.png",
                    Brand = "Redis",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Core Red Boots",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/boot-core2.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Core Purple Boots",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    PictureUrl = "/images/products/boot-core1.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Angular Purple Boots",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products/boot-ang2.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new() {
                    Name = "Angular Blue Boots",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products/boot-ang1.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
           };

            context.Products.AddRange(Products);
            context.SaveChanges();

        }

    }
}