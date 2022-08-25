using Hemera.Chat.Entities;

namespace Hemera.Chat.Service;
public class ChatService : IChatService
{
    public Task DeleteMessageAsync(Message message)
    {
        return Task.CompletedTask;
    }

    public Task SaveMessageAsync(Message message)
    {
        return Task.CompletedTask;
    }
}