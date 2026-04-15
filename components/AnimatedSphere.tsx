"use client";

import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import type { Group } from "three";
import { AdditiveBlending, MathUtils } from "three";

// Main tweak points:
// - CAMERA_Z controls how close the camera frames the sphere.
// - ROTATION_SPEED controls the base spin rate.
// - point counts / sizes / opacities control density and overall polish.
// - pointer tilt values control how much the sphere responds to cursor movement.
const CAMERA_Z = 3.55;
const ROTATION_SPEED = 0.1;
const PRIMARY_POINT_COUNT = 6800;
const SECONDARY_POINT_COUNT = 2600;
const HALO_POINT_COUNT = 1200;
const RIM_POINT_COUNT = 720;
const POINTER_TILT_X = 0.17;
const POINTER_TILT_Y = 0.16;
const POINTER_TILT_Z = 0.11;

type ParticleLayerProps = {
  colors: Float32Array;
  opacity: number;
  positions: Float32Array;
  size: number;
  useAdditiveBlend?: boolean;
};

type AnimatedSphereProps = {
  className?: string;
  size?: "mobile" | "desktop";
};

function buildShell(
  count: number,
  radius: number,
  variance: number,
  minShade: number,
  maxShade: number
) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const horizontalRadius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const shellRadius = radius + (Math.random() - 0.5) * variance;
    const equatorBias = 1 + Math.sin(theta * 0.5) * 0.04 * (1 - Math.abs(y));

    const x = Math.cos(theta) * horizontalRadius * shellRadius * equatorBias;
    const z = Math.sin(theta) * horizontalRadius * shellRadius * equatorBias;
    const yPosition = y * shellRadius * 1.04;

    positions[i * 3] = x;
    positions[i * 3 + 1] = yPosition;
    positions[i * 3 + 2] = z;

    const latitudeGlow = (1 - Math.abs(y)) * 0.1;
    const highlight = Math.random() > 0.925 ? 0.14 : 0;
    const shade = MathUtils.clamp(
      minShade +
        Math.random() * (maxShade - minShade) +
        latitudeGlow +
        highlight,
      0,
      1
    );
    colors[i * 3] = shade;
    colors[i * 3 + 1] = shade;
    colors[i * 3 + 2] = shade;
  }

  return { positions, colors };
}

function ParticleLayer({
  colors,
  opacity,
  positions,
  size,
  useAdditiveBlend = false,
}: ParticleLayerProps) {
  return (
    <Points
      colors={colors}
      frustumCulled={false}
      positions={positions}
      stride={3}
    >
      <PointMaterial
        blending={useAdditiveBlend ? AdditiveBlending : undefined}
        depthWrite={false}
        opacity={opacity}
        size={size}
        sizeAttenuation
        transparent
        vertexColors
      />
    </Points>
  );
}

function DigitalSphere({
  pointerTarget,
}: {
  pointerTarget: MutableRefObject<{ x: number; y: number }>;
}) {
  const shellGroupRef = useRef<Group>(null);
  const outerGroupRef = useRef<Group>(null);
  const innerGroupRef = useRef<Group>(null);

  const primaryShell = useMemo(
    () => buildShell(PRIMARY_POINT_COUNT, 1.03, 0.045, 0.62, 0.9),
    []
  );
  const secondaryShell = useMemo(
    () => buildShell(SECONDARY_POINT_COUNT, 0.84, 0.04, 0.48, 0.72),
    []
  );
  const haloShell = useMemo(
    () => buildShell(HALO_POINT_COUNT, 1.15, 0.08, 0.62, 0.88),
    []
  );
  const rimShell = useMemo(
    () => buildShell(RIM_POINT_COUNT, 1.06, 0.025, 0.78, 1),
    []
  );

  useFrame((state, delta) => {
    if (!shellGroupRef.current || !outerGroupRef.current || !innerGroupRef.current) {
      return;
    }

    const smoothing = 1 - Math.exp(-delta * 3.4);
    const targetRotationX = pointerTarget.current.y * POINTER_TILT_X;
    const targetRotationY = pointerTarget.current.x * POINTER_TILT_Y;
    const targetRotationZ = pointerTarget.current.x * -POINTER_TILT_Z;
    const targetY =
      Math.sin(state.clock.elapsedTime * 0.55) * 0.035 +
      pointerTarget.current.y * -0.03;

    shellGroupRef.current.rotation.x = MathUtils.lerp(
      shellGroupRef.current.rotation.x,
      targetRotationX,
      smoothing
    );
    shellGroupRef.current.rotation.y = MathUtils.lerp(
      shellGroupRef.current.rotation.y,
      targetRotationY,
      smoothing
    );
    shellGroupRef.current.rotation.z = MathUtils.lerp(
      shellGroupRef.current.rotation.z,
      targetRotationZ,
      smoothing
    );
    shellGroupRef.current.position.y = MathUtils.lerp(
      shellGroupRef.current.position.y,
      targetY,
      smoothing
    );

    outerGroupRef.current.rotation.y += delta * ROTATION_SPEED;
    outerGroupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.14;

    innerGroupRef.current.rotation.y -= delta * ROTATION_SPEED * 0.4;
    innerGroupRef.current.rotation.z =
      Math.cos(state.clock.elapsedTime * 0.2) * 0.07;
  });

  return (
    <group ref={shellGroupRef} scale={[0.84, 0.89, 0.84]}>
      <mesh scale={0.95}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#181818"
          emissive="#2a2a2a"
          emissiveIntensity={0.58}
          metalness={0.06}
          opacity={0.92}
          roughness={0.82}
          transparent
        />
      </mesh>

      <group ref={outerGroupRef}>
        <ParticleLayer
          colors={primaryShell.colors}
          opacity={0.96}
          positions={primaryShell.positions}
          size={0.0215}
        />
        <ParticleLayer
          colors={secondaryShell.colors}
          opacity={0.38}
          positions={secondaryShell.positions}
          size={0.0175}
        />
        <ParticleLayer
          colors={rimShell.colors}
          opacity={0.26}
          positions={rimShell.positions}
          size={0.028}
          useAdditiveBlend
        />
        <ParticleLayer
          colors={haloShell.colors}
          opacity={0.16}
          positions={haloShell.positions}
          size={0.034}
          useAdditiveBlend
        />
      </group>

      <group ref={innerGroupRef}>
        <mesh scale={0.98}>
          <sphereGeometry args={[1, 34, 34]} />
          <meshBasicMaterial
            color="#d8d8d8"
            opacity={0.05}
            transparent
            wireframe
          />
        </mesh>
      </group>
    </group>
  );
}

export default function AnimatedSphere({
  className = "",
  size = "mobile",
}: AnimatedSphereProps) {
  const pointerTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;

      pointerTarget.current.x = MathUtils.clamp(normalizedX * 1.25, -0.42, 0.42);
      pointerTarget.current.y = MathUtils.clamp(normalizedY * 1.25, -0.42, 0.42);
    };

    const resetPointer = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
    };
  }, []);

  const sizeClasses =
    size === "desktop"
      ? "h-[300px] w-[320px] xl:h-[340px] xl:w-[360px] 2xl:h-[360px] 2xl:w-[390px]"
      : "mx-auto h-[220px] w-[220px] sm:h-[244px] sm:w-[244px]";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative overflow-visible ${sizeClasses} ${className}`.trim()}
    >
      <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_28%,rgba(255,255,255,0.015)_48%,transparent_74%)] blur-[64px]" />
      <div className="absolute inset-[-4%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.05)_34%,transparent_72%)] blur-3xl" />
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(255,255,255,0.08),transparent_62%)] blur-2xl" />

      <Canvas
        camera={{ fov: 34, position: [0, 0, CAMERA_Z] }}
        dpr={[1, 1.8]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.95} />
        <hemisphereLight
          color="#d4d4d4"
          groundColor="#141414"
          intensity={0.55}
        />
        <directionalLight intensity={2.15} position={[2.2, 1.7, 3.4]} />
        <pointLight color="#cfcfcf" intensity={1.45} position={[-2, -1.2, -2.1]} />
        <DigitalSphere pointerTarget={pointerTarget} />
        <Preload all />
      </Canvas>

      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_center,transparent_58%,rgba(18,18,18,0.5)_100%)]" />
    </div>
  );
}
