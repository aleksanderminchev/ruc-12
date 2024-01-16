﻿using System;
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
                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    using (NpgsqlDataReader reader = command.ExecuteReader())
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

        private Review ReadItem(NpgsqlDataReader reader)
        {
            System.Console.WriteLine(reader.GetChar(5));
            int id = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            int userId = reader.IsDBNull(1) ? 0 : reader.GetInt32(1);
            string titleId = reader.IsDBNull(5) ? "" : reader.GetString(5);
            int value = reader.IsDBNull(2) ? 0 : reader.GetInt32(2);
            string comment = reader.IsDBNull(3) ? "" : reader.GetString(3);
            DateTime createdAt = reader.IsDBNull(4) ? new DateTime() : reader.GetDateTime(4);

            Review item = new Review()
            {
                ReviewId = id,
                UserId = userId,
                TitleId = titleId,
                RText = comment,
                RRating = value,
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

        // POST: api/Review
        [HttpPost]
        public bool Post([FromBody] Review value)
        {
            string confirmNoRateAlready = "SELECT EXISTS (" +
                        " SELECT 1" +
                        " FROM user_rating" +
                        " WHERE user_id = @userId AND titleid = @titleId" +
                        ") AS result;";
            string insertString = "select * from rate(@userId, @titleId, @value );";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();

                using (NpgsqlCommand command = new NpgsqlCommand(confirmNoRateAlready, conn))
                {
                    command.Parameters.AddWithValue("@userId", value.UserId);
                    command.Parameters.AddWithValue("@titleId", value.TitleId.TrimEnd());

                    bool ratingExists = (bool)command.ExecuteScalar();
                    Console.WriteLine(ratingExists);
                    if (ratingExists)
                    {
                        // A rating already exists, so you can handle it accordingly
                        return false;
                    }
                }
                using (NpgsqlCommand insertCommand = new NpgsqlCommand(insertString, conn))
                {
                    insertCommand.Parameters.AddWithValue("@userId", value.UserId);
                    insertCommand.Parameters.AddWithValue("@titleId", value.TitleId.TrimEnd());
                    insertCommand.Parameters.AddWithValue("@value", value.RRating);

                    int rowsAffected = insertCommand.ExecuteNonQuery();
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
