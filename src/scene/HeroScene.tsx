import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'
import type { PointerState } from '../hooks/usePointer'

/**
 * The hero scene: a quiet network of nodes with amber "current" pulses travelling
 * along the links, plus one slowly turning wireframe form. It is a nod to the two
 * halves of the resume — electrical engineering and computer networking.
 *
 * Cost control: one draw call each for nodes, links and pulses; no lights, no
 * post-processing; node count drops on phones; rendering pauses off-screen.
 */

type SceneProps = {
  count: number
  reduced: boolean
  pointer: MutableRefObject<PointerState>
  scroll: MutableRefObject<number>
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.22, 'rgba(255,255,255,0.55)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

type Pulse = { edge: number; from: 0 | 1; t: number; speed: number }

function Network({ count, reduced, pointer, scroll }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const relic = useRef<THREE.Group>(null)
  const pulsePoints = useRef<THREE.Points>(null)
  const { camera, viewport } = useThree()
  const glow = useMemo(makeGlowTexture, [])
  useEffect(() => () => glow.dispose(), [glow])

  const net = useMemo(() => {
    const rnd = mulberry32(7)
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      nodes.push(new THREE.Vector3((rnd() - 0.5) * 20, (rnd() - 0.5) * 11, (rnd() - 0.5) * 10 - 2))
    }
    const seen = new Set<string>()
    const edges: [number, number][] = []
    const adj: number[][] = nodes.map(() => [])
    nodes.forEach((n, i) => {
      const nearest = nodes
        .map((m, j) => ({ j, d: n.distanceToSquared(m) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
      for (const { j, d } of nearest) {
        if (d > 32) continue
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) continue
        seen.add(key)
        edges.push([i, j])
        adj[i].push(edges.length - 1)
        adj[j].push(edges.length - 1)
      }
    })
    const linePos = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], e) => {
      nodes[a].toArray(linePos, e * 6)
      nodes[b].toArray(linePos, e * 6 + 3)
    })
    const nodePos = new Float32Array(count * 3)
    nodes.forEach((n, i) => n.toArray(nodePos, i * 3))

    const r = mulberry32(21)
    const pulses: Pulse[] = Array.from({ length: Math.max(4, Math.round(count / 7)) }, () => ({
      edge: Math.floor(r() * edges.length),
      from: r() < 0.5 ? 0 : 1,
      t: r(),
      speed: 0.22 + r() * 0.3,
    }))
    return { nodes, edges, adj, linePos, nodePos, pulses, pulsePos: new Float32Array(pulses.length * 3) }
  }, [count])

  const writePulses = () => {
    const { nodes, edges, pulses, pulsePos } = net
    pulses.forEach((p, i) => {
      const [a, b] = edges[p.edge]
      const from = nodes[p.from === 0 ? a : b]
      const to = nodes[p.from === 0 ? b : a]
      pulsePos[i * 3] = from.x + (to.x - from.x) * p.t
      pulsePos[i * 3 + 1] = from.y + (to.y - from.y) * p.t
      pulsePos[i * 3 + 2] = from.z + (to.z - from.z) * p.t
    })
  }
  useMemo(writePulses, [net]) // initial positions (also the static frame for reduced motion)

  useFrame((state, dt) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    const p = pointer.current
    const s = scroll.current
    const d = Math.min(dt, 0.05)

    const g = group.current
    if (g) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * 0.025 + p.x * 0.16, 3, d)
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -p.y * 0.08 + s * 0.3, 3, d)
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, p.x * 0.45, 3, d)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -p.y * 0.25 - s * 1.8, 3, d)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 9 + s * 4.5, 3, d)
    camera.lookAt(0, 0, 0)

    if (relic.current) {
      relic.current.rotation.y += d * 0.14
      relic.current.rotation.x += d * 0.05
    }

    // Move the pulses; at the end of a link, hop onto a neighbouring link.
    const { edges, adj, pulses } = net
    for (const pl of pulses) {
      pl.t += d * pl.speed
      if (pl.t >= 1) {
        const [a, b] = edges[pl.edge]
        const end = pl.from === 0 ? b : a
        const options = adj[end]
        const next = options[Math.floor(Math.random() * options.length)] ?? pl.edge
        pl.edge = next
        pl.from = edges[next][0] === end ? 0 : 1
        pl.t = 0
      }
    }
    writePulses()
    const attr = pulsePoints.current?.geometry.attributes.position
    if (attr) attr.needsUpdate = true
  })

  const narrow = viewport.width < 8

  return (
    <>
      <fog attach="fog" args={['#06070a', 9, 21]} />
      <group ref={group}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[net.linePos, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#7fb2ff" transparent opacity={0.17} depthWrite={false} />
        </lineSegments>

        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[net.nodePos, 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={glow}
            color="#9cc4ff"
            size={0.26}
            sizeAttenuation
            transparent
            opacity={0.85}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <points ref={pulsePoints} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[net.pulsePos, 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={glow}
            color="#ffbf66"
            size={0.55}
            sizeAttenuation
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      <group ref={relic} position={[narrow ? 1.1 : Math.min(4.9, viewport.width * 0.3), narrow ? 2.4 : 0.5, -1.5]}>
        <mesh scale={narrow ? 0.7 : 1}>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial color="#7fb2ff" wireframe transparent opacity={0.26} />
        </mesh>
        <mesh rotation={[1.25, 0.3, 0]} scale={narrow ? 0.7 : 1}>
          <torusGeometry args={[2.6, 0.006, 8, 140]} />
          <meshBasicMaterial color="#ffbf66" transparent opacity={0.45} />
        </mesh>
        <sprite scale={narrow ? [6, 6, 1] : [10, 10, 1]}>
          <spriteMaterial map={glow} color="#3d78d8" transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      </group>
    </>
  )
}

type Props = SceneProps & { active: boolean; compact: boolean }

export default function HeroScene({ active, compact, ...scene }: Props) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 60 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance' }}
      frameloop={scene.reduced ? 'demand' : active ? 'always' : 'never'}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Network {...scene} />
    </Canvas>
  )
}
