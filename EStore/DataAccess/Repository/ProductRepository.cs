using DataAccess.Data;
using DataAccess.Repository.IRepository;
using Models;

namespace DataAccess.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private ApplicationDbContext _db;
        public ProductRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Product obj)
        {
            var objFromDb = _db.Product.FirstOrDefault(p => p.Id == obj.Id);
            if (objFromDb != null)
            {
                objFromDb.Code = obj.Code; ;
                objFromDb.Name = obj.Name;
                objFromDb.PurchasePrice = obj.PurchasePrice;
                objFromDb.SalePrice = obj.SalePrice;
                objFromDb.Description = obj.Description;
                objFromDb.isDeleted = obj.isDeleted;
                objFromDb.CategoryId = obj.CategoryId;

                if (obj.Image != null)
                {
                    objFromDb.Image = obj.Image;
                }
            }
        }
        public IEnumerable<dynamic> GetProductByCategory()
        {
            var Product = (from product in _db.Product
                           join category in _db.Category on product.CategoryId equals category.Id
                           where product.isDeleted == false
                           select new
                           {
                               Id = product.Id,
                               Name = product.Name,
                               PurchasePrice = product.PurchasePrice,
                               SalePrice = product.SalePrice,
                               Image = product.Image,
                               CategoryId = product.CategoryId,
                               Discount = product.Discount,
                               Quantity = product.Quantity,
                               Deleted = product.isDeleted,
                               CategoryName = category.Name
                           }).ToList();
            return Product;
        }
        public IEnumerable<dynamic> GetProductByCategory(string cat)
        {
            var Product = (from product in _db.Product
                           join category in _db.Category on product.CategoryId equals category.Id
                           where category.Name == cat && product.isDeleted == false
                           select new
                           {
                               Id = product.Id,
                               Name = product.Name,
                               PurchasePrice = product.PurchasePrice,
                               SalePrice = product.SalePrice,
                               Image = product.Image,
                               CategoryId = product.CategoryId,
                               Discount = product.Discount,
                               Quantity = product.Quantity,
                               CategoryName = category.Name
                           }).ToList();
            return Product;
        }
        public dynamic GetProductByProductId(int? id)
        {
            var Product = (from product in _db.Product
                           join category in _db.Category on product.CategoryId equals category.Id
                           where product.isDeleted == false && product.Id == id
                           select new
                           {
                               Id = product.Id,
                               Name = product.Name,
                               PurchasePrice = product.PurchasePrice,
                               SalePrice = product.SalePrice,
                               Image = product.Image,
                               CategoryId = product.CategoryId,
                               Discount = product.Discount,
                               Quantity = product.Quantity,
                               Deleted = product.isDeleted,
                               CategoryName = category.Name
                           }).FirstOrDefault();
            return Product;
        }
        public IEnumerable<Product> GetFeaturedProducts()
        {
            var featuredProductIds = _db.OrderDetail
                .Where(od => od.Product.isDeleted == false)
                .GroupBy(od => od.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    TotalOrders = g.Sum(od => od.OrderQuantity)
                })
                .OrderByDescending(x => x.TotalOrders)
                .Take(10)
                .Select(x => x.ProductId)
                .ToList();

            var featuredProducts = _db.Product
                .Where(p => featuredProductIds.Contains(p.Id))
                .ToList();

            if (featuredProducts is null)
            {
                featuredProducts = new List<Product>();
            }

            return featuredProducts;
        }
    }
}