using HemeraChat.Entities;
using Microsoft.AspNetCore.SignalR;

namespace HemeraChat.Hubs;
public class ChatHub : Hub
{
    public async Task NewMessage(Message msg)
    {
        await Clients.All.SendAsync("MessageReceived", msg);
    }
}