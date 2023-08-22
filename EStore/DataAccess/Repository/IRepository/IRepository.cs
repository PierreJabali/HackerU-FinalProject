using System.Linq.Expressions;

namespace DataAccess.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
		IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null);
		int Count(Expression<Func<T, bool>>? filter = null);
		T FirstOrDefault(Expression<Func<T, bool>> filter);
		T SingleOrDefault(Expression<Func<T, bool>> filter);
		T SingleOrDefaultDescending<TKey>(Expression<Func<T, TKey>> orderByDescending);
		void Add(T item);
		void Remove(T item);
		void RemoveRange(IEnumerable<T> item);
	}
}
