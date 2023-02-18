function searchBookmarks(query) {
    return browser.bookmarks.search(query);
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
  