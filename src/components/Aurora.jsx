import React, { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec2 uResolution;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uTime * 0.12;
  float n = snoise(vec2(uv.x * 2.0 + t, uv.y * 1.5 - t)) * 0.5 + 0.5;
  float n2 = snoise(vec2(uv.x * 3.5 - t * 0.6, uv.y * 2.0 + t * 0.4)) * 0.5 + 0.5;

  float band = uv.y + (n - 0.5) * uAmplitude;
  vec3 col = mix(uColor0, uColor1, smoothstep(0.0, 0.6, band));
  col = mix(col, uColor2, smoothstep(0.45, 1.0, band) * n2);

  float glow = pow(1.0 - abs(band - 0.5) * 1.6, 3.0);
  col += glow * 0.35;

  float alpha = smoothstep(0.0, 0.35, n * 0.7 + n2 * 0.5);
  fragColor = vec4(col, alpha * 0.9);
}
`

function hexToRGB(hex) {
  const m = hex.replace('#', '')
  return [
    parseInt(m.substring(0, 2), 16) / 255,
    parseInt(m.substring(2, 4), 16) / 255,
    parseInt(m.substring(4, 6), 16) / 255,
  ]
}

export default function Aurora({
  colors = ['#0a1530', '#3457d5', '#7afcff'],
  amplitude = 1.0,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    container.appendChild(gl.canvas)
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uResolution: { value: [1, 1] },
        uColor0: { value: hexToRGB(colors[0]) },
        uColor1: { value: hexToRGB(colors[1]) },
        uColor2: { value: hexToRGB(colors[2]) },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    function resize() {
      const w = container.offsetWidth
      const h = container.offsetHeight
      renderer.setSize(w, h)
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height]
    }
    window.addEventListener('resize', resize)
    resize()

    let raf
    const start = performance.now()
    function loop(now) {
      program.uniforms.uTime.value = (now - start) * 0.001
      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas)
    }
  }, [colors, amplitude])

  return <div className="aurora-layer" ref={ref} aria-hidden="true" />
}