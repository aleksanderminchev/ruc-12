using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BooksTry.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Text;
namespace BooksTry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string connectionString = ConnectionString.connectionString;
        // System.Console.WriteLine("Connection");
        // System.Console.WriteLine(connectionString);
        // GET: api/User
        [HttpGet]
        public IEnumerable<User> Get()
        {
            string selectString = "select * from USERS;";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    using (NpgsqlDataReader reader = command.ExecuteReader())
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

        private User ReadItem(NpgsqlDataReader reader)
        {
            int userId = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
            string firstName = reader.IsDBNull(4) ? "" : reader.GetString(4);
            Console.WriteLine(firstName);

            string lastName = reader.IsDBNull(5) ? "" : reader.GetString(5);
            Console.WriteLine(lastName);
            // string pass = reader.IsDBNull(2) ? "" : reader.GetString(2);
            string email = reader.IsDBNull(1) ? "" : reader.GetString(1);
            bool isVerified = reader.IsDBNull(3) ? false : reader.GetBoolean(3);
            User item = new User()
            {
                UserId = userId,
                FirstName = firstName,
                LastName = lastName,
                // Pass = pass,
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
                string selectString = "select * from USERS where user_id = @id";
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

        [Route("allUsers")]
        public int GetAllUsers()
        {
            try
            {
                string selectString = "select * from USERS";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
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
            catch (Exception e)
            {
                //future handling exceptions
                System.Console.WriteLine(e);
                return 0;
            }
        }

        [Route("allAdmins")]
        public int GetAllAdmins()
        {
            try
            {
                string selectString = "select * from USERS";
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                    {
                        using (NpgsqlDataReader reader = command.ExecuteReader())
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
                "INSERT INTO USER (FirstName,LastName, Pass, Email, UserType) values(@FirstName,@LastName, @Pass, @Email, @type);";
            bool item = CheckUsernameValidation(value.Email);

            if (item == true)
            {
                using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
                {
                    conn.Open();
                    using (NpgsqlCommand command = new NpgsqlCommand(insertString, conn))
                    {

                        command.Parameters.AddWithValue("@FirstName", value.FirstName);
                        command.Parameters.AddWithValue("@LastName", value.LastName);

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
            string usernameValidationString = "SELECT * from USERs WHERE email = @emailV;";

            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(usernameValidationString, conn))
                {
                    command.Parameters.AddWithValue("@email", usernameValidation);
                    using (NpgsqlDataReader reader = command.ExecuteReader())
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
            string updateString = "UPDATE USERS SET FirstName=@FirstName,FirstName=@LastName, Email=@Email where UserId = @id; ";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(updateString, conn))
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
            string updateString = "UPDATE USERS SET Pass = @Pass where UserId = @id;";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(updateString, conn))
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
                "BEGIN TRANSACTION SET XACT_ABORT ON DELETE USERBOOK WHERE UserId=@UserId DELETE USERS WHERE UserId=@UserId COMMIT TRANSACTION";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(deleteString, conn))
                {
                    command.Parameters.AddWithValue("@UserId", userId);
                    int rowAffected = command.ExecuteNonQuery();
                    return rowAffected;
                }
            }
        }

        [HttpPost("login")]
        public ActionResult<object> Login()
        {
            try
            {
                // Get the Authorization header from the request
                string authorizationHeader = Request.Headers["Authorization"];

                if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Basic "))
                {
                    // Extract and decode the base64-encoded credentials
                    string credentialsBase64 = authorizationHeader.Substring("Basic ".Length).Trim();
                    string credentials = Encoding.UTF8.GetString(Convert.FromBase64String(credentialsBase64));

                    // Split the credentials into email and password
                    string[] credentialParts = credentials.Split(':');
                    Console.WriteLine(credentials);
                    Console.WriteLine(credentialParts.Length);
                    if (credentialParts.Length == 2)
                    {
                        string email = credentialParts[0];
                        string password = credentialParts[1];
                        Console.WriteLine(email);
                        Console.WriteLine(password);
                        User user = GetUserEmail(email);

                        if (user != null && ComparePasswords(user, password))
                        {
                            // Authentication successful
                            return user;
                        }
                    }
                }

                // If the credentials are invalid or missing, return an error response
                return Unauthorized("Invalid credentials");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest("Error with login");
            }
        }
        public User GetUserEmail(string email)
        {
            string selectString = "SELECT * FROM USERS Where email = Email";
            Console.WriteLine(selectString);
            Console.WriteLine(email);
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        Console.WriteLine("VEVEW");
                        command.Parameters.AddWithValue("@Email", email);
                        if (reader.HasRows)
                        {
                            reader.Read();
                            User user1 = ReadItem(reader);
                            Console.WriteLine(user1);
                            return user1;
                        }
                        else
                        {
                            Console.WriteLine("ERROR with ermail");
                            throw new Exception("No user found with this email address");
                        }
                    }
                }
            }
        }
        public bool ComparePasswords(User user, string password)
        {
            string checkPasswordString = "SELECT crypt(@password, password_hashed),password_hashed FROM USERS WHERE email = @Email";
            string passwordCheckEncrypted = "";
            string db_stored_password = "";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(checkPasswordString, conn))
                {
                    command.Parameters.AddWithValue("@password", password);
                    command.Parameters.AddWithValue("@Email", user.Email);

                    using (NpgsqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            passwordCheckEncrypted = reader.IsDBNull(0) ? "" : reader.GetString(0);
                            db_stored_password = reader.IsDBNull(1) ? "" : reader.GetString(1);
                            Console.WriteLine(passwordCheckEncrypted);
                        }
                        else
                        {
                            throw new Exception("No user found with this email address");
                        }
                    }
                }

                // Compare the hashed password from the database with the user's hashed password
                if (passwordCheckEncrypted == db_stored_password)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public int GetUserId()
        {
            string selectString = "SELECT TOP 1 * FROM USERS ORDER BY UserId DESC";
            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(selectString, conn))
                {
                    using (NpgsqlDataReader reader = command.ExecuteReader())
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

            using (NpgsqlConnection conn = new NpgsqlConnection(connectionString))
            {
                conn.Open();
                using (NpgsqlCommand command = new NpgsqlCommand(inseartString, conn))
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
