using DataAccess.Data;
using DataAccess.Repository.IRepository;
using Models;

namespace DataAccess.Repository
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        private ApplicationDbContext _db;
        public MessageRepository(ApplicationDbContext db) : base(db)
        {
            _db= db;
        }
        public void Update(Message obj)
        {
            _db.Update(obj);
        }
   
    }
}
