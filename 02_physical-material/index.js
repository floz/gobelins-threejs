import * as THREE from '../__common/libs/three.module';

import Engine from '../__common/engine'

const engine = new Engine()

// Setup
let scene = null
let camera = null

// Contents
let mesh = null

function setup() {
	scene = new THREE.Scene()

	camera = new THREE.PerspectiveCamera( 50, engine.width / engine.height, .1, 1000 )
	camera.position.z = 10
}

function createScene() {
	const ambient = new THREE.AmbientLight( 0x202020 )
	scene.add( ambient )

	const lightBehind = new THREE.PointLight( 0xffffff, .5 )
	lightBehind.position.x = 5
	lightBehind.position.y = 5
	lightBehind.position.z = -5
	scene.add( lightBehind )

	const lightFront = new THREE.PointLight( 0xffffff, 1 )
	lightFront.position.x = -5
	lightFront.position.y = -5
	lightFront.position.z = 5
	scene.add( lightFront )
}

function createMesh() {
	const geometry = new THREE.SphereGeometry( 1, 32, 32 )
	const material = new THREE.MeshPhysicalMaterial( {
		color: 0xff00ff,
	} )

	mesh = new THREE.Mesh( geometry, material )
	scene.add( mesh )
}

setup()

createScene()
createMesh()

function render() {
	engine.renderer.render( scene, camera )
}

// On frame loop
function onFrame() {
	requestAnimationFrame( onFrame )

	render()
}

onFrame()
