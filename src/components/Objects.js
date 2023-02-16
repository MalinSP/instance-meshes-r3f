import { useMemo } from 'react'
import { Instances, useGLTF, Instance, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Objects() {
  const objectOne = useGLTF('./objects/ob1.glb')
  const objectTwo = useGLTF('./objects/ob2.glb')
  const objectThree = useGLTF('./objects/ob3.glb')

  const texture = useTexture('./sec1.png')

  const geometryOne = objectOne.scene.children[0].geometry
  const geometryTwo = objectTwo.scene.children[0].geometry
  const geometryThree = objectThree.scene.children[0].geometry
  const geometryArray = [geometryOne, geometryTwo, geometryThree]

  const randomNumber = Math.floor(Math.random() * geometryArray.length)

  const rows = 2

  let index = 0
  const object3D = new THREE.Object3D()

  const positions = useMemo(() => {
    let positions = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i - rows / 2
        let z = j - rows / 2
        positions.push(x, z)
      }
    }
    console.log(positions)
  }, [])

  return (
    <Instances geometry={geometryOne} range={1000} limit={1000}>
      <meshMatcapMaterial map={texture} />
      {Array.from({ length: 10 }).map((props, i) => {
        return <Instance key={i} position={[i, -10, i]} />
      })}
    </Instances>
  )
}
