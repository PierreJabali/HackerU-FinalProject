using DataAccess.Data;
using DataAccess.Repository.IRepository;

namespace DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            Category = new CategoryRepository(_db);
            Product = new ProductRepository(_db); 
            Message = new MessageRepository(_db); 
            Users = new UserRepository(_db);
			Email = new EmailRepository(_db);
			Order = new OrderRepository(_db);
            OrderDetail = new OrderDetailRepository(_db);
		}
        public ICategoryRepository Category { get; private set; }
        public IMessageRepository Message { get; private set; }
        public IProductRepository Product { get; private set; }
		public IUserRepository Users { get; }
		public IEmailRepository Email { get; }
		public IOrderRepository Order { get; }
		public IOrderDetailRepository OrderDetail { get; }
		public void Save()
        {
            _db.SaveChanges();
        }
    }
}
