"use strict";

(function () {

    var holder = "<div style=\"position: absolute; z-index: 100\" class=\"panel\">\n                             <input type=\"text\" size=\"10\" id=\"search_input\">\n                             <button class=\"find_button\"> FIND </button>\n                             <button class=\"next\">Next</button>\n                             <button class=\"prev\">Prev</button>\n                             <button class=\"find_child\">Child</button>\n                             <button class=\"find_parent\">Parent</button>\n                             </div>";
    document.body.insertAdjacentHTML("afterbegin", holder);
    var findButton = document.querySelector(".find_button"),
        nextButton = document.querySelector(".next"),
        prevButton = document.querySelector(".prev"),
        childButton = document.querySelector(".find_child"),
        parentButton = document.querySelector(".find_parent");

    findButton.addEventListener("click", search);
    nextButton.addEventListener("click", next);
    prevButton.addEventListener("click", prev);
    childButton.addEventListener("click", findChild);
    parentButton.addEventListener("click", findParent);

    var currentElement = void 0;

    function getCurrentInputValue(searchQuery) {
        return document.body.querySelectorAll("" + searchQuery)[0];
    }
    var array = [];

    function search() {

        var searchInput = document.getElementById("search_input").value;
        if (searchInput == "") {
            return;
        }
        if (currentElement !== undefined) {
            currentElement.classList.toggle("outlined");
        }
        currentElement = getCurrentInputValue(searchInput);
        try {
            currentElement.classList.toggle("outlined");
        } catch (e) {
            console.log("INVALID SELECTOR");
        }
        array.length = 0;
        array.push(currentElement);
        console.log(array);
        return array;
    }

    var currentEl = void 0;
    var nextEl = void 0;

    function next() {
        currentEl = array[0];
        console.log("from next before", array);
        function changeClass() {
            nextEl = currentEl.nextElementSibling;
            if (nextEl !== null) {
                currentEl.classList.toggle("outlined");
                nextEl.classList.toggle("outlined");
                currentEl = nextEl;
                array.splice(0, 1, currentEl);
            }
        }changeClass();
        console.log("from next after", array);
        return array;
    }

    function prev() {
        console.log("from prev before", array);
        currentEl = array[0];
        function changeClass() {
            nextEl = currentEl.previousElementSibling;
            if (nextEl !== null) {
                currentEl.classList.toggle("outlined");
                nextEl.classList.toggle("outlined");
                currentEl = nextEl;
                array.splice(0, 1, currentEl);
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
            if (next !== null) {
                currentEl.classList.toggle("outlined");
                nextEl.classList.toggle("outlined");
                currentEl = nextEl;
                array.splice(0, 1, currentEl);
            }
        }
        changeClass();
    }
    function findParent() {
        currentEl = array[0];

        function changeClass() {
            nextEl = currentEl.parentElement;
            if (nextEl !== null) {
                currentEl.classList.toggle("outlined");
                nextEl.classList.toggle("outlined");
                currentEl = nextEl;
                array.splice(0, 1, currentEl);
            }
        }
        changeClass();
    }

    var panel = document.querySelector(".panel");

    function main(panel) {
        panel.addEventListener("mousedown", getPanel);
        function getPanel(e) {
            var coords = getCoords(panel);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

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

        panel.addEventListener("dragstart", function () {
            return false;
        });

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            console.log(box);

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
    }
    main(panel);
})();