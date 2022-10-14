const star1 = document.getElementById("star-1");
const star2 = document.getElementById("star-2");
const star3 = document.getElementById("star-3");
const star4 = document.getElementById("star-4");
const star5 = document.getElementById("star-5");

const starClick = function(num) {
    const positiveAccordionContent = document.querySelector(".positive-accordion__content");
    const negativeAccordionContent = document.querySelector(".negative-accordion__content");
    if (num === 1) {
        negativeAccordionContent.style.maxHeight = negativeAccordionContent.scrollHeight + "px";
        positiveAccordionContent.style.maxHeight = 0;
        star1.style.color = "#f7c02a";
        star2.style.color = "#DEDEDE";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    } else if (num === 2) {
        negativeAccordionContent.style.maxHeight = negativeAccordionContent.scrollHeight + "px";
        positiveAccordionContent.style.maxHeight = 0;
        star1.style.color = "#f7c02a"
        star2.style.color = "#f7c02a"
        star3.style.color = "#DEDEDE"
        star4.style.color = "#DEDEDE"
        star5.style.color = "#DEDEDE"
    } else if (num === 3) {
        negativeAccordionContent.style.maxHeight = negativeAccordionContent.scrollHeight + "px";
        positiveAccordionContent.style.maxHeight = 0;
        star1.style.color = "#f7c02a"
        star2.style.color = "#f7c02a"
        star3.style.color = "#f7c02a"
        star4.style.color = "#DEDEDE"
        star5.style.color = "#DEDEDE"
    } else if (num === 4) {
        negativeAccordionContent.style.maxHeight = 0;
        positiveAccordionContent.style.maxHeight = positiveAccordionContent.scrollHeight + "px";
        star1.style.color = "#f7c02a"
        star2.style.color = "#f7c02a"
        star3.style.color = "#f7c02a"
        star4.style.color = "#f7c02a"
        star5.style.color = "#DEDEDE"
    } else if (num === 5) {
        negativeAccordionContent.style.maxHeight = 0;
        positiveAccordionContent.style.maxHeight = positiveAccordionContent.scrollHeight + "px";
        star1.style.color = "#f7c02a"
        star2.style.color = "#f7c02a"
        star3.style.color = "#f7c02a"
        star4.style.color = "#f7c02a"
        star5.style.color = "#f7c02a"
    }
};

star1.addEventListener("click", () => starClick(1));
star2.addEventListener("click", () => starClick(2));
star3.addEventListener("click", () => starClick(3));
star4.addEventListener("click", () => starClick(4));
star5.addEventListener("click", () => starClick(5));