import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import type { Group } from "three";

type SceneMode = "hero" | "colosseum" | "giveaways";

function ColosseumModel() {
  return (
    <group>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[2.8, 3.05, 0.28, 64]} />
        <meshStandardMaterial
          color="#26251f"
          metalness={0.75}
          roughness={0.48}
        />
      </mesh>
      {[0, 1, 2].map((tier) => (
        <group key={tier} position={[0, tier * 0.68 - 0.35, 0]}>
          <mesh>
            <cylinderGeometry
              args={[2.45 - tier * 0.22, 2.5 - tier * 0.22, 0.62, 64]}
            />
            <meshStandardMaterial
              color={tier === 2 ? "#735b37" : "#56432b"}
              metalness={0.62}
              roughness={0.58}
            />
          </mesh>
          {Array.from({ length: 16 }, (_, index) => {
            const angle = (index / 16) * Math.PI * 2;
            const radius = 2.47 - tier * 0.22;
            return (
              <group
                key={`${tier}-${index}`}
                position={[
                  Math.sin(angle) * radius,
                  0,
                  Math.cos(angle) * radius,
                ]}
                rotation={[0, angle, 0]}
              >
                <mesh position={[0, -0.015, 0.035]}>
                  <boxGeometry args={[0.23, 0.37, 0.045]} />
                  <meshStandardMaterial color="#17130d" roughness={0.92} />
                </mesh>
                <mesh position={[-0.17, 0, 0.055]}>
                  <boxGeometry args={[0.055, 0.62, 0.09]} />
                  <meshStandardMaterial
                    color="#c19a58"
                    metalness={0.68}
                    roughness={0.4}
                  />
                </mesh>
                <mesh position={[0.17, 0, 0.055]}>
                  <boxGeometry args={[0.055, 0.62, 0.09]} />
                  <meshStandardMaterial
                    color="#c19a58"
                    metalness={0.68}
                    roughness={0.4}
                  />
                </mesh>
                <mesh position={[0, 0.2, 0.055]}>
                  <torusGeometry args={[0.115, 0.045, 6, 12, Math.PI]} />
                  <meshStandardMaterial
                    color="#d6b06b"
                    emissive="#76501d"
                    emissiveIntensity={0.18}
                    metalness={0.62}
                    roughness={0.42}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      ))}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[1.96, 1.99, 0.16, 64]} />
        <meshStandardMaterial
          color="#d5a956"
          metalness={0.78}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2.54, 2.62, 0.13, 64]} />
        <meshStandardMaterial
          color="#b28a4d"
          metalness={0.72}
          roughness={0.38}
        />
      </mesh>
      <mesh position={[0, -0.91, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.85, 0.035, 8, 100]} />
        <meshStandardMaterial
          color="#c8a353"
          emissive="#9e701e"
          emissiveIntensity={0.45}
        />
      </mesh>
    </group>
  );
}

function FloatingProps({ mode }: { mode: SceneMode }) {
  const items = mode === "giveaways" ? [-1.9, 0, 1.9] : [-2.5, 2.5];
  return (
    <>
      {items.map((x, index) => (
        <Float
          key={x}
          speed={0.7 + index * 0.12}
          floatIntensity={0.3}
          rotationIntensity={0.18}
        >
          <mesh
            position={[x, 1.2 + (index % 2) * 0.6, -0.2]}
            rotation={[0.25, 0.45, 0.2]}
          >
            {mode === "giveaways" ? (
              <cylinderGeometry args={[0.35, 0.35, 0.12, 32]} />
            ) : (
              <boxGeometry args={[0.64, 0.16, 0.34]} />
            )}
            <meshStandardMaterial
              color={index % 2 ? "#b8a555" : "#d3a84f"}
              metalness={0.8}
              roughness={0.28}
              emissive={index === 1 ? "#276b37" : "#754b13"}
              emissiveIntensity={0.12}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function AnimatedScene({ mode }: { mode: SceneMode }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x +=
      (state.pointer.y * 0.035 - group.current.rotation.x) * 0.025;
    group.current.rotation.z +=
      (-state.pointer.x * 0.035 - group.current.rotation.z) * 0.025;
  });

  return (
    <group ref={group}>
      <ColosseumModel />
      <FloatingProps mode={mode} />
    </group>
  );
}

export default function ExperienceScene({
  mode = "hero",
  interactive = false,
}: {
  mode?: SceneMode;
  interactive?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (typeof WebGLRenderingContext === "undefined") {
    return (
      <div
        className="scene-fallback"
        aria-label="Bronze Colosseum illustration"
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 1.3, 7.2], fov: 36 }}
      dpr={isMobile ? 1 : [1, 1.4]}
      gl={{ antialias: !isMobile, powerPreference: "low-power", alpha: true }}
      frameloop="always"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={2.1} color="#ffe0a0" />
      <pointLight position={[-4, 1, 2]} intensity={12} color="#cc9134" />
      <pointLight position={[3, -1, -2]} intensity={5} color="#63c36f" />
      <AnimatedScene mode={mode} />
      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.25}
        />
      )}
    </Canvas>
  );
}
