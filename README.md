# TOC

1. Basics

- Creating a first scene
- Render it
- Adding objects
- Choosing the right materials
- Adding textures
- Animating everything
- Put it online

2. Classic Techniques

- Creating our own geometries
- Adding light and shadows
- Interacting with 3D objects
- Adding particles

3. Advanced techniques

- Creating our own 3D models using Blender
- Add physic
- Organize your code for big projects

4. Shaders

- Shaders
- Shaders patterns
- Raging see
- Animated galaxy
- Modified materials

5. Extra

- Adding post-processing
- Optimising performance
- Mixing WebGl with HTML

6. Portal Scene

- Crating a scene in Blender
- Baking and exporting the scene
- Importing and optimising the scene
- Adding details to the scene

7. React thee fiber

How to use Three.js in a React application.

# Basic

## What is WebGL and Why use Three.js

Three.js is a 3D JS library that enables developers to create #D experience for the web.

It work with WebGL, but you can make it work with SVG and CSS

### What is WebGL?

- Javascript API
- Renders triangles at a remarkable speed
- Result can be drawn in a canvas
- Compatible with most modern browsers
- Uses the GPU

The CPU can do calculations really fast but one by one. The GPU is a little slower but can do thousands of parallel calculations.

To draw a 3D model, the idea is to draw many triangles at the right position and colorize them so that they look the way we want

The GPU will position all those position at once according to many factors

Once the points are plated, the GPU will draw each visible pixel of those triangles.

Again, those thousand of pixels will be calculated and drawn in parallel extremely fast.

The instruction to place the points and draw the pixels are written in **shader**. We provide a bunch of information to those shaders like the points positions, model transformation, the camera coordinates and thing get positions and colorized the way we want.

This is why native WebGL is so hard. Drawing a single triangle on the canvas would take at least 100 line of code. But native webgl benefits from existing at a low level which enables optimizations and more control

Three.JS drastically simplify the process of all of this.

## Basic scene

Demo:

- Make Three.js work the simplest possible way
- No bundler, no modules, no dependencies.
- A JS and a HTML file

4 element to get started

- A scene that will contain objects
  - Like a container
  - We put objects, models, light , ... in it
- Some objects. Can be many thing
  - Primitive geometries
  - Imported models
  - Particles
  - Lights
  - ...
  - We need to create a **Mesh** = a geometry (the shape) + a material (how it look)
- A camera
  - Not visible
  - Serve as point of view when doing a render
  - Can have multiple and switch between them
  - Different types
- A renderer
  - Render the scene from the camera point of view
  - Result drawn into a canvas
  - A canvas is a HTML element in which you can draw stuff
  - Three.js will use WebGL to draw the render inside this canvas
  - You can create it or you can let Three.js do it

Camera: 
- The field of view
  - Vertical vision angle
  - In degree
  - Also called **fov**
- The aspect ratio
  - The width of the render divided by the height of th render

## Local server

## Transform object

There are 4 properties to transform objects:
- position
- scale
- rotation
- quaternion: euler is easy to understand but this axis order can be problematic. This is why most engines and 3D software use Quaternion. Quaternion also expresses a rotation, but in a more mathematical way. Quaternion updates when you change the rotation

All classes that inherit form the Object3D possess those properties. Those properties will be complied in matrices. You don't need to understand matrices

Positioning things in space can be hard. One good solution is use the **AxesHelper** to display to colored line for each axis.

We can put objects inside groups and use position, rotation (or quaternion), and scale on those groups.

## Animations

Animating is like doing stop motion:
- Move the object
- Take a picture
- Move the object a bit more
- Take a picture
- etc.

Most screens run at 60 frames per seconds (FPS), but not always. Your animation must look the same regardless of the framerate

We need to update object and do a render on each frame. We are going to do that in a function and call this function with **window.requestAnimationFrame(...)**

The purpose of requestAnimationFrame is to call the function provided on the next frame. We are going to call the same function on each new frame

```js
const tick = () => {
  // update the objects
  mesh.rotation.y += 0.01

  // render
  renderer.render(scene, camera)
  
  window.requestAnimationFrame(tick)
}

tick()
```

Unfortunately, the higher the framerate, the faster the rotation

=> Adaptation to the framerate

We must to know how much time it's been since the last tick. Use Date.now() to get the current timestamp

```js
let time = Date.now()

const tick = () => {
  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime
  // update the objects
  mesh.rotation.y += 0.002 * deltaTime

  // render
  renderer.render(scene, camera)
  
  window.requestAnimationFrame(tick)
}

tick()
```

Three.js has a built-in solution named **Clock**. Instantiate a Clock and use its get ElapsedTime method

Use library: if you want to have more control, create tweens, create timelines, etc. You can use a library like *GSAP*

## Cameras

Camera is an abstract class. You're not supported to use it directly

Array camera: render the scene from multiple cameras on specific areas of the render

Stereo camera: render the scene through two cameras that mimic the eye to create a parallax effect. Use with devices like VR headset, red and blue glasses or cardboard

Cube camera: do 6 renders, each one facing a differenct direction. Can render the surrounding for thing liek environment map, reflection or shadow map

OrthographicCamera render the scene without perspective

Perspective camera render the scene with perspective
- fov
- The aspect ratio
- near or far: correspond to hwo close had how far the camera can see. Any object or part of the object closer than hear or further than far will not show up.

OrthographicCamera differs from PerspectiveCamera by its lack of perspective. Objects has the same size regardless of their distance to the camera. Instead of a field fo view, we provide how far the camera can see in each direction (left, right, top and bottom), then the near and far

We want to control the camera position with the mouse.

- We need the mouse coordinates on the page. Listen to the mouse move event and retrieve the event.clientX and event.clientY

### Build-in controls

Device orientation controls: will automatically retrieve the device orientation if your device, OS, and browser allow it and rotate the camera accordingly. Useful to create immersive universes or VR experiences.

FlyControls: enable moving the camera like if you were on a spaceship. You can rotate on all 3 axes, go forward and go backward

FirstPersonControl: is like FlyControls, but with a fixed up axis. Doesn't work like FPS game

Pointer lock control: use the point lock JS API. Hard to use and almost only handles the point lock and camera rotation

OrbitControls similar to the controls we made with more futures

TrackballControl is like orbitcontrol without the vertical angle limit

TransformControl/DragControl has nothing to do with the camera

OrbitControls:

- Target: by default, the camera is looking at the cneter of the scene. We can change the target property which is a Vector3

```js
controls.target.y = 2
controls.update()
```

- Damping: will smooth the animation by adding some kind of acceleration and friction. To enable the damping, switch the enableDamping property to true.

## Full screen and resizing

Some might see a blurry render and stairs effect on the edges. If so, it's because you are testing on a screen with a pixel ratio greater than 1

The pixel ratio corresponds to how many physical pixel you have on the screen for one pixel unit on the software part.

To get the current pixel ratio, we can use window.devicePixelRatio. to update the renderer accordingly, we can use renderer.setPixelRatio()

## Geometries

Define:
- Composed of vertices (point coordinates in 3D spaces) and faces (triangles that join those vertices to create a surface)
- Can be used for meshed but also for particles
- Can store more data than the positions (UV coordinates, normals, colors or anything we want)

## Debug UI

We need to be able to tweak and debug easily. It concerns the developer, the designer and even the client. It will help finding the perfect color, speed, quantity, ...

We can create own own or we can use a library:

- dat.GUI -> lil-gui: there are different types of elements you can add to that panel:
  - Range: min-max value
  - Color:
  - Text
  - Checkbox
  - Select
  - Button
  - Folder: to organize your panel if you have too many element

- control-panel
- ControlKit
- Guify
- Oui

## Texture

Texture are images that will cover the surface of the geometries. Many types with many different effects. We are going to discover the most used types with the door textures by Joao Paulo

- Color (or albedo): most simple one; applied on the geometry
- Alpha: gray scale image; white visible; black not visible
- Height (or displacement): gray scale image; move the vertices to create some relief; need enough subdivision
- Normal: add details; doesn't need subdivision; the vertilcles won't move; lure the light about the face orientation; better performances than adding a height textures with a lot fo subdivision
- Ambient occlusion: gray scale image; add fake shadows in crevices; not physically accurate; helps to create contrast and see details
- Metalness: gray scale image; white is metallic; back is non-metallic; mostly for reflection
- Roughness

Those textures (especially Metalness and the Roughness) follow the PBR principles:

### UV unwrapping

The texture is being stretched or squeezed in different ways to cover the geometry

This is called UV unwrapping and it's like unwrapping an origami or a candy wrap to make it flat

Each vertex will have a 2D coordinate on a flat plane (usually a square)

Those UV coordinates are generated by Three.js. If you create your own geometry you'll have to specify the UV coordinates. If you are making the geometry using a 3D software, you'll also have to do the UV unwrapping.

### Transforming the texture

Repeat: 
- We can repeat the texture by using the *repeat* property. It's a **Vector2** with x and y properties.
- By default, the texture doesn't repeat and the last pixel get stretched. We can change that with THREE.RepeatWrapping on wrapS and wrapT properties

Rotation:
- We can rotate the texture using the *rotation* property.
- We can change the pivot point using the center property which is a *Vector2*

Filtering and mipmapping
- If you look at the cube's top face while this face is almost hidden, you'll see a blurry texture. That is due to the filtering and the mipmapping
- Mip mapping is the technic that consist of creating half a smaller version of a texture again and again until we get a 1x1 texture. All those texture variations are sent to the GPU, and the GPU will choose the most appropriate version of the texture.
- All of this is already handled by Three.js and the GPU but we can choose different algorithm. There are two types of filter algorithms:
  - Minification filter
  - Magnification filter
- If we are using THREE.NearestFilter on minFilter, we don't need the mipmaps. We can deactivate the mipmaps generation with colorTexture.generateMipmaps = false

### Texture format and optimization
When preparint your textures, keep in mind 3 crucial elements:
- The weight
- The size (resolution)
- The data

Choose the right type of files:
- .jpg: lossy compression but usually lighter
- .png: lossless compression but usually heavier

Each pixel of the textures will have to be stored on the GPU regardless of the images's weight. GPU has storage limitations. It's even worse because mipmapping increases the number of pixel to store. Try to reduce the size of your image as much as possible

The texture width and heigh must be a power of 2

### Where to find texture

- poliigon.com
- 3dtextures.me
- arroway-textures.ch

Alway make sure that you have the right to use the texture if it's not for personal usage.
You can also create you own texture with potos and 2d software (photoshop, substance designer)

## Materials

Materials are used to put a color on each visible pixel of the geometries. The algorithms are written in programs called shaders. We don't need to write shader and we can use build-in material