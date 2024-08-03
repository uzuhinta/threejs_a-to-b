const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
const size = {
  width: 800,
  height: 600
}

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)