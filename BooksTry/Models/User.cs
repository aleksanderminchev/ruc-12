using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Pass { get; set; }
        public string Email { get; set; }
        public bool IsVerified { get; set; }

        public User()
        {

        }

        public User(int userId, string firstName, string lastName,
         string username, string pass, string email, bool isVerified)
        {
            UserId = userId;
            FirstName = firstName;
            LastName = lastName;
            Username = username;
            Pass = pass;
            Email = email;
            IsVerified = isVerified;
        }
    }
}
