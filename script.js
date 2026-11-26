dragElement(document.getElementById("sets"));
dragElement(document.getElementById("map"));
dragElement(document.getElementById("notes"));
dragElement(document.getElementById("gallery"));

closeWindow(document.getElementById("map"));
closeWindow(document.getElementById("notes"));
closeWindow(document.getElementById("gallery"));

//func to close windows
function closeWindow(element) {
    const close = element.querySelector(".closeButton");
    close.addEventListener("click", function () {
        element.style.display = "none";
    })
}

//func to open windows
var biggestIndex = 10;
function openWindow() {
    const appOpenButtons = document.querySelectorAll(".appButton");

    appOpenButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const targetWindow = document.getElementById(targetId);

            if (targetWindow) {
                targetWindow.style.display = "flex";
                biggestIndex += 10;
                targetWindow.style.zIndex = biggestIndex;
            }
        });
    });
}
openWindow();

//func to enable drag
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

//func for sidebar in notes app
const links = document.querySelectorAll(".sidebar a");
const tabs = document.querySelectorAll(".tab");

links.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        links.forEach((l) => l.classList.remove("active"));
        tabs.forEach((t) => t.classList.remove("active"));

        link.classList.add("active");
        document.getElementById(link.dataset.tab).classList.add("active");
    });
});

//func for rendering gallery
const galleryData = {
    nj: [
        { name: "p1", src: "assets\bg.jpg" }
    ],
    jin: [
        { name: 'selfie.jpg', src: 'assets/jin/selfie.jpg' }
    ],
    yg: [],
    jh: [],
    th: [],
    jm: [],
    jk: []
};

const galleryContent = document.getElementById('galleryContent');
const galleryPath = document.getElementById('galleryPath');

let currentFolder = null;

function renderGallery() {
    galleryContent.innerHTML = '';

    if (!currentFolder) {
        galleryPath.textContent = 'C://Gallery';

        Object.keys(galleryData).forEach((folderName) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'folderLabled';
            wrapper.innerHTML = `
                <button>
                    <img src="assets/folder.png" alt="${folderName}">
                    <span>${folderName}</span>
                </button>
            `;

            wrapper.querySelector('button').addEventListener('click', () => {
                currentFolder = folderName;
                renderGallery();
            });

            galleryContent.appendChild(wrapper);
        });
        return;
    }

    galleryPath.textContent = `C://Gallery/${currentFolder}`;

    const files = galleryData[currentFolder];

    if (files.length === 0) {
        galleryContent.innerHTML = '<p>empty</p>';
        return;
    }

    files.forEach((file) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'folderLabled';
        wrapper.innerHTML = `
            <button>
                <img src = "${file.src}">
                <span>${file.name}</span>
            </button>
        `;

        wrapper.querySelector('button').addEventListener('click', () => {
            openImagePreview(file);
        });

        galleryContent.appendChild(wrapper);
    });
}

function openImagePreview(file) {
    window.open(file.src, '_blank');
}

renderGallery();