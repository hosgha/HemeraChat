﻿using Hemera.Chat.Enums;

namespace Hemera.Chat.Entities;
public class Message
{
    public long Id { get; set; }
    public string UniqueId { get; set; } = null!;
    public string Sender { get; set; } = null!;
    public string Reciever { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string ReplayFromUniqueId { get; set; } = default!;
    public TransferType TransferType { get; set; }
    public MessageType Type { get; set; }
    public ReactType ReactType { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsSeen { get; set; }
    public bool IsSenderDeleted { get; set; }
    public bool IsReceiverDeleted { get; set; }
    public string? ConnectionId { get; set; }
}