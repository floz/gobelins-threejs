import * as THREE from '../__common/libs/three.module';

const geometry = new THREE.ConeGeometry( .5, 1.5 )
const rotMatrix = new THREE.Matrix4()
rotMatrix.makeRotationX( Math.PI * .5 )
geometry.applyMatrix4( rotMatrix )

export default class Cone extends THREE.Mesh {

	constructor( mesh, material ) {
		super( geometry, material )

		this._mesh = mesh

		this._theta = Math.random() * Math.PI * 2
		this._phi = Math.random() * Math.PI * 2
		this._radius = 3

		this.updatePosition()
	}

	updatePosition() {
		// time increment
		
		// 3d
		this.position.x = Math.cos( this._theta ) * Math.sin( this._phi ) * this._radius
		this.position.y = Math.sin( this._theta ) * Math.sin( this._phi ) * this._radius
		this.position.z = Math.cos( this._phi ) * this._radius

		this.lookAt( this._mesh.position )
	}

}