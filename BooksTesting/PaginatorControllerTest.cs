using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Create a list of items (e.g., integers)
        List<int> items = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 };

        // Create a paginator for the items with a default page size of 5
        Paginator<int> paginator = new Paginator<int>(items, defaultPageSize: 5);

        // Specify the page number and desired page size for testing
        int pageNumber = 2;
        int pageSize = 4;

        // Get the specified page
        List<int> page = paginator.GetPage(pageNumber, pageSize);

        // Check if there is a previous page and a next page
        bool hasPrevious = paginator.HasPreviousPage(pageNumber);
        bool hasNext = paginator.HasNextPage(pageNumber, pageSize);

        // Print the paginated data and pagination information
        Console.WriteLine("Page " + pageNumber + ":");
        foreach (int item in page)
        {
            Console.WriteLine(item);
        }

        Console.WriteLine("Has previous page: " + hasPrevious);
        Console.WriteLine("Has next page: " + hasNext);
    }
}
