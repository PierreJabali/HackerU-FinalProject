using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
	public class Profile
	{
		public string? Email { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? PhoneNumber { get; set; }
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
