﻿using System.ComponentModel.DataAnnotations;

namespace Utility
{
	public class LoginInputModel
	{
		[Required]
		[EmailAddress]
		public string? Email { get; set; }
		[Required]
		public string? Password { get; set; }
		public bool RememberMe { get; set; }
	}
}
