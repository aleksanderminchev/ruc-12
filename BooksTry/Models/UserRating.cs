using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
    public class UserRating
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string TitleId { get; set; }
        public int Value { get; set; }
        public string Comment { get; set; }
        public string CreatedAt { get; set; }

        public UserRating()
        {

        }

        public UserRating(int id, int userId, string titleId, int value, string comment, string createdAt)
        {
            Id = id;
            UserId = userId;
            TitleId = titleId;
            Value = value;
            Comment = comment;
            CreatedAt = createdAt;
        }

    }
}
