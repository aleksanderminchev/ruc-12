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
                string new_id = "nm" + id;
                Console.WriteLine(new_id);
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
            catch (Exception)
            {
                //future handling exceptions
                return null;
            }
        }
    }






}

