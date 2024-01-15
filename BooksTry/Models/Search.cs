using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
    public class SearchResult
    {
        public string Identifier { get; set; }
        public string Title { get; set; }
        public SearchResult(string identifier, string title)
        {
            Title = title;
            Identifier = identifier;
        }

        public SearchResult()
        {

        }
    }

    public class Search
    {
        public int SearchId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string SearchText { get; set; }

        public Search(int searchId, int userId, DateTime createdAt, string searchText)
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
