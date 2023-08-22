using DataAccess.Data;
using DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Data;
using Utility;

namespace DataAccess.Repository
{
	public class UserRepository : Repository<ApplicationUser>, IUserRepository
	{
		private ApplicationDbContext _db;
		public UserRepository(ApplicationDbContext db) : base(db)
		{
			_db = db;
		}
		public async Task<IEnumerable<UserWithRoles>> GetUsersWithRolesAsync(int skip, int take)
		{
			var usersWithRoles = await (from user in _db.Users
										join userRoles in _db.UserRoles on user.Id equals userRoles.UserId
										join roles in _db.Roles on userRoles.RoleId equals roles.Id
										where roles.Name == "Customer" && user.isDeleted == false
										orderby user.UserName
										select new UserWithRoles()
										{
											Id = user.Id,
											FirstName = user.FirstName, 
											LastName = user.LastName,
											Email = user.Email,
											Address = user.Address,
											Country = user.Country,
											Image = user.Image,
											PhoneNumber = user.PhoneNumber,
											PostalCode = user.PostalCode,
											State = user.State,
											Role = roles.Name,
										})
										.Skip(skip)
										.Take(take)
										.ToListAsync();

			return usersWithRoles;
		}
        public async Task<ApplicationUser> GetUsersByEmailAsync(string Email)
        {
            var usersWithRoles = await (from user in _db.Users
                                        join userRoles in _db.UserRoles on user.Id equals userRoles.UserId
                                        join roles in _db.Roles on userRoles.RoleId equals roles.Id
                                        where roles.Name == "Customer" && user.isDeleted == false && user.Email == Email
                                        orderby user.UserName
                                        select user)
                                        .FirstOrDefaultAsync();

            return usersWithRoles;
        }
        public void Update(ApplicationUser obj)
		{
			_db.Update(obj);
		}
	}
}
