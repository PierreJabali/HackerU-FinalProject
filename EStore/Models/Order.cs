using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string? OrderNo { get; set; }
        public DateTime? Date { get; set; }
        public string? UserId { get; set; }
        [Required]
        public string? Status { get; set; }
        [Required]
        public string? Payment_Mode { get; set; }
        public decimal? TotalAmount { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
