// Queries against the title alone
//  function searchBookmarks(query) {
//     return browser.bookmarks.search(query);
//   }
//
//  Queries against the title & url
//  function searchBookmarks(query) {
//      return browser.bookmarks.search({
//        query: query,
//        url: query
//      });
//    }
//    
// Performs Fuzzy search on title , url , tags & description ,

function searchBookmarks(query) {
    var regex = new RegExp(query, "i"); // create a case-insensitive regular expression
    return browser.bookmarks.search({}).then(function(results) {
      return results.filter(function(result) {
        return regex.test(result.title) ||
               regex.test(result.url) ||
               (result.tags && regex.test(result.tags.join(" "))) ||
               (result.description && regex.test(result.description));
      });
    });
  }
  
  
  function displayBookmarks(bookmarks) {
    var ul = document.getElementById("bookmarks-list");
    ul.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
      var bookmark = bookmarks[i];
      var a = document.createElement("a");
      a.href = bookmark.url;
      a.appendChild(document.createTextNode(bookmark.title));
      var li = document.createElement("li");
      li.appendChild(a);
      ul.appendChild(li);
    }
  }
  
  function handleSearchClick() {
    var query = document.getElementById("search-query").value;
    searchBookmarks(query).then(displayBookmarks);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("search-button").addEventListener("click", handleSearchClick);
  });
  