import {
  Center,
  Cylinder,
  PositionalAudio,
  Text3D,
  useFont,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Object3D, type DirectionalLight } from "three";

const newShade = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};
export const Scene1 = () => {
  const font = useFont("fonts/mont.json");
  const dirLight = useRef<DirectionalLight>(null);

  const triangleRef = useRef<Object3D>(null);

  const adText = `  Elevate Your Digital Horizon with Hilo Labs
  At Hilo Labs, we don't just build software; we architect the digital future.
  
  Our mission is to empower the technology pioneers of tomorrow with state-of-the-art digital solutions,
  meticulously crafted to propel your success. 

  In a world where technology evolves at lightning speed, Hilo Labs stands as your steadfast partner in innovation.
  
  We specialize in creating not just software, but a seamless, intuitive experience that resonates with your users 
  and exceeds your expectations.
  
`;
  useFrame((state, delta) => {
    if (triangleRef.current) {
      triangleRef.current.rotation.y += delta;
    }
  });

  const audioRef = useRef();

  const lastClickDebounce = useRef(0);
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        color={"#FFFFFF"}
        intensity={3}
        position={[-3, 3, 3]}
        ref={dirLight}
      />
      <PositionalAudio
        url="/ad.mp3"
        ref={audioRef}
        loop={true}
        distance={1000}
      />
      <Center>
        <Center position={[0, 0.5, 0]}>
          <Text3D
            position={[0, 1.4, 0]}
            height={0.01}
            size={1}
            font={font.data}
            rotation={[0, 0, 0]}
            letterSpacing={-0.05}
            bevelThickness={10}
            bevelSize={8}
            bevelOffset={0}
            bevelSegments={5}
          >
            <meshStandardMaterial color={"#54b5b7"} />
            Hilo
          </Text3D>
          <Text3D
            position={[2.5, 1.4, 0]}
            height={0.01}
            size={1}
            font={font.data}
            rotation={[0, 0, 0]}
            letterSpacing={-0.05}
            bevelThickness={10}
            bevelSize={8}
            bevelOffset={0}
            bevelSegments={5}
          >
            Labs
          </Text3D>

          <Text3D
            position={[0, 1, 0]}
            height={0.03}
            size={0.09}
            font={font.data}
            rotation={[0, 0, 0]}
            bevelThickness={10}
            bevelSize={8}
            bevelOffset={0}
            bevelSegments={5}
          >
            <meshBasicMaterial color={"#FFFFFF"} />
            {adText}
          </Text3D>
        </Center>
        <group
          onClick={(event) => {
            if (!audioRef.current) return;
            if (Date.now() - lastClickDebounce.current < 300) {
              return;
            }

            if (audioRef.current.isPlaying) {
              audioRef.current.stop();
            } else {
              audioRef.current.play();
            }
            lastClickDebounce.current = Date.now();
          }}
          ref={triangleRef}
          onPointerEnter={(event) => {
            if (!triangleRef.current) return;
            // darken the triangle
            triangleRef.current.children[1].material.color = new Color(
              newShade("#54b5b7", -50),
            );
            triangleRef.current.children[2].material.color = new Color(
              newShade("#FFFFFF", -50),
            );
          }}
          onPointerLeave={(event) => {
            if (!triangleRef.current) return;
            if (triangleRef.current) {
              triangleRef.current.children[1].material.color = new Color(
                "#54b5b7",
              );
              triangleRef.current.children[2].material.color = new Color(
                "#FFFFFF",
              );
            }
          }}
        >
          <Text3D
            position={[-0.25, -1.3, 0]}
            height={0.03}
            size={0.09}
            font={font.data}
            rotation={[0, 0, 0]}
            bevelThickness={10}
            bevelSize={8}
            bevelOffset={0}
            bevelSegments={5}
          >
            click me
          </Text3D>
          <Cylinder position={[0, -1.9, 0]} args={[0.1, 1, 1, 3]}>
            <meshStandardMaterial color={"#54b5b7"} />
          </Cylinder>
          <Cylinder position={[0, -2.2, 0]} args={[0.1, 1.5, 1.5, 3]}>
            <meshStandardMaterial color={"#FFFFFF"} />
          </Cylinder>
        </group>
      </Center>
    </>
  );
};
