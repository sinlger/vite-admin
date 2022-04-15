// (function (win, doc) {
//     const change = function () {
//         const scale = doc.documentElement.clientWidth / 1920
//         // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
//         doc.documentElement.style.fontSize = doc.documentElement.style.fontSize * Math.min(scale, 1) + "px"
//     }
//     win.addEventListener("resize", change, false)
// })(window, document)