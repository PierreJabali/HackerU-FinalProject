using DataAccess.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Utility;

namespace EStore.Controllers
{
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly ILogger<AuthController> _logger;
		private readonly IConfiguration _configuration;
		private readonly ApplicationDbContext _db;

		public AuthController(
			SignInManager<ApplicationUser> signInManager,
			ILogger<AuthController> logger,
			IConfiguration configuration,
			UserManager<ApplicationUser> userManager,
			ApplicationDbContext db)
		{
			_signInManager = signInManager;
			_logger = logger;
			_configuration = configuration;
			_userManager = userManager;
			_db = db;
		}
		[HttpPost]
		[Route("api/Auth/Login")]
		public async Task<IActionResult> Login(LoginInputModel model)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
					return BadRequest(new { errors });
				}

				var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

				if (result.Succeeded)
				{
					var user = await (from u in _db.Users
									  join userRoles in _db.UserRoles on u.Id equals userRoles.UserId
									  join roles in _db.Roles on userRoles.RoleId equals roles.Id
									  where u.Email == model.Email && u.isDeleted == false
									  orderby u.UserName
									  select new
									  {
										  Id = u.Id,
										  FirstName = u.FirstName,
										  LastName = u.LastName,
										  Email = u.Email,
										  Address = u.Address,
										  Country = u.Country,
										  Image = u.Image,
										  PhoneNumber = u.PhoneNumber,
										  PostalCode = u.PostalCode,
										  State = u.State,
										  Role = roles.Name,
										  UserName = u.UserName
									  }).FirstOrDefaultAsync();
					var currentUser = new CurrentUser
					{
						UserName = user.UserName,
						Id = user.Id
					};

					var token = CreateJWT(currentUser);
					return Ok(new
					{
						user,
						token
					});
				}

				if (result.RequiresTwoFactor)
				{
					return BadRequest("Two-factor authentication is required.");
				}

				if (result.IsLockedOut)
				{
					return BadRequest("User account locked out.");
				}

				return BadRequest("Invalid login attempt.");
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { error = ex.Message });
			}
		}

		private string CreateJWT(CurrentUser user)
		{
			var secretKey = _configuration.GetSection("Jwt:Key").Value;
			if (string.IsNullOrEmpty(secretKey))
			{
				throw new Exception("Invalid secret key");
			}

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.UserName),
			};

			var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddMinutes(60),
				SigningCredentials = signingCredentials
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
