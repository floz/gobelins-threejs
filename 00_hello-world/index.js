import * as THREE from '../__common/libs/three.module';
import * as dat from '../__common/libs/dat.gui.min'
import OrbitControls from '../__common/libs/orbitcontrols'

import audio from '../__common/audio'

import Engine from '../__common/engine'
import Cone from './Cone';

let gui = null
let fSettings = null

let scene = null
let camera = null

let material = null
let mesh = null

// Pour nous faciliter la vie : s'occupe du resize de la window auto
// et de creer notre THREE.WebGLRenderer
const engine = new Engine()

function setup() {
	// On a besoin d'une scene
	scene = new THREE.Scene()
	
	// Et d'une camera
	camera = new THREE.PerspectiveCamera( 50, engine.width / engine.height, .1, 1000 )
	camera.position.z = 10

	new OrbitControls( camera, engine.renderer.domElement )
}

function createGUI () {
	gui = new dat.GUI()
	
	fSettings = gui.addFolder( 'Settings' )
	fSettings.open()
}

function setupScene() {
	const ambient = new THREE.AmbientLight( 0x202020 )
	scene.add( ambient )

	const lightBehind = new THREE.PointLight( 0xffffff, .5 )
	lightBehind.position.x = 5
	lightBehind.position.y = 5
	lightBehind.position.z = -5
	scene.add( lightBehind )
	scene.add( new THREE.PointLightHelper( lightBehind, .2 ) )

	const lightFront = new THREE.PointLight( 0x0000ff, .5 )
	lightFront.position.x = -5
	lightFront.position.y = -5
	lightFront.position.z = 5
	scene.add( lightFront )
	scene.add( new THREE.PointLightHelper( lightFront, .2 ) )
}

function createMesh() {
	const geometry = new THREE.SphereGeometry( 1, 32, 32 )
	material = new THREE.MeshPhysicalMaterial( {
		color: 0xff00ff,
		metalness: .1,
		roughness: .5,
	} )

	mesh = new THREE.Mesh( geometry, material )
	scene.add( mesh )

	// GUI
	const fMaterial = fSettings.addFolder( 'Material' )
	fMaterial.add( material, 'metalness', 0, 1, .01 )
	fMaterial.add( material, 'roughness', 0, 1, .01 )
	fMaterial.add( material, 'reflectivity', 0, 1, .01 )
	fMaterial.open()
}

let countCones = 4 
let cones = []

function createCones() {
	for( let i = 0; i < countCones; i++ ) {
		const cone = new Cone( mesh, material )
		scene.add( cone )

		cones.push( cone )
	}
}

setup()
createGUI()
setupScene()
createMesh()
createCones()

function render() {
	// Update ce qu'il faut

	for( const cone of cones ) {
		cone.updatePosition()
	}
	
	// Render la scene
	engine.renderer.render( scene, camera )
}

// Notre frame loop
function onFrame() {
	requestAnimationFrame( onFrame )

	render()
}

//

function onBeat() {
	console.log( 'onBeat' )
}

audio.start( {
	onBeat: onBeat,
	live: false,
	src: require('url:./static/audio/galvanize.mp3')
})

//

onFrame()
