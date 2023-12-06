using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksTry.Models
{
public class Paginator<T> 
{
    private List<T> items;
    private int defaultPageSize;

    public Paginator(List<T> items, int defaultPageSize = 10)
    {
        this.items = items;
        this.defaultPageSize = defaultPageSize;
    }

    // Get a specific page of items
    public List<T> GetPage(int pageNumber, int pageSize = 0)
    {
        if (pageSize == 0)
            pageSize = defaultPageSize;

        // Calculate the start and end index for the page
        int startIndex = (pageNumber - 1) * pageSize;
        int endIndex = startIndex + pageSize;
        endIndex = Math.Min(endIndex, items.Count);

        // Return the items for the specified page
        if (startIndex >= items.Count)
        {
            return new List<T>();
        }

        return items.GetRange(startIndex, endIndex - startIndex);
    }

    // Check if there's a previous page
    public bool HasPreviousPage(int pageNumber)
    {
        return pageNumber > 1;
    }

    // Check if there's a next page
    public bool HasNextPage(int pageNumber, int pageSize = 0)
    {
        if (pageSize == 0)
            pageSize = defaultPageSize;

        // Calculate the start index for the next page and check if it's within the item count
        int startIndex = (pageNumber - 1) * pageSize;
        return startIndex + pageSize < items.Count;
    }
}
}
