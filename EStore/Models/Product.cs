using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int? CategoryId { get; set; }
        [Required]
        public string? Code { get; set; }
		public string? Description { get; set; }
		public decimal? Discount { get; set; }
		[Required]
        public string? Name { get; set; }
		[NotMapped]
		public IFormFile? Profile { get; set; }
		[Required]
        public decimal? PurchasePrice { get; set; }
		public int? Quantity { get; set; }
		public decimal? SalePrice { get; set; }
        public string? Image { get; set; }
        public bool? isDeleted { get; set; }
        public Category Category { get; set; }
    }
}
