<template>
  <canvas id="threejs">

  </canvas>
</template>

<script setup >
import { getCurrentInstance, onMounted, ref } from "vue";
import { useName } from "@/hooks/useName";
const { proxy } = getCurrentInstance()
const { name, setName, getName } = useName();
onMounted(() => {

  const THREE = proxy.THREE
  const Dom = window.document.getElementById("threejs")

  const scene = new THREE.Scene({
    background: new THREE.Color('skyblue')
  });
  const camera = new THREE.PerspectiveCamera(75, Dom.width / Dom.height, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    canvas: Dom
  });
  renderer.setSize(Dom.width, Dom.height);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 7;
  camera.rotation.y = 0;
  camera.rotation.x = 0.4;
  renderer.render(scene, camera);
})

</script>

<style scoped lang="scss">
</style>
