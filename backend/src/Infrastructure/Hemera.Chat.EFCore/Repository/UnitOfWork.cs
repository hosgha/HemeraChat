namespace Hemera.Chat.EFCore.Repository
{
    //public class UnitOfWork : IUnitOfWork
    //{
    //    private readonly HemeraChatDbContext simpleChatDbContext;



    //    public UnitOfWork(HemeraChatDbContext simpleChatDbContext)
    //    {
    //        this.simpleChatDbContext = simpleChatDbContext;
    //    }

    //    public IRepository<TEntity> Repository<TEntity>() where TEntity : class
    //    {
    //        return new RepositoryBase<TEntity>(this.simpleChatDbContext);
    //    }

    //    public void SaveChanges()
    //    {
    //        //this.RunBeforeSave(this.dbContextScope);
    //        this.simpleChatDbContext.SaveChanges();
    //    }

    //    public async Task SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    //    {
    //        //this.RunBeforeSave(this.dbContextScope);
    //        await this.simpleChatDbContext.SaveChangesAsync(cancellationToken);
    //    }

    //    //protected virtual void RunBeforeSave(IDbContextScope currentDbContextScope)
    //    //{
    //    //}

    //    private bool disposed;
    //    protected virtual void Dispose(bool disposing)
    //    {
    //        if (this.disposed)
    //        {
    //            return;
    //        }

    //        if (disposing)
    //        {
    //            this.simpleChatDbContext.Dispose();
    //        }

    //        this.disposed = true;
    //    }

    //    public void Dispose()
    //    {
    //        this.Dispose(true);
    //    }
    //}
}
