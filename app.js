let appEl = document.getElementById('app');
let app = new Vue({
    el: "#app",
    data: {
        w: appEl.offsetWidth,
        h: 250
    }
})
window.onresize = () => {
    window.location.reload();
}