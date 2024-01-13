using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BooksTry.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace BooksTry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TitleController : ControllerBase
    {
        private string connectionString = ConnectionString.connectionString;

        private Title ReadItem(NpgsqlDataReader reader)
        {
            string titleId = reader.IsDBNull(0) ? "" : reader.GetString(0);
            string titleType = reader.IsDBNull(1) ? "" : reader.GetString(1);
            string primaryTitle = reader.IsDBNull(2) ? "" : reader.GetString(2);
            string originalTitle = reader.IsDBNull(3) ? "" : reader.GetString(3);
            bool isAdult = reader.IsDBNull(3) ? false : reader.GetBoolean(4);
            string startYear = reader.IsDBNull(5) ? "" : reader.GetString(5);
            string endYear = reader.IsDBNull(6) ? "" : reader.GetString(6);
            int runTimeInMinutes = reader.IsDBNull(7) ? 0 : reader.GetInt32(7);
            string genres = reader.IsDBNull(8) ? "" : reader.GetString(8);
            string parentId = reader.IsDBNull(9) ? "" : reader.GetString(9);
            string plot = reader.IsDBNull(10) ? "" : reader.GetString(10);
            string poster = reader.IsDBNull(11) ? "" : reader.GetString(11);
            int seasonNumber = reader.IsDBNull(12) ? 0 : reader.GetInt32(12);
            int seasonEpisode = reader.IsDBNull(13) ? 0 : reader.GetInt32(13);
            int numberOfVotes = reader.IsDBNull(14) ? 0 : reader.GetInt32(14);
            int averageRating = reader.IsDBNull(15) ? 0 : reader.GetInt32(15);


            Title item = new Title()
            {
                TitleID = titleId,
                PrimaryTitle = primaryTitle,
                OriginalTitle = originalTitle,
                TitleType = titleType,
                Genres = genres,
                IsAdult = isAdult,
                StartYear = startYear,
                EndYear = endYear,
                RunTimeInMinutes = runTimeInMinutes,
                ParentId = parentId,
                Plot = plot,
                Poster = poster,
                SeasonNumber = seasonNumber,
                SeasonEpisode = seasonEpisode,
                NumberOfVotes = numberOfVotes,
                AverageRating = averageRating
            };

            return item;
        }

        [HttpGet]
        public PaginatedResult<Title> Get(int page = 1, int pageSize = 30)
        {
            int offset = (page - 1) * pageSize;
            string selectString = $"SELECT * FROM TITLE OFFSET {offset} LIMIT {pageSize};";
            string countString = "SELECT COUNT(*) FROM TITLE;";

            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand countCommand = new NpgsqlCommand(countString, conn))
                {
                    int totalRecords = Convert.ToInt32(countCommand.ExecuteScalar());
                    int totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }

                            return new PaginatedResult<Title>
                            {
                                Data = result,
                                TotalPages = totalPages,
                                CurrentPage = page,
                                PageSize = pageSize,
                                TotalRecords = totalRecords
                            };
                        }
                    }
                }
            }
        }
        // GET 10 Titles from the Current Year (Random Selection)
        [HttpGet("current-year")]
        public List<Title> GetCurrentYearTitles()
        {
            int currentYear = DateTime.Now.Year; // Get the current year
            string selectString = $@"
                SELECT 
                    t1.*,
                    t2.primaryTitle AS parentTitle
                FROM TITLE t1
                LEFT JOIN TITLE t2 ON t1.parent_id = t2.titleId
                WHERE 
                    t1.startyear = '{currentYear}' 
                    AND t1.poster IS NOT NULL 
                    AND t1.poster <> '' 
                    AND t1.parent_id IS NOT NULL 
                    AND t1.parent_id <> ''
                ORDER BY random() 
                LIMIT 10;";


            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        List<Title> result = new List<Title>();
                        while (reader.Read())
                        {
                            Title item = ReadItem(reader);
                            item.PrimaryTitle = reader.IsDBNull(16) ? "" : reader.GetString(16);

                            result.Add(item);
                        }
                        return result;
                    }
                }
            }
        }
        // GET 10 Titles Popular
        [HttpGet("current-popular")]
        public List<Title> GetCurrentPopularTitles()
        {
            int currentYear = DateTime.Now.Year; // Get the current year
            string selectString = $@"
                    SELECT 
                        t1.*,
                        CASE WHEN t1.parent_id IS NOT NULL THEN t2.primaryTitle ELSE NULL END AS parentTitle
                        FROM TITLE t1
                        LEFT JOIN TITLE t2 ON t1.parent_id = t2.titleId
                    WHERE 
                        t1.startyear = '{2023}' 
                        AND t1.poster IS NOT NULL 
                        AND t1.poster <> '' 
                        AND t1.averagerating IS NOT NULL
                        AND t1.numvotes IS NOT NULL
                    ORDER BY 
                        (t1.averagerating * 0.7 + t1.numvotes * 0.3) DESC, 
                        random()
                    LIMIT 10;";

            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        List<Title> result = new List<Title>();
                        while (reader.Read())
                        {
                            Title item = ReadItem(reader);
                            item.PrimaryTitle = reader.IsDBNull(16) ? "" : reader.GetString(16);
                            result.Add(item);
                        }
                        return result;
                    }
                }
            }
        }
        // GET 10 Titles Popular
        [HttpGet("most-popular")]
        public List<Title> GetMostPopularTitles()
        {
            string selectString = $@"
                SELECT 
                    t1.*,
                    CASE WHEN t1.parent_id IS NOT NULL THEN t2.primaryTitle ELSE NULL END AS parentTitle
                FROM TITLE t1
                LEFT JOIN TITLE t2 ON t1.parent_id = t2.titleId
                WHERE 
                    t1.poster IS NOT NULL 
                    AND t1.poster <> ''
                    AND t1.averagerating IS NOT NULL
                    AND t1.numvotes IS NOT NULL
                ORDER BY 
                    (t1.averagerating*0.7  + t1.numvotes*0.3 ) DESC
                LIMIT 10;";


            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        List<Title> result = new List<Title>();
                        while (reader.Read())
                        {
                            Title item = ReadItem(reader);
                            item.PrimaryTitle = reader.IsDBNull(16) ? "" : reader.GetString(16);
                            result.Add(item);
                        }
                        Console.WriteLine(result);
                        return result;
                    }
                }
            }
        }
        // GET: api/Title/5
        //[HttpGet("{id}", Name = "Get")]
        [Route("{id:int}")]
        public Title Get(int id)
        {
            try
            {
                string selectString = "select * from TITLE where TitleId = @id";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                return ReadItem(reader);
                            }
                            else
                            {
                                return null;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }

        // GET: api/Title/Free
        //[HttpGet("{price}", Name = "Get")]
        [Route("Free")]
        public IEnumerable<Title> Get6FreeTitles(Decimal price)
        {
            try
            {
                //string selectString = "select * from TITLE where genre LIKE @genre";
                string selectString = "SELECT TOP 6 * FROM TITLE WHERE Price = '0';";     //here i changed
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@price", price);
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }

        // GET: api/Title/Free
        //[HttpGet("{price}", Name = "Get")]
        [Route("Fantasy")]
        public IEnumerable<Title> Get6FantasyTitles()
        {
            try
            {
                string selectString = "SELECT TOP 6 * FROM dbo.TITLE WHERE Genre LIKE 'Fantasy';";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }

        // GET: api/Title/Suggestions
        //[HttpGet("{price}", Name = "Get")]
        [Route("Suggestions")]
        public IEnumerable<Title> GetSuggestionsTitles()
        {
            try
            {
                string selectString = "SELECT TOP 5 * FROM dbo.TITLE ORDER BY NEWID();";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }

        // GET: api/Title/Horror
        //[HttpGet("{genre}", Name = "Get")]
        [Route("{genre}")]
        public IEnumerable<Title> GetTitlesByGenre(String genre)
        {
            try
            {
                string selectString = "select * from TITLE where genre LIKE @genre";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@genre", genre);
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }

        // GET: api/Title/Horror
        //[HttpGet("{genre}", Name = "Get")]
        [Route("search/{name}")]
        public IEnumerable<Title> GetTitlesByName(String name)
        {
            try
            {
                string selectString = "select * from dbo.TITLE as b where b.Title LIKE @title or b.Author LIKE @author";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@title", name);
                        command.Parameters.AddWithValue("@author", name);
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }

        // POST: api/Title
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Title/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        // Title review's
        private Review ReadReview(NpgsqlDataReader reader)
        {
            System.Console.WriteLine(reader.GetChar(5));
            int reviewId = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            int personId = reader.IsDBNull(1) ? 0 : reader.GetInt32(1);
            char titleId = reader.IsDBNull(5) ? '0' : reader.GetChar(5);
            int rating = reader.IsDBNull(2) ? 0 : reader.GetInt32(2);
            string rText = reader.IsDBNull(3) ? "" : reader.GetString(3);

            Review item = new Review()
            {
                ReviewId = reviewId,
                UserId = personId,
                TitleId = titleId,
                RRating = rating,
                RText = rText,
            };

            return item;
        }

        // GET: api/Title/5/Reviews
        //[HttpGet("{titleId}", Name = "Get")]
        [Route("{titleId}/reviews")]
        public IEnumerable<Review> GetReviews(int titleId)
        {
            try
            {
                string selectString = "select r.*, p.Username, p.UserPhoto from dbo.REVIEW as r inner join dbo.PERSON as p on r.PersonId = p.PersonId where TitleId = @id";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@id", titleId);
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Review> result = new List<Review>();
                            while (reader.Read())
                            {
                                Review item = ReadReview(reader);
                                result.Add(item);
                            }
                            return result;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }

        [Route("allfreetitles")]
        public int GetAllFreeTitles()
        {
            try
            {
                string selectString = "select * from TITLE where Price = '0'";

                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result.Count;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }

        [Route("allpaidtitles")]
        public int GetAllPaidTitles()
        {
            try
            {
                string selectString = "select * from TITLE where Price != '0'";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            while (reader.Read())
                            {
                                Title item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result.Count;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}