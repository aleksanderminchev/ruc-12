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

        private Title ReadItem(NpgsqlDataReader  reader)
        {
            string titleId = reader.IsDBNull(0) ? "" : reader.GetString(0);
            string primaryTitle = reader.IsDBNull(1) ? "" : reader.GetString(1);
            string originalTitle = reader.IsDBNull(2) ? "" : reader.GetString(2);
            char titleType = reader.IsDBNull(3) ? '\0' : reader.GetChar(3);
            string author = reader.IsDBNull(4) ? "" : reader.GetString(4);
            string titleDes = reader.IsDBNull(5) ? "" : reader.GetString(5);
            string genres = reader.IsDBNull(6) ? "" : reader.GetString(6);
            bool isAdult = reader.IsDBNull(7) ? false : reader.GetBoolean(7);
            char startYear = reader.IsDBNull(8) ? '\0' : reader.GetChar(8);
            char endYear = reader.IsDBNull(9) ? '\0' : reader.GetChar(9);
            int runTimeInMinutes = reader.IsDBNull(10) ? 0 : reader.GetInt32(10);
            string parentId = reader.IsDBNull(11) ? "" : reader.GetString(11);
            string plot = reader.IsDBNull(12) ? "" : reader.GetString(12);
            string poster = reader.IsDBNull(13) ? "" : reader.GetString(13);

            Title item = new Title()
            {
                TitleID = titleId,
                PrimaryTitle = primaryTitle,
                OriginalTitle = originalTitle,
                TitleType = titleType,
                Author = author,
                TitleDes = titleDes,
                Genres = genres,
                IsAdult = isAdult,
                StartYear = startYear,
                EndYear = endYear,
                RunTimeInMinutes = runTimeInMinutes,
                ParentId = parentId,
                Plot = plot,
                Poster = poster
            };

            return item;
        }


        // GET: api/Title
        [HttpGet]
        public IEnumerable<Title> Get()
        {
            string selectString = "select * from TITLE;";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                {
                    using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        command.Parameters.AddWithValue("@price", price);
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        command.Parameters.AddWithValue("@genre", genre);
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        command.Parameters.AddWithValue("@title", name);
                        command.Parameters.AddWithValue("@author", name);
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
        private Review ReadReview(NpgsqlDataReader  reader)
        {
            int reviewId = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            int personId = reader.IsDBNull(1) ? 0 : reader.GetInt32(1);
            int bookId = reader.IsDBNull(2) ? 0 : reader.GetInt32(2);
            int rating = reader.IsDBNull(3) ? 0 : reader.GetInt32(3);
            string rText = reader.IsDBNull(4) ? "" : reader.GetString(4);

            Review item = new Review()
            {
                ReviewId = reviewId,
                PersonId = personId,
                BookId = bookId,
                Rating = rating,
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        command.Parameters.AddWithValue("@id", titleId);
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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
                    using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                    {
                        using (NpgsqlDataReader  reader = command.ExecuteReader())
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