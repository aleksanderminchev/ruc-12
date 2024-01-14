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
    public class BookmarkController : ControllerBase
    {
        private string connectionString = ConnectionString.connectionString;
        private Bookmarks ReadItem(NpgsqlDataReader reader)
        {
            int id = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            int userId = reader.IsDBNull(1) ? 0 : reader.GetInt32(1);
            string titleId = reader.IsDBNull(2) ? "" : reader.GetString(2);
            string nconst = reader.IsDBNull(3) ? "" : reader.GetString(3);
            Bookmarks item = new Bookmarks()
            {
                Id = id,
                UserId = userId,
                TitleId = titleId,
                NCost = nconst,

            };

            return item;
        }
        // GET ALL Paginated
        [Route("{id}")]
        [HttpGet]
        public PaginatedResult<Bookmarks> Get(int id, int page = 1, int pageSize = 30)
        {
            int offset = (page - 1) * pageSize;
            string selectString = $"SELECT * FROM bookmarks where user_id = @id OFFSET {offset} LIMIT {pageSize} ;";
            string countString = "SELECT COUNT(*) FROM bookmarks where user_id = @id;";

            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand countCommand = new NpgsqlCommand(countString, conn))
                {
                    countCommand.Parameters.AddWithValue("@id", id);
                    int totalRecords = Convert.ToInt32(countCommand.ExecuteScalar());
                    int totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        using (NpgsqlDataReader reader = command.ExecuteReader())
                        {
                            List<Bookmarks> result = new List<Bookmarks>();
                            while (reader.Read())
                            {
                                Bookmarks item = ReadItem(reader);
                                result.Add(item);
                            }

                            return new PaginatedResult<Bookmarks>
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
        // POST: api/bookmark/save
        [HttpPost("save")]
        public bool Save([FromBody] Bookmarks value)
        {
            try
            {
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand("SELECT insert_into_bookmarks(@user_id, Null, @titleid)", conn))
                    {

                        // Add parameters for the stored function
                        command.Parameters.AddWithValue("@user_id", value.UserId);
                        command.Parameters.AddWithValue("@titleid", value.TitleId);

                        // Execute the stored function
                        command.ExecuteNonQuery();

                    }
                }


                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //future handling exceptions
                return false;
            }

            //else
            //return false;
        }
        // POST: api/bookmark/saveActor
        [HttpPost("saveActor")]
        public bool SaveActor([FromBody] Bookmarks value)
        {
            try
            {
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand("SELECT insert_into_bookmarks(@user_id,  @actorId,Null)", conn))
                    {

                        // Add parameters for the stored function
                        command.Parameters.AddWithValue("@user_id", value.UserId);
                        command.Parameters.AddWithValue("@actorId", value.NCost);

                        // Execute the stored function
                        command.ExecuteNonQuery();

                    }
                }


                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                //future handling exceptions
                return false;
            }

            //else
            //return false;
        }
    }








}

