using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Model;

[Index(nameof(Email), IsUnique = true)]
public class Contact
{
    [Key]
    public Guid? Id { get; set; }
    public required string First_name { get; set; }
    public required string Last_name { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
}