export default /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
attribute float randomValue;
float PI = 3.14159265359;

void main() {
 vUv = uv;

 float offset = randomValue + sin(uTime + 15.0* randomValue);
 offset *= 0.35;
 // offset *= 0.;

 vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position,1.0);
 modelPosition.y += offset;
 modelPosition = viewMatrix * modelPosition;
 vViewPosition = - modelPosition.xyz;

 //Normal
 vNormal = normalMatrix * normal * mat3(instanceMatrix);

 vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position,1.0);
 worldPosition.y += offset;
 vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelPosition;
 // gl_Position = projectionMatrix * viewMatrix  * instanceMatrix * modelMatrix * vec4(position, 1.0);
}
`
