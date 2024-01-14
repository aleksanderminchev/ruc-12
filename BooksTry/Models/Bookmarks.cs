using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
    public class Bookmarks
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string TitleId { get; set; }
        public string NCost { get; set; }
        public string Name { get; set; }
        public Bookmarks(int id, int userId, string titleId, string nCost, string name)
        {
            Id = id;
            UserId = userId;
            TitleId = titleId;
            NCost = nCost;
            Name = name;
        }

        public Bookmarks()
        {

        }
    }
}
