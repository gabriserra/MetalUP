//slider.js : javascript function for slider
var N_OF_IMAGE = 3;

//next or prev
function arrow(direction) {
    'use strict';
    var activeImg, img, i, prevImg;
    //there is only one active element
    activeImg = document.getElementsByClassName("active")[0];
    img = document.getElementsByClassName("sliderimg");
    //search for active image and assign new value to prevImage variable
    for (i = 0; i < N_OF_IMAGE; i = i + 1) {
        if (activeImg === img[i]) {
            prevImg = ((direction === "next") ? i + 1 : i - 1);
            break;
        }
    }
    
    //check if next image or prev image are out of bound
    if (direction === "next") {
        prevImg = ((prevImg === N_OF_IMAGE) ? 0 : prevImg);
    } else {
        prevImg = ((prevImg === -1) ? N_OF_IMAGE - 1 : prevImg);
    }
    activeImg.className = "sliderimg nactive";
    img[prevImg].className = "sliderimg active";
}