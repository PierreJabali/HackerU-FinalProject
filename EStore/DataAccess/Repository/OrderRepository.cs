using DataAccess.Data;
using DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DataAccess.Repository
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        private ApplicationDbContext _db;
        public OrderRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Order obj)
        {
            _db.Update(obj);
        }
        public async Task<List<CustomOrderInfo>> GetOrdersByCustomers()
        {
            var ordersWithCustomColumns = await _db.Order
                .Include(x => x.User)
                .Select(order => new CustomOrderInfo
                {
                    OrderId = order.Id,
                    OrderNo = order.OrderNo ?? "",
                    OrderDate = DateTime.Parse(order.Date.ToString() ?? ""),
                    Status = order.Status ?? "",
                    Payment_Mode = order.Payment_Mode ?? "",
                    TotalAmount = Convert.ToDecimal(order.TotalAmount.ToString()),
                    PostalCode = order.User.PostalCode ?? "",
                    FullName = order.User.FirstName + " " + order.User.LastName,

                }).ToListAsync();

            return ordersWithCustomColumns;
        }

        public async Task<Order> GetOrdersWithDetails(int id)
        {
            var orders = await _db.Order
                .Include(x => x.OrderDetail)
                .FirstOrDefaultAsync(x => x.Id == id);

            return orders ?? new Order();
        }

        public async Task<List<OrderDetail>> GetOrdersDetailsByOrderId(int id)
        {
            var orders = await _db.OrderDetail
                .Include(x => x.Product)
                .Where(x => x.OrderId == id)
                .ToListAsync();

            return orders ?? new List<OrderDetail>();
        }
    }
}
