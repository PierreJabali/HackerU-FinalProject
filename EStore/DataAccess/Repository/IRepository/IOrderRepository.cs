using Models;

namespace DataAccess.Repository.IRepository
{
    public interface IOrderRepository : IRepository<Order>
    {
        void Update(Order obj);
        Task<List<CustomOrderInfo>> GetOrdersByCustomers();
        Task<Order> GetOrdersWithDetails(int id);
        Task<List<OrderDetail>> GetOrdersDetailsByOrderId(int id);
    }
}
