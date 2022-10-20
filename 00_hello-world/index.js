import * as THREE from '../__common/libs/three.module';

import Engine from '../__common/engine'

// Pour nous faciliter la vie : s'occupe du resize de la window auto
// et de creer notre THREE.WebGLRenderer
const engine = new Engine()

function setup() {
	// On a besoin d'une scene
	
	// Et d'une camera
}

function createMesh() {
	// Et si on veut voir quelque chose on aura aussi besoin
	// d'ajouter un Mesh (fait d'une geometry et d'un material)
	// a notre scene.
}

setup()
createMesh()

function render() {
	// Update ce qu'il faut

	// Render la scene
}

// Notre frame loop
function onFrame() {
	requestAnimationFrame( onFrame )

	render()
}

onFrame()
