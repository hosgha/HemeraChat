using Hemera.Chat.Entities;
using Hemera.Chat.Service;
using Microsoft.AspNetCore.SignalR;

namespace Hemera.Chat.Hubs;
public class ChatHub : Hub
{
    private readonly IChatService _chatService;

    public ChatHub(IChatService chatService)
    {
        _chatService = chatService;
    }

    public async Task NewMessage(Message msg)
    {
        await Clients.All.SendAsync("MessageReceived", msg);

        await _chatService.SaveMessageAsync(msg);
    }
}