import * as THREE from '../__common/libs/three.module';

import Engine from '../__common/engine'

let scene = null
let camera = null

// Pour nous faciliter la vie : s'occupe du resize de la window auto
// et de creer notre THREE.WebGLRenderer
const engine = new Engine()

function setup() {
	// On a besoin d'une scene
	scene = new THREE.Scene()
	
	// Et d'une camera
	camera = new THREE.PerspectiveCamera( 50, engine.width / engine.height, .1, 1000 )
	camera.position.z = 10
}

function setupScene() {
	const ambient = new THREE.AmbientLight( 0x202020 )
	scene.add( ambient )

	const lightBehind = new THREE.PointLight( 0xffffff, .5 )
	lightBehind.position.x = 5
	lightBehind.position.y = 5
	lightBehind.position.z = -5
	scene.add( lightBehind )

	const lightFront = new THREE.PointLight( 0x0000ff, .5 )
	lightFront.position.x = -5
	lightFront.position.y = -5
	lightFront.position.z = 5
	scene.add( lightFront )
}

function createMesh() {
	const geometry = new THREE.SphereGeometry( 1, 32, 32 )
	const material = new THREE.MeshPhysicalMaterial( {
		color: 0xff00ff
	} )

	const mesh = new THREE.Mesh( geometry, material )
	scene.add( mesh )
}

setup()
setupScene()
createMesh()

function render() {
	// Update ce qu'il faut
	
	// Render la scene
	engine.renderer.render( scene, camera )
}

// Notre frame loop
function onFrame() {
	requestAnimationFrame( onFrame )

	render()
}

onFrame()
