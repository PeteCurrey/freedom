import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { VehicleGeometryVariant, mmToSceneUnits } from '@/lib/data/vehicleGeometryData';

export type BuildModule = {
  id: string;
  name: string;
  type: "bed" | "kitchen" | "seating" | "storage" | "bathroom" | "garage" | "bulkhead";
  dimensionsMm: [number, number, number]; // [width, height, depth]
  positionMm: [number, number, number]; // relative to vehicle floor rear center [x, y, z]
  weightKg: number;
};

export type SystemComponent = {
  id: string;
  name: string;
  type: "battery" | "solar" | "tank" | "inverter" | "heater" | "fridge" | "gas-locker" | "light-strip" | "window" | "awning" | "rack";
  dimensionsMm: [number, number, number];
  positionMm: [number, number, number];
  weightKg: number;
  color?: string;
};

interface SystemRendererProps {
  systems: SystemComponent[];
}

const SystemRenderer = ({ systems }: SystemRendererProps) => {
  return (
    <group>
      {systems.map((sys) => {
        const [w, h, d] = sys.dimensionsMm.map(mmToSceneUnits);
        const [x, y, z] = sys.positionMm.map(mmToSceneUnits);
        
        const colors = {
          battery: "#ff6b00",
          solar: "#00aaff",
          tank: "#00ffcc",
          inverter: "#ffcc00",
          heater: "#ff3300",
          fridge: "#ffffff",
          "gas-locker": "#444444",
          "light-strip": sys.color || "#ffffff",
          window: "#111111",
          awning: "#222222",
          rack: "#333333"
        };

        if (sys.type === "window") {
          return (
            <mesh key={sys.id} position={[x, y + h/2, z]}>
              <boxGeometry args={[w, h, d]} />
              <meshPhysicalMaterial 
                color="#000" 
                transmission={0.9}
                thickness={0.1}
                roughness={0}
                opacity={0.9}
                transparent
              />
            </mesh>
          );
        }

        if (sys.type === "light-strip") {
          return (
            <mesh key={sys.id} position={[x, y, z]}>
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial 
                color={colors["light-strip"]} 
                emissive={colors["light-strip"]}
                emissiveIntensity={2}
              />
            </mesh>
          );
        }

        return (
          <mesh key={sys.id} position={[x, y + h/2, z]}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial 
              color={colors[sys.type] || "#ffffff"} 
              emissive={colors[sys.type]}
              emissiveIntensity={0.2}
            />
            <Edges color="#fff" />
          </mesh>
        );
      })}
    </group>
  );
};

interface LayoutRendererProps {
  modules: BuildModule[];
}

const LayoutRenderer = ({ modules }: LayoutRendererProps) => {
  return (
    <group>
      {modules.map((module) => {
        const [w, h, d] = module.dimensionsMm.map(mmToSceneUnits);
        const [x, y, z] = module.positionMm.map(mmToSceneUnits);
        
        // Colors based on category
        const colors = {
          bed: "#8884d8",
          kitchen: "#82ca9d",
          seating: "#ffc658",
          storage: "#ff7300",
          bathroom: "#0088fe",
          garage: "#444",
          bulkhead: "#222"
        };

        return (
          <mesh key={module.id} position={[x, y + h/2, z]}>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial 
              color={colors[module.type] || "#ffffff"} 
              transparent 
              opacity={0.8}
              roughness={0.5}
            />
            <Edges color="#fff" threshold={15} />
          </mesh>
        );
      })}
    </group>
  );
};

interface ThreeDViewerProps {
  vehicle: VehicleGeometryVariant;
  mode?: "Exterior Ghost" | "Interior Build Envelope" | "Floor Plan" | "Roof Plan" | "Payload View" | "System X-Ray";
  layoutModules?: BuildModule[];
  systemComponents?: SystemComponent[];
}

const VehicleSilhouette = ({ vehicle, mode, layoutModules = [], systemComponents = [] }: ThreeDViewerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isXRay = mode === "System X-Ray";
  
  // Calculate scaled dimensions
  const length = mmToSceneUnits(vehicle.exteriorLengthMm);
  const width = mmToSceneUnits(vehicle.exteriorWidthMm);
  const height = mmToSceneUnits(vehicle.exteriorHeightMm);
  
  const loadLength = mmToSceneUnits(vehicle.loadLengthMm);
  const loadWidth = mmToSceneUnits(vehicle.loadWidthMm);
  const loadHeight = mmToSceneUnits(vehicle.loadHeightMm);
  const wheelbase = mmToSceneUnits(vehicle.wheelbaseMm || 0);
  const interiorOffset = mmToSceneUnits(vehicle.interiorOffsetMm);

  const zPosOffset = - (length / 2) + (length - interiorOffset - loadLength);

  return (
    <group position={[0, 0, 0]}>
      {/* Exterior Shell */}
      {(mode === "Exterior Ghost" || isXRay || mode === "Payload View" || !mode) && (
        <mesh position={[0, height / 2, zPosOffset + (length/2)]} ref={meshRef}>
          <boxGeometry args={[width, height, length]} />
          <meshPhysicalMaterial 
            color="#1a1a1a" 
            transparent 
            opacity={mode === "Payload View" ? 0.8 : isXRay ? 0.05 : 0.15} 
            roughness={0.2} 
            metalness={0.8}
            transmission={mode === "Payload View" ? 0.1 : 0.5}
            thickness={0.5}
          />
          <Edges 
            scale={1.001} 
            threshold={15} 
            color={isXRay ? "#333" : "#ff6b00"} 
          />
        </mesh>
      )}

      {/* Interior Build Envelope */}
      {(mode === "Interior Build Envelope" || mode === "Floor Plan" || isXRay) && (
        <mesh position={[0, loadHeight / 2 + 0.01, -loadLength / 2]}>
          <boxGeometry args={[loadWidth, loadHeight, loadLength]} />
          <meshBasicMaterial 
            color="#4a4a4a" 
            transparent 
            opacity={0.05} 
            wireframe 
          />
        </mesh>
      )}

      {/* Floor Grid / Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -loadLength / 2]}>
        <planeGeometry args={[loadWidth, loadLength]} />
        <meshStandardMaterial color="#111" transparent opacity={isXRay ? 0.3 : 1} />
      </mesh>
      
      {/* Wheels approximation */}
      <group position={[0, 0, 0]}>
        {[-1, 1].map((side) => (
          <React.Fragment key={side}>
            <mesh 
              position={[
                side * (width / 2 - 0.1), 
                0.3, 
                -loadLength - 0.5
              ]} 
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
              <meshBasicMaterial color="#222" />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* Layout Modules */}
      <group position={[0, 0, -loadLength]}>
        <group>
          {layoutModules.map((module) => {
            const [w, h, d] = module.dimensionsMm.map(mmToSceneUnits);
            const [x, y, z] = module.positionMm.map(mmToSceneUnits);
            const colors = {
              bed: "#8884d8", kitchen: "#82ca9d", seating: "#ffc658",
              storage: "#ff7300", bathroom: "#0088fe", garage: "#444", bulkhead: "#222"
            };
            return (
              <mesh key={module.id} position={[x, y + h/2, z]}>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial 
                  color={colors[module.type] || "#ffffff"} 
                  transparent 
                  opacity={isXRay ? 0.1 : 0.8}
                  roughness={0.5}
                />
                <Edges color="#fff" threshold={15} opacity={isXRay ? 0.2 : 1} transparent />
              </mesh>
            );
          })}
        </group>
        
        {/* Systems logic */}
        <SystemRenderer systems={systemComponents} />
      </group>
    </group>
  );
};

export function ThreeDViewer({ vehicle, mode = "Exterior Ghost", layoutModules = [], systemComponents = [] }: ThreeDViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-brand-obsidian/40 relative rounded-lg overflow-hidden blueprint-border">
      {/* Overlay Information */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="font-display text-xl text-white uppercase tracking-tighter mb-1">{vehicle.displayName}</h3>
        <p className="font-mono text-[10px] text-brand-orange uppercase tracking-widest">{vehicle.dimensionConfidence} Dimensions</p>
      </div>

      <div className="absolute bottom-4 left-4 z-10 pointer-events-none space-y-1">
        <div className="flex gap-4">
          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Ext L: {vehicle.exteriorLengthMm}mm</span>
          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Ext W: {vehicle.exteriorWidthMm}mm</span>
          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Ext H: {vehicle.exteriorHeightMm}mm</span>
        </div>
        <div className="flex gap-4">
          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Int L: {vehicle.loadLengthMm}mm</span>
          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Int W: {vehicle.loadWidthMm}mm</span>
          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Int H: {vehicle.loadHeightMm}mm</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <span className="px-2 py-1 bg-brand-orange/20 border border-brand-orange text-brand-orange font-mono text-[9px] uppercase tracking-widest">
          {mode}
        </span>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [5, 4, 2], fov: 50 }}>
        {mode === "System X-Ray" ? (
          <>
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 2, -2]} intensity={0.5} color="#ff6b00" />
          </>
        ) : (
          <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
          </>
        )}
        
        <VehicleSilhouette vehicle={vehicle} mode={mode} layoutModules={layoutModules} systemComponents={systemComponents} />
        
        <Grid 
          infiniteGrid 
          fadeDistance={20} 
          sectionColor="#333" 
          cellColor="#222" 
          position={[0, -0.01, 0]} 
        />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} />
      </Canvas>
    </div>
  );
}
