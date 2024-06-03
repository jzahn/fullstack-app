using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model;

public class Contact
{
    [Key]
    // [DatabaseGenerated(DatabaseGeneratedOption.Computed)]

    public Guid? Id { get; set; }
    public string? First_name { get; set; }
    public string? Last_name { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
}