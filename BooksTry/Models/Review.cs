using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public char TitleId { get; set; }
        public int RRating { get; set; }
        public string RText { get; set; }
        public DateTime CreatedAt { get; set; }

        public Review()
        {

        }

        public Review(int reviewId, int userId, char titleId, int rating, string rText, DateTime createdAt)
        {
            ReviewId = reviewId;
            UserId = userId;
            TitleId = titleId;
            RRating = rating;
            RText = rText;
            CreatedAt= createdAt;
        }
    }
}
