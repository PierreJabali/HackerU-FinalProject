using Models;

namespace DataAccess.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        void Update(Product obj);
        public IEnumerable<dynamic> GetProductByCategory();
        public IEnumerable<dynamic> GetProductByCategory(string category);
        public IEnumerable<Product> GetFeaturedProducts();
        dynamic GetProductByProductId(int? id);
    }
}