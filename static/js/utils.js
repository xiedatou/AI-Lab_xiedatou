window.onload = function () {
    let canvas = document.getElementById("mainCanvas");
    // canvas.style.border = "solid 1px red";
    let canvas_box = document.getElementById("canvasBox");
    canvas_box.style.height = "95%";

    let box_height = canvas_box.offsetHeight;
    let box_width = canvas_box.offsetWidth;
    console.log("onload", box_height, box_width);
    canvas.style.height = String(box_height) + "px";
    canvas.style.width = String(box_width) + "px";
}

window.onresize = function () {
    let canvas = document.getElementById("mainCanvas");
    let canvas_box = document.getElementById("canvasBox");
    let box_height = canvas_box.offsetHeight;
    let box_width = canvas_box.offsetWidth;
    console.log("onresize", box_height, box_width);
    canvas.style.height = String(box_height) + "px";
    canvas.style.width = String(box_width) + "px";
}