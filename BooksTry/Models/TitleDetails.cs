using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BooksTry.Models
{
    public class TitleDetails
    {
        [Key]
        public int Ordering { get; set; }

        [Key]
        public int TitleID { get; set; }

        [ForeignKey("TitleID")]
        public Title ForeignTitle { get; set; }

        public string Title { get; set; }
        public string Region { get; set; }
        public string Language { get; set; }
        public string Types { get; set; }
        public string Attributes { get; set; }
        public string IsOriginalTitle { get; set; }

        public TitleDetails()
        {

        }

        public TitleDetails(int ordering, int titleId, Title foreignTitle,
            string title, string region, string language,
            string types, string attributes, string isOriginalTitle)
        {
            Ordering = ordering;
            TitleID = titleId;
            ForeignTitle = foreignTitle;
            Title = title;
            Region = region;
            Language = language;
            Types = types;
            Attributes = attributes;
            IsOriginalTitle = isOriginalTitle;
        }
    }
}
