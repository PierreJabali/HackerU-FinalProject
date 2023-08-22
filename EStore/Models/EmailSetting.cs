using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BarberShop.Models
{
    [Table("Email_Settings")]
    public class EmailSetting
    {
        [Key]
        public int Setting_ID { get; set; }

        // SMTP server
        [Required(ErrorMessage = "The SMTP Server field is required.")]
        [StringLength(100, ErrorMessage = "The SMTP Server field cannot exceed {1} characters.")]
        public string? SMTP_Server { get; set; }

        // Port
        [Required(ErrorMessage = "The Port field is required.")]
        public int Port { get; set; }

        // Username
        [Required(ErrorMessage = "The Username field is required.")]
        [StringLength(50, ErrorMessage = "The Username field cannot exceed {1} characters.")]
        public string? Username { get; set; }

        // Password
        [Required(ErrorMessage = "The Password field is required.")]
        [StringLength(100, ErrorMessage = "The Password field cannot exceed {1} characters.")]
        public string? Password { get; set; }

        // Encryption
        [StringLength(20, ErrorMessage = "The Encryption field cannot exceed {1} characters.")]
        public string? Encryption { get; set; }

        // Signature
        [Required(ErrorMessage = "The Signature field is required.")]
        public string? Signature { get; set; }
        // Last updated timestamp
        [DataType(DataType.DateTime)]
        public DateTime? Last_Updated { get; set; }
    }
}
