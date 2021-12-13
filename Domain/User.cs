using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public decimal Budget { get; set; }
        public DateTime CreationDate { get; set; }
        
    }
}