import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect, act, use } from "react";
import * as THREE from "three";


export default function SceneContent() {
  const group = useRef();
  const FrogRef = useRef();
  const ButterflyRef = useRef();

  // Tous les modèles sont chargés ici
  const { scene: pondScene } = useGLTF("/models/Pond.glb");
  const { scene: dragonflyScene } = useGLTF("/models/Dragonfly.glb");
  const { scene: butterflyScene } = useGLTF("/models/Butterfly.glb");
  const { scene: FrogScene, animations } = useGLTF("/models/Frog.glb");
  const { scene: snailScene } = useGLTF("/models/Snail.glb");
  const { scene: rockScene1 } = useGLTF("/models/Rock.glb");
  const { scene: rockScene2 } = useGLTF("/models/Rock-2.glb");
  const { scene: TwineScene } = useGLTF("/models/Twine.glb");
  const { scene: TwineScene2 } = useGLTF("/models/Twine-2.glb");
  const { scene: Treescene } = useGLTF("/models/Tree-Stump.glb");
  const { scene: WaterliliesScene } = useGLTF("/models/Water-lilies.glb");
  const { scene: StalactitesScene } = useGLTF("/models/Stalactites.glb");
  const { scene: ChestScene } = useGLTF("/models/Chest.glb");
  const { scene: CrystalScene } = useGLTF("/models/Crystal.glb");
  const { scene: animatedbutterflyScene, animationsB } = useGLTF("/models/animated_butterfly.glb");




  const { actions } = useAnimations(animations, FrogRef);
  const { actionsButterfly } = useAnimations(animationsB, ButterflyRef);

  // Animation de la grenouille
  useEffect(() => {
    console.log(actions);
    console.log(actionsButterfly);

    const anim = actions["FrogArmature|Frog_Idle"];
    const anim2 = actionsButterfly["Flying"];
    
    // console.log(actionsButterfly);
    if (anim) {
      anim.setLoop(THREE.LoopRepeat);
      anim.clampWhenFinished = true;
      anim.play();
    }

    if (anim2) {
      anim2.setLoop(THREE.LoopRepeat);
      anim2.clampWhenFinished = true;
      anim2.play();
    }
  }, [actions]);

  const handleClick = () => {
    const idle = actions["FrogArmature|Frog_Idle"];
    const jump = actions["FrogArmature|Frog_Attack"]; // Change selon le nom réel

    if (jump) {
      idle?.fadeOut(0.5);
      jump.reset().fadeIn(0.5).play();

      // Revenir à "Frog_Idle" à la fin de l'animation
      jump.clampWhenFinished = true;
      jump.setLoop(THREE.LoopOnce);

      jump.getMixer().addEventListener("finished", () => {
        jump.fadeOut(0.5);
        idle?.reset().fadeIn(0.5).play();
      });
    }
  };

  return (
    <group ref={group}>
      <primitive object={rockScene1} scale={2000} position={[-100, 0, 200]} rotation={[0, 2.4, 0]} />
      <primitive object={rockScene2} scale={2500} position={[-250, 0, -280]} rotation={[0, -2.6, 0]} />
      <primitive object={TwineScene} scale={80} position={[-100, 250, 134]} rotation={[0, -0.4, -0.5]} />
      <primitive object={TwineScene2} scale={80} position={[-60, 200, 134]} rotation={[0, -0.4, -0.5]} />
      <primitive object={Treescene} scale={1000} position={[-150, 100, 0]} rotation={[0, -2.5, 0]} />
      <primitive object={pondScene} scale={1.5} position={[50, 1, 0]} rotation={[-0.3, 2.4, 0.4]} />
      <primitive object={StalactitesScene} scale={500} position={[-400, 200, 0]} rotation={[0, 1.2, 0]} />
      <primitive object={ChestScene} scale={200} position={[-400, 50, 0]} rotation={[1.5, 1.5, -1.5]} />
      <primitive object={CrystalScene} scale={20} position={[100, 0, 200]} rotation={[0, 1.5, 0]} />

      <primitive object={WaterliliesScene} scale={3} position={[50, 15, -25]} rotation={[-0.3, 2.2, 0.35]} />
      <primitive object={dragonflyScene} scale={10} position={[50, 100, -100]} rotation={[0, 0, -0.5]} />
      <primitive object={butterflyScene} scale={40} position={[40, 150, 150]} rotation={[0, 80, 0]} />
      <primitive object={snailScene} scale={10} position={[195, 5, 35]} rotation={[0, -1.6, -0.5]} />
      <primitive ref={FrogRef} object={FrogScene} scale={8} position={[60, 14, -42]} rotation={[-1, 1.8, 1]} onClick={handleClick} />
      <primitive ref={ButterflyRef} object={animatedbutterflyScene} scale={10} position={[100, 150, -100]} rotation={[0, 0, 0]} />

      {/* Ajout des modèles supplémentaires */}
    </group>
  );
}
