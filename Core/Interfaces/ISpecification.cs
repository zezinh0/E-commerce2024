using System;
using System.Linq.Expressions;

namespace Core.Interfaces;

public interface ISpecification<T>
{
    Expression<Func<T, bool>>? Criteria {get; }
    Expression<Func<T, object>>? OrderBy {get; }
    Expression<Func<T, object>>? OrderByDescending {get; }
    bool IsDistintc {get;}
    int Take {get;}
    int Skip {get;}
    bool IsPagingEnabled {get;}
    IQueryable<T> AppllyCriteria(IQueryable<T> query);
}

public interface ISpecification<T, TResult> : ISpecification<T>
{
    Expression<Func<T, TResult>>? Select {get; }
}