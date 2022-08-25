using Hemera.Chat.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace Hemera.Chat.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly static ConnectionMapping<string> _connections =
        new ConnectionMapping<string>();

    public async Task SendDirectMessage(Message message)
    {
        string? name = Context?.User?.Identity?.Name;

        if(message.Sender != null && message.Sender == name)
        {
            foreach (var connectionId in _connections.GetConnections(message.Reciever))
            {
                await Clients.Client(connectionId).SendAsync("ReceivedMessage", message);
            }
        } else
        {
            // TODO: Logged It
        }
    }

    public override async Task OnConnectedAsync()
    {
        string? name = Context?.User?.Identity?.Name;

        _connections.Add(name, Context.ConnectionId);

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        string? name = Context?.User?.Identity?.Name;

        _connections.Remove(name, Context.ConnectionId);

        await base.OnDisconnectedAsync(exception);
    }
}