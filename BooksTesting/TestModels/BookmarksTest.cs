using BooksTry.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BooksTry.Tests
{
    [TestClass]
    public class BookmarksTests
    {
        [TestMethod]
        public void Bookmarks_Initialization_Succeeds()
        {
            // Arrange
            int id = 1;
            int userId = 123;
            string titleId = "ABC123";
            string nCost = "Free";

            // Act
            var bookmark = new Bookmarks(id, userId, titleId, nCost);

            // Assert
            Assert.IsNotNull(bookmark);
            Assert.AreEqual(id, bookmark.Id);
            Assert.AreEqual(userId, bookmark.UserId);
            Assert.AreEqual(titleId, bookmark.TitleId);
            Assert.AreEqual(nCost, bookmark.NCost);
        }

        [TestMethod]
        public void Bookmarks_DefaultConstructor_Succeeds()
        {
            // Arrange & Act
            var bookmark = new Bookmarks();

            // Assert
            Assert.IsNotNull(bookmark);
            // Add more assertions if needed for default values
        }
    }
}