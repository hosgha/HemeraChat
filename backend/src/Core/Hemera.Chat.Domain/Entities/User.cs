using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hemera.Chat.Entities;
public class ApplicationUser : IdentityUser
{
    [Column(TypeName = "nvarchar(150)")]
    public string FirstName { get; set; } = default!;

    [Column(TypeName = "nvarchar(150)")]
    public string LastName { get; set; } = default!;
    public bool IsOnline { get; set; }
}