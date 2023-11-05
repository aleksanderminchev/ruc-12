using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
    public class CastMember
    {
        public string NCost { get; set; }
        public string FullName { get; set; }
        public string BirthYear { get; set; }
        public string DeathYear { get; set; }
        public string Profession { get; set; }
        public string KnownMovies { get; set; }

        public CastMember(int nCost, string fullName, string birthYear, string deathYear, string profession, string knownMovies)
        {
            NCost = nCost;
            FullName = fullName;
            BirthYear = birthYear;
            DeathYear = deathYear;
            Profession = profession;
            KnownMovies = knownMovies;
        }

        public CastMember()
        {

        }
    }
}
