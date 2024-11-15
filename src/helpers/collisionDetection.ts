import { Box3, Mesh, Object3D, Scene, Vector3 } from "three";

const size = new Vector3(0.5, 0.5, 0.5);

const isMesh = (object: Object3D): object is Mesh => object instanceof Mesh;

const collisionDetection = (origin: Vector3, scene: Scene) => {
  let collided = false;

  const body = new Box3().setFromCenterAndSize(origin.clone().setY(0.3), size);

  scene.traverse((object) => {
    if (!isMesh(object) || !object.geometry.boundingBox) return;

    const box = new Box3().setFromObject(object);

    if (!box.containsBox(body) && box.intersectsBox(body)) {
      console.log(object.name);
    }

    collided ||= !box.containsBox(body) && box.intersectsBox(body);
  });

  return collided;
};

export default collisionDetection;
