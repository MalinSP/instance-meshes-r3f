export default /* glsl */ `
uniform float uTime;
uniform sampler2D uMatcap;
uniform sampler2D uScan;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

float PI = 3.14159265359;

void main() {
  
 vec3 normal = normalize(vNormal);
 //from Mr.Doob
 vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

 vec4 matcapColor = texture2D( uMatcap, uv );

 vec2 scanUv = fract(vWorldPosition.xz);
 vNormal.y < 0. ? scanUv = fract(vUv * 10.0) : scanUv;

 vec4 scanColor = texture2D(uScan, scanUv);

 vec3 origin = vec3(0);

 //wave
 float dist = distance( vWorldPosition, origin);
 float radialMove = fract(dist - uTime);
 // radialMove *= 1.0 - smoothstep(1.,3.,dist);
 radialMove *= 1.0 - step(uTime, dist);
 radialMove *= uv.x * 2.2;

 float scanMix = smoothstep(0.3,0.0,1.0-radialMove);
 scanMix *= 1.0 + scanColor.r * 0.7; 

scanMix += smoothstep(0.1, 0., 1. - radialMove) * 2.25;

vec3 scanMixColor = mix(vec3(0.5), vec3(0.25,0.5,1.), scanMix * 0.5);


 gl_FragColor = vec4(vUv, 0.0, 1.0);
gl_FragColor = vec4(vNormal, 1.0);
gl_FragColor = vec4(vWorldPosition, 1.0);

 gl_FragColor = matcapColor;
 gl_FragColor = scanColor;
 gl_FragColor = vec4(vec3(scanColor.r), 1.);
 gl_FragColor = vec4(vec3(radialMove), 1.);
 // gl_FragColor = vec4(vec3(smoothstep(1.,3.,dist)), 1.);
  gl_FragColor = vec4(vec3(step(uTime, dist)), 1.);
  gl_FragColor = vec4(vec3(radialMove), 1.);
  gl_FragColor = vec4(vec3(scanMix), 1.);
  gl_FragColor = vec4(vec3(scanMixColor), 1.);

   gl_FragColor = matcapColor;

  gl_FragColor.rgb = mix(gl_FragColor.rgb, scanMixColor, scanMix * 0.5);
}
`
