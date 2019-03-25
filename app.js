let appEl = document.getElementById('app');
let app = new Vue({
    el: "#app",
    data: {
        w: appEl.offsetWidth,
        h: window.innerHeight,
    }
})
window.onresize = () => {
    window.location.reload();
}