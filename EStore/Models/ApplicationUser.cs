using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Image { get; set; }
		public string? Address { get; set; }
		public string? PostalCode { get; set; }
		public string? Country { get; set; }
		public string? State { get; set; }
		public bool? isDeleted { get; set; }
		[NotMapped]
		public IFormFile? Picture { get; set; }
	}
}
