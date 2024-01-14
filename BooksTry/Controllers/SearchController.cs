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
    public class SearchController : ControllerBase
    {
        private string connectionString = ConnectionString.connectionString;
        private Search ReadItem(NpgsqlDataReader reader)
        {
            int id = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            int userId = reader.IsDBNull(1) ? 0 : reader.GetInt32(1);
            DateTime createdAt = reader.IsDBNull(2) ? DateTime.MinValue : reader.GetDateTime(2);
            string searchText = reader.IsDBNull(4) ? "" : reader.GetString(4);
            Search item = new Search()
            {
                SearchId = id,
                UserId = userId,
                CreatedAt = createdAt,
                SearchText = searchText,
            };

            return item;
        }
        // GET ALL Paginated
        [Route("{id}")]
        [HttpGet]
        public PaginatedResult<Search> Get(int id)
        {
            string selectString = "select * from Search where user_id=@id";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();


                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    command.Parameters.AddWithValue("@id", id);

                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        List<Search> result = new List<Search>();
                        while (reader.Read())
                        {
                            Search item = ReadItem(reader);
                            result.Add(item);
                        }

                        return result;
                        }
                }

            }
        }
        // POST: api/Search
        [HttpPost]
        public List<Title> SearchUser([FromBody] Search value)
        {
            try
            {
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand("SELECT string_search(@search, @user_id)", conn))
                    {
                        // Add parameters for the stored function
                        command.Parameters.AddWithValue("@user_id", value.UserId);
                        command.Parameters.AddWithValue("@search", value.SearchText);

                        // Execute the stored function and retrieve the search results
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> searchResults = new List<Title>();

                            while (reader.Read())
                            {
                                Title result = ReadItem(reader);


                                searchResults.Add(Title);
                            }

                            return searchResults;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                // Handle exceptions as needed
                return null; // Return an appropriate response in case of an error
            }
        }
    }

}

