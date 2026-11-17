dragElement(document.getElementById("sets"));
dragElement(document.getElementById("map"));

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    const header = element.querySelector(".header");
    if (header) {
        header.onmousedown = startDragging;
    }

    else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";

    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}