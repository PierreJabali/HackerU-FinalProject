using Models;
using Utility;

namespace DataAccess.Repository.IRepository;
public interface IUserRepository : IRepository<ApplicationUser>
{
	Task<IEnumerable<UserWithRoles>> GetUsersWithRolesAsync(int skip, int take);
    Task<ApplicationUser> GetUsersByEmailAsync(string Email);
    void Update(ApplicationUser obj);
}