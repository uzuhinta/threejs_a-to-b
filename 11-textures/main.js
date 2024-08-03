import  * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'; 
import imageSource from "./public/alpha.jpg";

const gui = new GUI();

// console.log(imageSource)
const image = new Image()
const texture = new THREE.TextureLoader().load( "/color.jpg" );

const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({map: texture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debug
gui.add(mesh.position, 'x', -2, 2, 0.1)
gui.add(mesh.position, 'y', -2, 2, 0.1)
gui.add(mesh.position, 'z', -2, 2, 0.1)

gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui.addColor(material, 'color')


// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Camera
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  console.log('aaa')
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', (event) => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
          canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
          canvas.webkitRequestFullscreen();
      }
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else {
          document.webkitExitFullscreen();
      }
  }
})

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)

// Controls
const orbitControl = new OrbitControls(camera, canvas)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const tick = () => {
  // const elapsedTime = clock.getElapsedTime()
  // // update the objects
  // mesh.rotation.y = elapsedTime

  // render
  renderer.render(scene, camera)
  
  window.requestAnimationFrame(tick)
}

tick()