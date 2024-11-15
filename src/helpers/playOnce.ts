import { AnimationAction, LoopOnce } from "three";

const playOnce = (action: AnimationAction | null, endTimeScale = 1) => {
  if (!action) return;

  action.reset();
  action.warp(0, endTimeScale, 1);
  action.setLoop(LoopOnce, 1);
  action.play();
};

export default playOnce;
