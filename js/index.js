(function () {


  function Slider() {
    this.addSpanControls();
  }
         Slider.prototype.addSpanControls = function () {
            let sliderWidth = document.querySelector('.slider').clientWidth;
                slideWidth = document.querySelector('.slide');
                container = document.querySelector('.slider_wrapper'),
                childrenCount = container.childElementCount,
                controls = document.querySelector('.slider_nav'),
                childWidth = container.firstElementChild.clientWidth,
                next = document.querySelector(".slider_next"),
                prev = document.querySelector(".slider_previous");

                sliderWidth = slideWidth;
             container.style.cssText = `width:${childWidth*childrenCount}px`;

            next.addEventListener('click', nextHandler);
            prev.addEventListener('click', prevHandler);

            let shift = 0;
            function nextHandler() {
                shift += childWidth;
                if(shift == childWidth){
                    shift = -childWidth*(childrenCount-1);
                }
                console.log(shift);
                container.style.cssText += `transform: translateX(${shift}px)`;
                return shift;
            }
            function prevHandler() {

                shift -= childWidth;
                if(shift ==(-childWidth*childrenCount) ){
                    shift = 0;
                }
                console.log(shift);

                container.style.cssText += `transform:translateX(${shift}px)`;
                return shift;
            }
         };


new Slider();

})();


