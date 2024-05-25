using Microsoft.EntityFrameworkCore;

namespace Model;

public class Contact
{
    public required Guid Id { get; set; }
    public string? First_name { get; set; }
    public string? Last_name { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
}