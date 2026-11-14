import * as THREE from 'three';

/**
 * Overlay shaders. On the globe (camera outside) a point on the unit sphere is
 * visible only if dot(p, cam/|cam|) > 1/|cam|, i.e. it lies on the near side of
 * the horizon; inside the sphere everything is visible.
 */
const visibility = /* glsl */ `
  uniform vec3 uCam;
  uniform float uOutside;
  varying float vVis;
  float horizon(vec3 position) {
    vec3 p = normalize(position);
    float d = max(length(uCam), 1e-6);
    return uOutside > 0.5 ? dot(p, uCam / d) - 1.0 / d : 1.0;
  }
`;

export function lineMaterial(color: string, opacity: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uCam: { value: new THREE.Vector3() },
      uOutside: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    },
    vertexShader: /* glsl */ `
      ${visibility}
      void main() {
        vVis = horizon(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vVis;
      void main() {
        if (vVis < 0.0) discard;
        gl_FragColor = vec4(uColor, uOpacity);
      }
    `,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
}

export function pointMaterial(color: string, sizePx: number, opacity: number, ring: boolean): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uCam: { value: new THREE.Vector3() },
      uOutside: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uSize: { value: sizePx },
      uDpr: { value: 1 },
      uRing: { value: ring ? 1 : 0 },
    },
    vertexShader: /* glsl */ `
      ${visibility}
      uniform float uSize;
      uniform float uDpr;
      void main() {
        vVis = horizon(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSize * uDpr;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uRing;
      varying float vVis;
      void main() {
        if (vVis < 0.0) discard;
        float r = length(gl_PointCoord - vec2(0.5)) * 2.0;
        if (r > 1.0) discard;
        float a = uRing > 0.5
          ? smoothstep(0.58, 0.7, r) * (1.0 - smoothstep(0.86, 1.0, r))
          : 1.0 - smoothstep(0.45, 1.0, r);
        gl_FragColor = vec4(uColor, uOpacity * a);
      }
    `,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
}

/** Updates the shared overlay uniforms once per frame. */
export function syncOverlayUniforms(material: THREE.ShaderMaterial, camera: THREE.Camera, outside: boolean, dpr: number): void {
  (material.uniforms.uCam.value as THREE.Vector3).copy(camera.position);
  material.uniforms.uOutside.value = outside ? 1 : 0;
  if (material.uniforms.uDpr) material.uniforms.uDpr.value = dpr;
}
