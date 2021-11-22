using Domain;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //Adding table for DB migration
        public DbSet<User> Users { get; set; }
    }
}