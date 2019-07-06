/* eslint-disable no-undef */
import {
  OctahedronGeometry,
  MeshToonMaterial,
  Mesh,
  TextureLoader,
  MirroredRepeatWrapping
} from 'three';
import { noise } from '~/plugins/external/perlin';

export default class Blob {
  constructor(textureURL, perlinNoise) {
    this.textureURL = textureURL || undefined;
    this.mesh = undefined;
    this.geometry = undefined;
    this.perlinNoise = perlinNoise || 0.006;
    this.blobPosition = 0;
    this.create();
  }
  create() {
    const geometryBlobCreated = new OctahedronGeometry(100, 4);
    this.geometry = geometryBlobCreated;
    for (let i = 0; i < this.geometry.vertices.length; i++) {
      const vector = this.geometry.vertices[i];
      vector._o = vector.clone();
    }

    let materialBlobCreated;
    if (this.textureURL) {
      const textureBlobCreated = new TextureLoader().load(this.textureURL);
      textureBlobCreated.anisotropy = 8;
      textureBlobCreated.wrapS = MirroredRepeatWrapping;
      textureBlobCreated.wrapT = MirroredRepeatWrapping;
      textureBlobCreated.repeat.set(2, 2);
      materialBlobCreated = new MeshToonMaterial({
        map: textureBlobCreated,
        color: 0xf9f1ec,
        shininess: 0.1,
        reflectivity: 0
      });
    } else {
      materialBlobCreated = new MeshToonMaterial({
        color: 0xf9f1ec,
        specular: 0xf9f9f9,
        shininess: 0.1,
        reflectivity: 0
      });
    }

    const blobCreated = new Mesh(geometryBlobCreated, materialBlobCreated);
    this.mesh = blobCreated;
  }
  updateVertices(a) {
    if (this.perlinNoise !== 0 && this.mesh !== undefined) {
      for (let i = 0; i < this.geometry.vertices.length; i++) {
        const vector = this.geometry.vertices[i];
        vector.copy(vector._o);
        // eslint-disable-next-line no-undef
        const perlin = noise.simplex3(
          vector.x * this.perlinNoise + a * (this.perlinNoise / 30),
          vector.y * this.perlinNoise + a * (this.perlinNoise / 20),
          vector.z * this.perlinNoise
        );
        const ratio = perlin * 0.4 * 0.5 + 0.8;
        vector.multiplyScalar(ratio);
      }
    }

    this.geometry.verticesNeedUpdate = true;
    this.geometry.computeVertexNormals();
    this.geometry.normalsNeedUpdate = true;
  }
}
