using Microsoft.EntityFrameworkCore;
using Model;

namespace Database;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<Contact> Contacts { get; set; } = null!;
}