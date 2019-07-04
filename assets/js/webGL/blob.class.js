/* eslint-disable no-undef */
import {
  IcosahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader
} from 'three';
import { noise } from '~/plugins/external/perlin';

export default class Blob {
  constructor(textureURL, perlinNoise) {
    this.textureURL = textureURL || undefined;
    this.mesh = undefined;
    this.geometry = undefined;
    this.perlinNoise = perlinNoise || 0.006;
    this.create();
  }
  create() {
    const geometryBlobCreated = new IcosahedronGeometry(100, 3);
    this.geometry = geometryBlobCreated;
    for (let i = 0; i < this.geometry.vertices.length; i++) {
      const vector = this.geometry.vertices[i];
      vector._o = vector.clone();
    }

    let materialBlobCreated;
    if (this.textureURL) {
      const textureBlobCreated = new TextureLoader().load(this.textureURL);
      textureBlobCreated.anisotropy = 4;
      materialBlobCreated = new MeshStandardMaterial({
        map: textureBlobCreated,
        color: 0xf9f5f2,
        metalness: 0.2,
        roughness: 0.5
      });
    } else {
      materialBlobCreated = new MeshStandardMaterial({
        color: 0xf9f5f2,
        metalness: 0.2,
        roughness: 0.5
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
  }
}
