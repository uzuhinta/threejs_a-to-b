import  * as THREE from 'three'

const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Camera
const size = {
  width: 800,
  height: 600
}
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
camera.position.x = 1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)

// let time = Date.now()

// const tick = () => {
//   const currentTime = Date.now()
//   const deltaTime = currentTime - time
//   time = currentTime
//   // update the objects
//   mesh.rotation.y += 0.002 * deltaTime

//   // render
//   renderer.render(scene, camera)
  
//   window.requestAnimationFrame(tick)
// }

// tick()

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  // update the objects
  mesh.rotation.y = elapsedTime

  // render
  renderer.render(scene, camera)
  
  window.requestAnimationFrame(tick)
}

tick()