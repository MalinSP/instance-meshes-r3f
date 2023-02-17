import { useRef, useLayoutEffect, useMemo } from 'react'
import {
  Instances,
  Instance,
  shaderMaterial,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import objectVertexShader from '../shaders/vertex'
import objectFragmentShader from '../shaders/fragment'
import * as THREE from 'three'
import { Texture } from 'three'
import { extend, useFrame } from '@react-three/fiber'

const ObjectMaterial = shaderMaterial(
  {
    uTime: 0,
    uMatcap: new THREE.TextureLoader().load('./sec2.png'),
    uScan: new THREE.TextureLoader().load('./scan.png'),
  },
  objectVertexShader,
  objectFragmentShader
)

extend({ ObjectMaterial })

let rows = 100
let count = rows * rows
const o = new THREE.Object3D()
let random = new Float32Array(count)

export default function Objects() {
  const objectOne = useGLTF('./objects/ob1.glb')
  const objectTwo = useGLTF('./objects/ob2.glb')
  const objectThree = useGLTF('./objects/ob3.glb')

  const texture = useTexture('./sec2.png')

  const ref = useRef()
  const materialRef = useRef()

  const geometryOne = objectOne.scene.children[0].geometry
  const geometryTwo = objectTwo.scene.children[0].geometry
  const geometryThree = objectThree.scene.children[0].geometry

  useLayoutEffect(() => {
    console.log(ref.current)
    let index = 0
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        random[index] = Math.random()
        o.position.set(i - rows / 2, -10, j - rows / 2)
        o.updateMatrix()
        ref.current.setMatrixAt(index++, o.matrix)
      }
    }
    ref.current.instanceMatrix.needsUpdate = true

    ref.current.geometry.setAttribute(
      'randomValue',
      new THREE.InstancedBufferAttribute(random, 1)
    )
    console.log(ref.current.geometry)

    // ref.current.geometry.setAttribute(
    //   'aRandom',
    //   new THREE.InstancedBufferAttribute(random, 1)
    // )
  }, [])

  useFrame((state, delta) => {
    materialRef.current.uTime += delta * 0.15
  })

  return (
    <instancedMesh ref={ref} args={[geometryOne, null, count]}>
      {/* <meshMatcapMaterial matcap={texture} /> */}
      <objectMaterial ref={materialRef} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}
