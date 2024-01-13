using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Controllers
{
    public class ConnectionString
    {
        public static readonly string connectionString =
        "Server=cit.ruc.dk;Port=5432;Database=cit12;User Id=cit12;Password=PJ2xnfZ0L3bs;SSL Mode=Require;TrustServerCertificate=true;";
        // "Server=cit.ruc.dk,5432;Initial Catalog=cit12;Persist Security Info=False;User ID=cit12;Password=PJ2xnfZ0L3bs;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True;Connection Timeout=6000;";
        // "Server=cit.ruc.dk,5432;User Id=cit12;Password=PJ2xnfZ0L3bs;Protocol=3;SSL=false;Pooling=false;MinPoolSize=1;MaxPoolSize=20;Timeout=60;SslMode=Disable;Database=cit12;";
    }
}