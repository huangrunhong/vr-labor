import { Box3, Mesh, Object3D, Vector3 } from "three";

const size = new Vector3(0.25, 0.25, 0.25);

const isMesh = (object: Object3D): object is Mesh => object instanceof Mesh;

const collisionDetection = (origin: Vector3, scene: Object3D, box = size) => {
  let collided = false;

  const body = new Box3().setFromCenterAndSize(origin.clone().setY(0.5), box);

  scene.traverse((object) => {
    if (!isMesh(object) || !object.geometry.boundingBox) return;

    const box = new Box3().setFromObject(object);

    collided ||=
      !box.isEmpty() && !box.containsBox(body) && box.intersectsBox(body);
  });

  return collided;
};

export default collisionDetection;
