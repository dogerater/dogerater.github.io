document.addEventListener("DOMContentLoaded", iOS());

function iOS() {
    console.log(navigator.userAgent)
    if( navigator.userAgent.match(/Android|iPhone/gi) !== null ) {
        document.getElementById('body').innerHTML = '';
        var elem = document.getElementById("text");
        elem.style.marginLeft = "0%";
        elem.style.marginRight = "0%";
    }
}

window.onorientationchange = function() { window.location.reload(); };
