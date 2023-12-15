using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BooksTry.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BooksTry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CastController 
    {
        private string connectionString = ConnectionString.connectionString;

        // GET: api/
        [HttpGet]
        public IEnumerable<BookOrder> Get()
        {
            string selectString = "select * from names";
            using (SqlConnection conn = new SqlConnection(connectionString))
        {
                }
            }
        }

     

        // GET: api/SingleCastMember
        [Route("{id}")]
        public SingleCastMember Get(int id)
        {
            try
            {
                string selectString = "select * from names where ncost = @id";
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand command = new SqlCommand(selectString, conn))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        using (SqlDataReader reader = command.ExecuteReader())
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

        // POST: api/
        [HttpPost]
        public bool Post()
        {

        }

        // PUT: api/
        [HttpPut("{id}")]
        public void Put()
        {

        }

        // DELETE: api/
        [HttpDelete("{orderId}/{bookId}")]
        public int Delete()
        {
        
        }
    }

