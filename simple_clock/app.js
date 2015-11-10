window.addEventListener("load", function () {
    document.querySelector("#main").style.height = screen.height + "px";
    showTime();
});

function showTime() {
    var now = new Date();
    document.querySelector("#time").innerHTML =now.toLocaleDateString("zh-TW")+" "+now.toDateString().match("\\D{3}")+" "+now.toTimeString();
    setTimeout(showTime, 1000);
}
