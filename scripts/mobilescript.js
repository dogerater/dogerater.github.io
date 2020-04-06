function iOS() {
    if( navigator.userAgent.match(/Android|iPhone/i) !== null ) {
        var elem = document.getElementById("text");
        elem.style.marginLeft = "0%";
        elem.style.marginRight = "0%";
    }
}