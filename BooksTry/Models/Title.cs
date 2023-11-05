using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BooksTry.Models
{
    public class Title
    {
        [Key]
        public string TitleID { get; set; }
        public string PrimaryTitle { get; set; }
        public string OriginalTitle { get; set; }
        public char TitleType { get; set; }
        public string Author { get; set; }
        public string TitleDes { get; set; }
        public string Genres { get; set; }
        public bool IsAdult { get; set; }
        public char StartYear { get; set; }
        public char EndYear { get; set; }
        public int RunTimeInMinutes { get; set; }
        [ForeignKey("ParentId")]
        public Title ParentTitle { get; set; }
        public string ParentId { get; set; }
        public string Plot { get; set; }
        public string Poster { get; set; }
        public int SeasonNumber { get; set; }
        public int SeasonEpisode { get; set; }
        public int NumberOfVotes { get; set; }
        public int AverageRating { get; set; }

        public Title()
        {

        }

        public Title(string titleId, string primaryTitle,
         string originalTitle, char titleType,
         string author, string titleDes,
          string genres,
          bool isAdult,
          char startYear, char endYear,
          int runTimeInMinutes, string parentId, string plot, string poster, int seasonNumber, int seasonEpisode, int numberOfVotes, int averageRating)
        {
            TitleID = titleId;
            PrimaryTitle = primaryTitle;
            OriginalTitle = originalTitle;
            TitleType = titleType;
            Author = author;
            TitleDes = titleDes;
            Genres = genres;
            IsAdult = isAdult;
            StartYear = startYear;
            EndYear = endYear;
            RunTimeInMinutes = runTimeInMinutes;
            ParentId = parentId;
            Plot = plot;
            Poster = poster;
            SeasonNumber = seasonNumber;
            SeasonEpisode = seasonEpisode;
            NumberOfVotes = numberOfVotes;
            AverageRating = averageRating;
        }
    }
}