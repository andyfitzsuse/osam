var piece = document.querySelectorAll(".gallery > div > :first-child");
var i;
for (i = 0; i < piece.length; i++) {
    piece[i].insertAdjacentHTML('beforebegin', '<input type="radio" name="selection" />');
}

