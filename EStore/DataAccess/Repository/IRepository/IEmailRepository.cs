using BarberShop.Models;
using Models;
namespace DataAccess.Repository.IRepository
{
	public interface IEmailRepository : IRepository<EmailSetting>
	{
		void Update(EmailSetting obj);
	}
}
