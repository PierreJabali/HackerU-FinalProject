using System.ComponentModel.DataAnnotations;

namespace Models;
public class SendEmail
{
	[Required]
	public string? Email { get; set; }

	// Subject of the message
	[StringLength(200, ErrorMessage = "The Subject field cannot exceed {1} characters.")]
	public string? Subject { get; set; }

	// Message text
	[Required(ErrorMessage = "The Message Text field is required.")]
	public string? Message_Text { get; set; }
}
