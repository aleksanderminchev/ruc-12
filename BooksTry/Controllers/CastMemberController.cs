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
    public class CastController : ControllerBase
    {
        private string connectionString = ConnectionString.connectionString;
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
            Console.WriteLine(item.TitleID);
            return item;
        }
        private CastMember ReadItem(NpgsqlDataReader reader)
        {
            string ncost = reader.IsDBNull(0) ? "" : reader.GetString(0);
            string fullName = reader.IsDBNull(1) ? "" : reader.GetString(1);
            string birthYear = reader.IsDBNull(2) ? "" : reader.GetString(2);
            string deathYear = reader.IsDBNull(3) ? "" : reader.GetString(3);
            string profession = reader.IsDBNull(4) ? "" : reader.GetString(4);
            string knownMovies = reader.IsDBNull(5) ? "" : reader.GetString(5);
            CastMember item = new CastMember()
            {
                NCost = ncost,
                FullName = fullName,
                BirthYear = birthYear,
                DeathYear = deathYear,
                Profession = profession,
                KnownMovies = knownMovies,
            };

            return item;
        }
        // GET ALL Paginated
        [HttpGet]
        public PaginatedResult<CastMember> Get(int page = 1, int pageSize = 30)
        {
            int offset = (page - 1) * pageSize;
            string selectString = $"SELECT * FROM names OFFSET {offset} LIMIT {pageSize};";
            string countString = "SELECT COUNT(*) FROM names;";

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
                            List<CastMember> result = new List<CastMember>();
                            while (reader.Read())
                            {
                                CastMember item = ReadItem(reader);
                                result.Add(item);
                            }

                            return new PaginatedResult<CastMember>
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
        // GET: api/cast/{id}
        [Route("{id}")]
        [HttpGet]
        public CastMember Get(string id)
        {
            try
            {
                string selectString = "select * from names where nconst = @id";
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
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //future handling exceptions
                return null;
            }
        }
        // GET: api/cast/{id}
        [Route("movies/{id}")]
        [HttpGet]
        public List<Title> GetCastMovies(string id)
        {
            try
            {
                string selectString = "select t.* from title t where titleid = Any(string_to_array((Select n.knownfortitles from names n where nconst = @id),','))";

                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Title> result = new List<Title>();
                            Console.WriteLine(reader.HasRows);
                            if (reader.HasRows)
                            {
                                while (reader.Read())
                                {
                                    Title item = ReadItemTitle(reader);
                                    result.Add(item);
                                }
                                return result;
                            }
                            else
                            {
                                return null;

                            }

                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //future handling exceptions
                return null;
            }
        }
    }








}

