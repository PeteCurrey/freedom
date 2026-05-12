"use client";

import React from 'react';
import { 
  Box, 
  Orbit, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Type, 
  Layout 
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei';
import { usePlannerStore } from '../store/plannerStore';
import { CHASSIS_DATA } from '../data/chassisData';
import { VanShell3D } from './VanShell3D';
import { ComponentBox3D } from './ComponentBox3D';
import { CameraControls3D } from './CameraControls3D';

/**
 * Main 3D Preview Mode using React Three Fiber.
 */
export function ThreeDPreview() {
  const { selectedChassisId, placedComponents, selectedPlacedComponentId, selectComponent } = usePlannerStore();
  const chassis = CHASSIS_DATA.find(c => c.id === selectedChassisId);
  
  if (!chassis) return null;

  return (
    <div className="w-full h-full bg-[#F4F3F0] relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={40} />
        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2.1} 
          enablePan={true}
          dampingFactor={0.05}
        />
        
        {/* Lights */}
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Environment preset="city" />

        <Group x={0} y={0} z={0}>
          {/* Ground Grid */}
          <Grid 
            infiniteGrid 
            fadeDistance={50} 
            cellColor="#E8E6E1" 
            sectionColor="#D1CFCA" 
            cellSize={1} 
            sectionSize={5} 
          />

          {/* Translucent Van Shell */}
          <VanShell3D chassis={chassis} />

          {/* Placed Components as 3D Boxes */}
          {placedComponents.map((pc) => (
            <ComponentBox3D 
              key={pc.instanceId} 
              component={pc} 
              isSelected={selectedPlacedComponentId === pc.instanceId}
              onSelect={() => selectComponent(pc.instanceId)}
              chassis={chassis}
            />
          ))}
        </Group>
      </Canvas>

      {/* 3D Toolbar UI */}
      <CameraControls3D />
      
      {/* Help Overlay */}
      <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-[#E8E6E1] px-4 py-2 rounded-full shadow-sm">
        <Orbit className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-[10px] font-bold text-[#1A1917] uppercase tracking-tighter">Orbit to inspect build</span>
      </div>
    </div>
  );
}

function Group({ children, x, y, z }: any) {
  return <group position={[x, y, z]}>{children}</group>;
}
