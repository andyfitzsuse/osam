(function() {
    var search = (function() {
  // gimmie all search bars
      var searchbox = document.getElementsByClassName("search")[0];
  
      // I tried to do a wait but it slows the keyboard
      searchbox.onkeyup = function() {
        /**
         * This will fix a simple problem: When the search input is empty after
         * trying to find a keyword, it selects all the elements and highlight
         */
        var keywords =
          searchbox.value.trim().length > 0
            ? new RegExp(searchbox.value.trim(), "gi")
            : "";
  
        /* Define the items where the search will run */
        var items = document.querySelectorAll(".gallery div");
  
        /* Map all the items */
        for (var i = 0; i < items.length; i++) {
          var title = items[i]; /* Easier to read */
  
          if (title.innerHTML.match(keywords) && keywords !== "") {
             // add match and remove miss if there isnt already a match
            if (!title.className.match("match")) {
              title.classList.add("match");
              title.classList.remove("miss");
            }
          } else {
            // removing match
            title.classList.add("miss");
            title.classList.remove("match");
          }
        }
      };
    })();
  })();
  
  
  
  // CLEAR SEARCH BUTTON
  
  var clear = document.getElementsByClassName("clear")[0];
  clear.onclick = function() {
    var search = document.getElementsByClassName("search")[0];
    search.value = "";
    
    var items = document.querySelectorAll(".gallery div");
  
    for (var i = 0; i < items.length; i++) {
       var title = items[i]; 
          title.classList.remove("miss");
            title.classList.remove("match");
    }
    
  };
  