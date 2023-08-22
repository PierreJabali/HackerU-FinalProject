namespace DataAccess.Repository.IRepository
{
   
    public interface IUnitOfWork
    {
        ICategoryRepository Category { get; }
        IProductRepository Product { get; }
        IMessageRepository Message { get; }
		IUserRepository Users { get; }
		IEmailRepository Email { get; }
		IOrderRepository Order { get; }
        IOrderDetailRepository OrderDetail { get; }
		void Save();
    }
}
