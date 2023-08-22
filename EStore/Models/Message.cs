using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Subject { get; set; }
        [Required]
        public string? Messages { get; set; }
        public string? Date { get; set; }
    }
}
