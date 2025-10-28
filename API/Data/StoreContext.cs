using System;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Basket> Baskets { get; set; }

        public DbSet<Order> Orders { get; set; }
    }
}