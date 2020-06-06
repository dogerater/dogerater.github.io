window.addEventListener('load', iOS());

function iOS() {
    if( navigator.userAgent.match(/Android|iPhone/i) !== null ) {
        document.getElementById('body').innerHTML = '';
        var elem = document.getElementById("text");
        elem.style.marginLeft = "0%";
        elem.style.marginRight = "0%";
    }
}

window.onorientationchange = function() { window.location.reload(); };