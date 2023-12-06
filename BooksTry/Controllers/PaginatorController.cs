using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BooksTry.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;


public class PaginatorController: ControllerBase
{
    public List<int> Index(int pageNumber = 1, int pageSize = 10)
    {
        List<int> items = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 };
        
        Paginator<int> paginator = new Paginator<int>(items, defaultPageSize: pageSize);
        
        List<int> page = paginator.GetPage(pageNumber, pageSize);
        
        bool hasPreviousPage = paginator.HasPreviousPage(pageNumber);
        bool hasNextPage = paginator.HasNextPage(pageNumber, pageSize);
        
        // Pass the paginated data and pagination info to the View for rendering
        return items;
    }
}
