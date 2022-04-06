import {
    defineConfig
} from 'windicss/helpers'

function range(size, startAt = 1) {
    return Array.from(Array(size).keys()).map(i => i + startAt)
}
export default defineConfig({
    darkMode: 'class', //开启暗色模式
    /* 配置项... */
    // 循环白名单
    safelist: [
        range(5, 0).map(i => `border-${i}`), //边框
    ]
})