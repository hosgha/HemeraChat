using Microsoft.Extensions.DependencyInjection;

namespace Hemera.Chat.EFCore;
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddEFCore(this IServiceCollection services)
    {
        return services;
    }
}
