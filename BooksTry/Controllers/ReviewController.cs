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
    public class ReviewController : ControllerBase
    {
        private string connectionString = ConnectionString.connectionString;

        // GET: api/Review
        [HttpGet]
        public IEnumerable<Review> Get()
        {
            string selectString = "select * from user_rating;";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand  command = new NpgsqlCommand (selectString, conn))
                {
                    using (NpgsqlDataReader  reader = command.ExecuteReader())
                    {
                        List<Review> result = new List<Review>();
                        while (reader.Read())
                        {
                            Review item = ReadItem(reader);
                            result.Add(item);
                        }
                        return result;
                    }
                }
            }
        }

        private Review ReadItem(NpgsqlDataReader  reader)
        {
            int id = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            int userId = reader.IsDBNull(1) ? 0 : reader.GetInt32(1);
            int titleId = reader.IsDBNull(2) ? 0 : reader.GetInt32(2);
            int value = reader.IsDBNull(3) ? 0 : reader.GetInt32(3);
            string comment = reader.IsDBNull(4) ? "" : reader.GetString(4);
            string createdAt = reader.IsDBNull(4) ? "" : reader.GetString(4);

            Review item = new Review()
            {
                Id = id,
                UserId = userId,
                TitleId = titleId,
                Value - value,
                Comment = comment,
                CreatedAt = createdAt
            };

            return item;
        }

        // GET: api/Review/5
        [Route("{id}")]
        public Review Get(int id)
        {
            try
            {
                string selectString = "select * from user_rating where Id = @id";
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

        // POST: api/Review
        [HttpPost]
        public bool Post([FromBody] Review value)
        {
            string insertString = "insert into user_rating (UserId, TitleId, Comment) values(@personId, @titleId, @comment);";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand  command = new NpgsqlCommand (insertString, conn))
                {
                    command.Parameters.AddWithValue("@userId", value.PersonId);
                    command.Parameters.AddWithValue("@titleId", value.BookId);
                    command.Parameters.AddWithValue("@comment", value.RText);

                    int rowsAffected = command.ExecuteNonQuery();
                    return true;
                }
            }
        }

        // PUT: api/Review/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
