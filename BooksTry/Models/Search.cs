using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
    public class Search
    {
        public int SearchId { get; set; }
        public int UserId { get; set; }
        public string CreatedAt { get; set; }
        public string SearchText { get; set; }

        public Search(int searchId, int userId, string createdAt, string searchText)
        {
            SearchId = searchId;
            UserId = userId;
            CreatedAt = createdAt;
            SearchText = searchText;
        }

        public Search()
        {

        }
    }
}
