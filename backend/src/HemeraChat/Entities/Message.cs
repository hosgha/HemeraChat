using HemeraChat.Common.Enums;

namespace HemeraChat.Entities
{
    public class Message
    {
        //public string UniqueId { get; set; } = null!;
        //public string Sender { get; set; } = null!;
        //public string Reciever { get; set; } = null!;
        //public string Content { get; set; } = null!;
        //public string ReplayFromUniqueId { get; set; } = default!;
        //public MessageType Type { get; set; }
        //public ReactType ReactType { get; set; }
        //public DateTime CreatedDate { get; set; }
        //public bool IsSeen { get; set; }
        //public bool IsSenderDeleted { get; set; }
        //public bool IsReceiverDeleted { get; set; }
        //public string? ConnectionId { get; set; }
        public string clientuniqueid { get; set; }
        public string type { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }
    }
}
