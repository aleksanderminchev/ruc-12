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
            int userId = reader.IsDBNull(3) ? 0 : reader.GetInt32(3);
            DateTime createdAt = reader.IsDBNull(2) ? DateTime.MinValue : reader.GetDateTime(2);
            string searchText = reader.IsDBNull(1) ? "" : reader.GetString(1);
            Search item = new Search()
            {
                SearchId = id,
                UserId = userId,
                CreatedAt = createdAt,
                SearchText = searchText,
            };

            return item;
        }
        private SearchResult ReadItemSearchResults(NpgsqlDataReader reader)
        {
            string id = reader.IsDBNull(0) ? "" : reader.GetString(0);
            string title = reader.IsDBNull(1) ? "" : reader.GetString(1);
            string poster = reader.IsDBNull(2) ? "" : reader.GetString(2);
            SearchResult item = new SearchResult()
            {
                Title = title,
                Identifier = id,
                Poster = poster,
            };

            return item;
        }
        // GET ALL Paginated
        [Route("{id}")]
        [HttpGet]
        public List<Search> Get(int id)
        {
            string selectString = "select * from search where user_id=@id ORDER BY created_at DESC LIMIT 5";
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
        public List<SearchResult> SearchUser([FromBody] Search value)
        {
            try
            {
                Console.WriteLine(value.UserId);
                Console.WriteLine(value.SearchText);

                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {

                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(
                        "SELECT s.*, t.poster " +
                        "FROM (SELECT * " +
                        "      FROM string_search(@search, @user_id) " +
                        ") AS s " +
                        "JOIN title AS t ON s.titleId = t.titleId;", conn))
                    {
                        // Add parameters for the stored function
                        command.Parameters.AddWithValue("@user_id", value.UserId);
                        command.Parameters.AddWithValue("@search", value.SearchText);
                        // command.CommandType = CommandType.StoredProcedure;
                        // Execute the stored function and retrieve the search results
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<SearchResult> searchResults = new List<SearchResult>();
                            while (reader.Read())
                            {
                                SearchResult item = ReadItemSearchResults(reader);
                                searchResults.Add(item);

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

