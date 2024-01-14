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
        private Title ReadItemTitle(NpgsqlDataReader reader)
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

        // GET ALL Paginated
        [Route("{id}")]
        [HttpGet]
        public List<Search> Get(int id)
        {
            string selectString = "select * from Search where user_id=@id LIMIT 5";
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
                                Title result = ReadItemTitle(reader);
                                searchResults.Add(result);
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

