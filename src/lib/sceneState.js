// Shared between the scroll sections and the WebGL scene, written every frame
// by the sections, read every frame by the scene. Plain object, no React state.
export const sceneState = {
  logo: 0, // how visible the logo chapter's pillar is, 0..1
  logoTurn: 0, // 0..1 through the logo opener: one slow turn
};
