using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        // Products is going to be the name of the table that is going to be created
        public DbSet<Product> Products {get; set; }
        public DbSet<Basket> Baskets {get; set; }
    }
}