using Hemera.Chat.Entities;

namespace Hemera.Chat.Service;
public interface IChatService
{
    Task SaveMessageAsync(Message message);
    Task DeleteMessageAsync(Message message);
}
