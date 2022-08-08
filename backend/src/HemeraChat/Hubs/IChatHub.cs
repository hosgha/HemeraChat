using HemeraChat.Entities;

namespace HemeraChat.Hubs;
public interface IChatHub
{
    Task SendAsync(string type, Message message);
}
