using BarberShop.Models;
using DataAccess.Data;
using DataAccess.Repository.IRepository;

namespace DataAccess.Repository
{
	public class EmailRepository : Repository<EmailSetting>, IEmailRepository
	{
		private ApplicationDbContext _db;
		public EmailRepository(ApplicationDbContext db) : base(db)
		{
			_db = db;
		}
		public void Update(EmailSetting obj)
		{
			_db.Update(obj);
		}
	}
}
