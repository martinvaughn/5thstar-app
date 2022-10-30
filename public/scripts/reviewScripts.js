const star1 = document.getElementById("star-1");
const star2 = document.getElementById("star-2");
const star3 = document.getElementById("star-3");
const star4 = document.getElementById("star-4");
const star5 = document.getElementById("star-5");

var lastClicked = 0;

const starClick = function (num) {
    const negativeAccordion = document.querySelector(".negative-accordion");
    const positiveAccordion = document.querySelector(".positive-accordion");
    const positiveAccordionContent = document.querySelector(".positive-accordion__content");
    const negativeAccordionContent = document.querySelector(".negative-accordion__content");
    if (num === 1) {
        negativeAccordion.style.display = "block";
        positiveAccordion.style.display = "none";
        negativeAccordionContent.style.maxHeight = negativeAccordionContent.scrollHeight + 2 + "px";
        positiveAccordionContent.style.maxHeight = 0;
        star1.style.color = "#f7c02a";
        star2.style.color = "#DEDEDE";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
        lastClicked = 1;
    } else if (num === 2) {
        negativeAccordion.style.display = "block";
        positiveAccordion.style.display = "none";
        negativeAccordionContent.style.maxHeight = negativeAccordionContent.scrollHeight + 2 + "px";
        positiveAccordionContent.style.maxHeight = 0;
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
        lastClicked = 2;
    } else if (num === 3) {
        negativeAccordion.style.display = "block";
        positiveAccordion.style.display = "none";
        negativeAccordionContent.style.maxHeight = negativeAccordionContent.scrollHeight + 2 + "px";
        positiveAccordionContent.style.maxHeight = 0;
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
        lastClicked = 3;
    } else if (num === 4) {
        negativeAccordion.style.display = "none";
        positiveAccordion.style.display = "block";
        negativeAccordionContent.style.maxHeight = 0;
        positiveAccordionContent.style.maxHeight = positiveAccordionContent.scrollHeight + 20 + "px";
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#f7c02a";
        star5.style.color = "#DEDEDE";
        lastClicked = 4;
    } else if (num === 5) {
        negativeAccordion.style.display = "none";
        positiveAccordion.style.display = "block";
        negativeAccordionContent.style.maxHeight = 0;
        positiveAccordionContent.style.maxHeight = positiveAccordionContent.scrollHeight + 20 + "px";
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#f7c02a";
        star5.style.color = "#f7c02a";
        lastClicked = 5;
    }
}

const starHover = function (num) {
    if (num === 1) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#DEDEDE";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    } else if (num === 2) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    } else if (num === 3) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    } else if (num === 4) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#f7c02a";
        star5.style.color = "#DEDEDE";
    } else if (num === 5) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#f7c02a";
        star5.style.color = "#f7c02a";
    };
};

const starOut = function () {
    if (lastClicked === 1) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#DEDEDE";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    } else if (lastClicked === 2) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    } else if (lastClicked === 3) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    } else if (lastClicked === 4) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#f7c02a";
        star5.style.color = "#DEDEDE";
    } else if (lastClicked === 5) {
        star1.style.color = "#f7c02a";
        star2.style.color = "#f7c02a";
        star3.style.color = "#f7c02a";
        star4.style.color = "#f7c02a";
        star5.style.color = "#f7c02a";
    } else {
        star1.style.color = "#DEDEDE";
        star2.style.color = "#DEDEDE";
        star3.style.color = "#DEDEDE";
        star4.style.color = "#DEDEDE";
        star5.style.color = "#DEDEDE";
    };
};



star1.addEventListener("mouseover", () => starHover(1));
star2.addEventListener("mouseover", () => starHover(2));
star3.addEventListener("mouseover", () => starHover(3));
star4.addEventListener("mouseover", () => starHover(4));
star5.addEventListener("mouseover", () => starHover(5));
star1.addEventListener("mouseout", () => starOut());
star2.addEventListener("mouseout", () => starOut());
star3.addEventListener("mouseout", () => starOut());
star4.addEventListener("mouseout", () => starOut());
star5.addEventListener("mouseout", () => starOut());
star1.addEventListener("click", () => starClick(1));
star2.addEventListener("click", () => starClick(2));
star3.addEventListener("click", () => starClick(3));
star4.addEventListener("click", () => starClick(4));
star5.addEventListener("click", () => starClick(5));

const textarea = document.querySelector(".feedback-textarea");
const feedbackSubmit = document.querySelector(".feedback-submit");
textarea.addEventListener("keyup", () => {
    if (textarea.value.trim() != "") {
        //Enable the TextBox when TextBox has value.
        feedbackSubmit.disabled = false;
    } else {
        //Disable the TextBox when TextBox is empty.
        feedbackSubmit.disabled = true;
    }
});

const reviewPageBody = document.querySelector(".review-page-body");
const afterSubmitBody = document.querySelector(".after-submit");

feedbackSubmit.addEventListener("click", () => {
    reviewPageBody.style.display = "none";
    afterSubmitBody.style.display = "flex";
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');
    const customerEmail = urlParams.get('email');

    $.ajax({
        type: 'POST',
        url: '/review',
        data: {
            feedbackText: textarea.value,
            feedbackStars: lastClicked,
            businessId: businessId,
            customerEmail: customerEmail,
            _csrf: $("#token").val()
        },
        success: function () {
            console.log("SUCCESS")
        },
        error: function () {
            console.log("Failed to send data - POST AJAX /REVIEW ");
            //set an error notication for client
        }
    })
})
