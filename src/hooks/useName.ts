import { ref, onMounted } from "vue"
export const useName = () => {
    let name = ref("董贺")

    const getName = () => {
        return name.value
    }
    const setName = (value: string): void => {
        name.value = value
    }
    onMounted(() => {
        console.log(name.value);
    })
    return {
        name, getName, setName
    }
}