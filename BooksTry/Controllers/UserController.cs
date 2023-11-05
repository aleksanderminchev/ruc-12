using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BooksTry.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace BooksTry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string connectionString = ConnectionString.connectionString;

        // GET: api/User
        [HttpGet]
        public IEnumerable<User> Get()
        {
            string selectString = "select * from USER;";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(selectString, conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        List<User> result = new List<User>();
                        while (reader.Read())
                        {
                            User item = ReadItem(reader);
                            result.Add(item);
                        }
                        return result;
                    }
                }
            }
        }

        private User ReadItem(SqlDataReader reader)
        {
            int userId = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            string firstName = reader.IsDBNull(1) ? "" : reader.GetString(1);
            string lastName = reader.IsDBNull(2) ? "" : reader.GetString(2);
            string username = reader.IsDBNull(3) ? "" : reader.GetString(3);
            string pass = reader.IsDBNull(4) ? "" : reader.GetString(4);
            string email = reader.IsDBNull(5) ? "" : reader.GetString(5);
            bool isVerified = reader.IsDBNull(6) ? false : reader.GetBoolean(6);

            User item = new User()
            {
                UserId = userId,
                FirstName = firstName,
                LastName = lastName,
                Username = username,
                Pass = pass,
                Email = email,
                IsVerified = isVerified
            };

            return item;
        }

        // GET: api/User/5
        [Route("{id}")]
        public User Get(int id)
        {
            try
            {
                string selectString = "select * from USER where UserId = @id";
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

        [Route("allUsers")]
        public int GetAllUsers()
        {
            try
            {
                string selectString = "select * from USER where UserType = 1";
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand command = new SqlCommand(selectString, conn))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<User> result = new List<User>();
                            while (reader.Read())
                            {
                                User item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result.Count;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return 0;
            }
        }

        [Route("allAdmins")]
        public int GetAllAdmins()
        {
            try
            {
                string selectString = "select * from USER where UserType = 2";
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand command = new SqlCommand(selectString, conn))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            List<User> result = new List<User>();
                            while (reader.Read())
                            {
                                User item = ReadItem(reader);
                                result.Add(item);
                            }
                            return result.Count;
                        }
                    }
                }
            }
            catch (Exception)
            {
                //future handling exceptions
                return 0;
            }
        }

        // POST: api/User
        [HttpPost]
        public async void PostAsync([FromBody] User value)
        {

            string insertString =
                "INSERT INTO USER (FirstName,LastName, Username, Pass, Email, UserType) values(@FirstName,@LastName, @Username, @Pass, @Email, @type);";
            bool item = CheckUsernameValidation(value.Username);

            if (item == true)
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    using (SqlCommand command = new SqlCommand(insertString, conn))
                    {

                        command.Parameters.AddWithValue("@FirstName", value.FirstName);
                        command.Parameters.AddWithValue("@LastName", value.LastName);

                        command.Parameters.AddWithValue("@Username", value.Username);
                        command.Parameters.AddWithValue("@Pass", value.Pass);
                        command.Parameters.AddWithValue("@Email", value.Email);
                        command.Parameters.AddWithValue("@type", 1);

                        int rowsAffected = command.ExecuteNonQuery();

                        await PostOrder(GetUserId());

                        //return true;
                    }
                }
            }
            //else
            //return false;
        }

        //[Route("{usernameValidation}")]
        public bool CheckUsernameValidation(string usernameValidation)
        {
            string usernameValidationString = "SELECT * from USER WHERE username = @usernameV;";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(usernameValidationString, conn))
                {
                    command.Parameters.AddWithValue("@usernameV", usernameValidation);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            }
        }

        // Update user's full name and email
        // PUT: api/User/5 
        [HttpPut("{id}")]
        public int Put(int id, [FromBody] User value)
        {
            string updateString = "UPDATE USER SET FirstName=@FirstName,FirstName=@LastName, Email=@Email where UserId = @id; ";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(updateString, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@FirstName", value.FirstName);
                    command.Parameters.AddWithValue("@LastName", value.LastName);
                    command.Parameters.AddWithValue("@Email", value.Email);
                    int rowAffected = command.ExecuteNonQuery();
                    return rowAffected;
                }
            }
        }

        // Update user's password
        // PUT: api/User/5
        [HttpPut("passChange/{id}")]
        public int PutPass(int id, [FromBody] User value)
        {
            string updateString = "UPDATE USER SET Pass=@Pass where UserId = @id;";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(updateString, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@Pass", value.Pass);
                    int rowAffected = command.ExecuteNonQuery();
                    return rowAffected;
                }
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("delAccount/{userId}")]
        public int DeleteAccount(int userId)
        {
            string deleteString =
                "BEGIN TRANSACTION SET XACT_ABORT ON DELETE USERBOOK WHERE UserId=@UserId DELETE USER WHERE UserId=@UserId COMMIT TRANSACTION";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(deleteString, conn))
                {
                    command.Parameters.AddWithValue("@UserId", userId);
                    int rowAffected = command.ExecuteNonQuery();
                    return rowAffected;
                }
            }
        }

        [Route("login/{username}/{password}")]
        public User Login(string username, string password)
        {
            var collection = Get();
            if (collection != null)
            {
                foreach (var user in collection)
                {
                    if ((user.Username == username) && (user.Pass == password))
                    {
                        return user;

                    }
                }
            }
            return null;
        }

        public int GetUserId()
        {
            string selectString = "SELECT TOP 1 * FROM USER ORDER BY UserId DESC";
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(selectString, conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            return ReadItem(reader).UserId;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                }
            }
        }

        public async Task<bool> PostOrder(int userId)
        {
            string inseartString = "INSERT INTO ORDERS (UserId, TotalPrice, Paid) values(@userId, @totalPrice, @paid); ";

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(inseartString, conn))
                {
                    command.Parameters.AddWithValue("@userId", userId);
                    command.Parameters.AddWithValue("@totalPrice", 0);
                    command.Parameters.AddWithValue("@paid", false);

                    int rowsAffected = command.ExecuteNonQuery();
                    return true;
                }
            }
        }
    }
}
