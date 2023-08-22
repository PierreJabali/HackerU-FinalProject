using DataAccess.Data;
using DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccess.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
		private readonly ApplicationDbContext _db;
		internal DbSet<T> dbSet;

		public Repository(ApplicationDbContext db)
		{
			_db = db;
			dbSet = _db.Set<T>();
		}

		public void Add(T item)
		{
			dbSet.Add(item);
		}

		public IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null)
		{
			IQueryable<T> query = dbSet;
			if (filter != null)
			{
				query = query.Where(filter);
			}
			return query.ToList();
		}

		public int Count(Expression<Func<T, bool>>? filter = null)
		{
			IQueryable<T> query = dbSet;
			if (filter != null)
			{
				query = query.Where(filter);
			}
			return query.Count();
		}

		public T FirstOrDefault(Expression<Func<T, bool>> filter)
		{
			IQueryable<T> query = dbSet;
			query = query.Where(filter);
			return query.FirstOrDefault();
		}

		public void Remove(T item)
		{
			dbSet.Remove(item);
		}

		public void RemoveRange(IEnumerable<T> items)
		{
			dbSet.RemoveRange(items);
		}

		public T SingleOrDefault(Expression<Func<T, bool>> filter)
		{
			IQueryable<T> query = dbSet;
			query = query.Where(filter);
			return query.SingleOrDefault();
		}

		public T SingleOrDefaultDescending<TKey>(Expression<Func<T, TKey>> orderByDescending)
		{
			IQueryable<T> query = dbSet;
			query = query.OrderByDescending(orderByDescending);
			return query.SingleOrDefault();
		}
	}
}
