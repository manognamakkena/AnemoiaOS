dragElement(document.getElementById("sets"));
dragElement(document.getElementById("map"));
closeWindow(document.getElementById("map"));

function closeWindow(element) {
    const close = element.querySelector(".closeButton");
    close.addEventListener("click", function () {
        element.style.display = "none";
    })
}

function openWindow() {
    const appOpenButtons = document.querySelectorAll(".appButton");

    appOpenButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const targetWindow = document.getElementById(targetId);

            if (targetWindow) {
                targetWindow.style.display = "flex";
            }
        });
    });
}
openWindow();

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