(function () {
    'use strict';
    const holder = `<div style="position: absolute; z-index: 100" class="panel">
                             <input type="text" size="10" id="search_input">
                             <button class="find_button"> FIND </button>
                             <button class="next">Next</button>
                             <button class="prev">Prev</button>
                             <button class="find_child">Child</button>
                             <button class="find_parent">Parent</button>
                             </div>`;
    document.body.insertAdjacentHTML("afterbegin", holder);
    const   findButton = document.querySelector(".find_button"),
            nextButton = document.querySelector(".next"),
            prevButton = document.querySelector(".prev"),
            childButton = document.querySelector(".find_child"),
            parentButton = document.querySelector(".find_parent");

            findButton.addEventListener("click", search);
            nextButton.addEventListener("click", next);
            prevButton.addEventListener("click", prev);
            childButton.addEventListener("click", findChild);
            parentButton.addEventListener("click", findParent);

    let currentElement;

    function getCurrentInputValue(searchQuery) {
        return document.body.querySelectorAll(`${searchQuery}`)[0];

    }
    let array = [];

    function search() {

        const searchInput = document.getElementById("search_input").value;
        if(searchInput==""){
            return;
        }
        if(currentElement !== undefined){
            currentElement.classList.toggle("outlined");
        }
        currentElement = getCurrentInputValue(searchInput);
        try{
        currentElement.classList.toggle("outlined");
        }
        catch(e){
            console.log("INVALID SELECTOR");
        }
            array.length = 0;
            array.push(currentElement);
            console.log(array);
        return array;
    }

    let currentEl;
    let nextEl;

    function next() {
        currentEl = array[0];
            console.log("from next before",array);
        function changeClass() {
            nextEl = currentEl.nextElementSibling;
            if(nextEl!==null){
                currentEl.classList.toggle("outlined");
                nextEl.classList.toggle("outlined");
                currentEl = nextEl;
                array.splice(0,1,currentEl);
            }
        }   changeClass();
        console.log("from next after", array);
            return array;
    }

    function prev() {
        console.log("from prev before", array);
        currentEl = array[0];
        function changeClass() {
            nextEl = currentEl.previousElementSibling;
            if(nextEl!==null){
                currentEl.classList.toggle("outlined");
                nextEl.classList.toggle("outlined");
                currentEl = nextEl;
                array.splice(0,1,currentEl);
                }
        }
        changeClass();
        console.log("from prev after", array);
        return array;
    }

    function findChild() {
        currentEl = array[0];
        console.log(currentEl);
        function changeClass() {
            nextEl = currentEl.firstElementChild;
            if(next!==null){
                currentEl.classList.toggle("outlined");
                nextEl.classList.toggle("outlined");
                currentEl = nextEl;
                array.splice(0,1,currentEl);
            }
        }
        changeClass();

    }
    function findParent() {
        currentEl = array[0];

        function changeClass() {
            nextEl = currentEl.parentElement;
            if(nextEl!==null){
            currentEl.classList.toggle("outlined");
            nextEl.classList.toggle("outlined");
            currentEl = nextEl;
            array.splice(0,1,currentEl);
        }}
        changeClass();
    }
//    -------------------------Drag and Drop----------------//
    let panel = document.querySelector(".panel");

  function main(panel) {
        panel.addEventListener("mousedown", getPanel);
        function getPanel(e) {
            let coords = getCoords(panel);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

             moveAt(e);

            function moveAt(e) {
                panel.style.left = e.pageX - shiftX + "px";
                panel.style.top = e.pageY - shiftY + "px";
            }
            document.onmousemove = function (e) {
                moveAt(e);
            };
            panel.onmouseup = function () {
                document.onmousemove = null;
                panel.onmouseup = null;
            };
        }

        panel.addEventListener("dragstart", function() {
            return false;
        });

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            console.log(box);

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    }
    main(panel);
})();