using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class OrderDetail
    {
        [Key]
        public int? Id{ get; set; }
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        [Required]
        public int? OrderQuantity { get; set; }
        public int? OrderId { get; set; }
        public decimal? Price { get; set; }
        public decimal? Discount { get; set; }
        public Order Order { get; set; }
    }
}
