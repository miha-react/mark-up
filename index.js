(function () {


  function Slider() {
    this.addSpanControls();
  }
         Slider.prototype.addSpanControls = function () {
            const container = document.querySelector('.slider-wrapper'),
                childrenCount = container.childElementCount,
                controls = document.querySelector('.slider-nav'),
                childWidth = container.firstElementChild.clientWidth,
                next = document.querySelector(".slider-next"),
                prev = document.querySelector(".slider-previous");

            container.style.cssText = "width:" + (childWidth * childrenCount) + "px";

            next.addEventListener('click', nextHandler);
            prev.addEventListener('click', prevHandler);

            let shift = 0;
            function nextHandler() {
                shift += childWidth;
                console.log(shift);
                container.style.cssText += `transform: translateX(${shift}px)`;

            }
            function prevHandler() {
                shift -= childWidth;
                container.style.cssText += `transform:translateX(-${shift}px)`;

            }
         };


new Slider();

})();


