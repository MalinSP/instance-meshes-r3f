import './App.css'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import Objects from './components/Objects.js'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { EffectComposer, SSR } from '@react-three/postprocessing'
import { useControls } from 'leva'

function App() {
  return (
    <CanvasContainerWrapper>
      <Canvas>
        <ambientLight intensity={0.75} />
        <Objects />
        <OrbitControls />
        <OrthographicCamera
          makeDefault
          zoom={150}
          top={2}
          bottom={-2}
          left={-2}
          right={2}
          near={-1000}
          far={1000}
          position={[8, 12, 16]}
        />
      </Canvas>
    </CanvasContainerWrapper>
  )
}
const CanvasContainerWrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
`

export default App
