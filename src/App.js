import './App.css'
import { Canvas, extend } from '@react-three/fiber'
import styled from 'styled-components'
import Objects from './components/Objects.js'
import { OrbitControls } from '@react-three/drei'

extend({ OrbitControls })

function App() {
  return (
    <CanvasContainerWrapper>
      <Canvas>
        <ambientLight intensity={0.25} />
        <Objects />
        <OrbitControls />
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
