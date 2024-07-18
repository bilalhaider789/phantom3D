import { useState, useRef, useEffect, act } from "react";
import "./App.css";
import {
  ScrollControls,
  Scroll,
  Environment,
  Sparkles,
  Float,
  Backdrop,
  Ring,
  useProgress,
} from "@react-three/drei";
import { Phantom } from "./components/Phantoms";
import { Canvas } from "@react-three/fiber";
function App() {
  const [show3DContent, setShow3DContent] = useState(true);
  const scrollRef = useRef();
  const scrollControlsRef = useRef();
  const { active, progress } = useProgress();

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    const maxScroll =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

    const scrollOffset = scrollTop / maxScroll;
    if (scrollControlsRef.current) {
      scrollControlsRef.current.scroll.current = scrollOffset;
    }

    if (scrollTop >= maxScroll - 100) {
      setShow3DContent(false);
    } else {
      setShow3DContent(true);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="relative h-screen overflow-y-scroll bg-[#171F20]"
    >
      <nav className="sticky top-0 z-50 bg-transparent p-4 text-white flex justify-between items-center">
        <div className="text-lg font-bold">Phantom</div>
      </nav>
      {active && <div className="w-full h-full text-[70px] flex justify-center items-center">Loading ...</div>}
      {!active && <div className="h-full">
        <Canvas>
          <color attach={"background"} args={["#333333"]} />
          <ambientLight intensity={0.2} />
          <spotLight
            position={[0, 25, 0]}
            angle={1.3}
            penumbra={1}
            castShadow
            intensity={0.2}
          />
          <Environment preset="warehouse" />
          <ScrollControls ref={scrollControlsRef} pages={6} damping={0.1}>
            <Phantom scale={0.8} />
            <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles>
            <Backdrop
              receiveShadow
              floor={20.5}
              segments={100}
              scale={[50, 30, 10]}
              position={[4, -10, 0]}
            >
              <meshStandardMaterial color="#0a1a1f" />
            </Backdrop>

            <Float
              speed={4}
              rotationIntensity={0.5}
              floatIntensity={1}
              floatingRange={[1, 1]}
            >
              <Ring
                scale={3.5}
                position-z={-2.5}
                position-y={-1}
                args={[0, 0.95, 60]}
                receiveShadow
              >
                <meshStandardMaterial color="#2a3a3f" />
              </Ring>
            </Float>

            <Scroll></Scroll>
            <Scroll html style={{ width: "100%" }}>
              <h1 className="title text-[13em] absolute top-[65vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#cdcbca]">
                PHANTOM
              </h1>

              <div className=" absolute top-[132vh] px-[40px] w-full">
                <h2>Be a Man of the Future.</h2>
                <p className="max-w-[400px] text-[20px]">
                  Featuring a sleek, metallic design inspired by advanced
                  technology, this aftershave bottle is as stylish as it is
                  functional. But it's not just a pretty face - inside, you'll
                  find a nourishing and protective aftershave formula that will
                  leave your skin feeling refreshed and hydrated.
                </p>
              </div>

              <div className=" absolute top-[230vh] px-[40px] w-full">
                <div className=" absolute right-[40px] w-[540px]">
                  <h2 className="max-w-[440px]">Tech-Savvy Side</h2>
                  <p className="max-w-[440px] text-[20px]">
                    Featuring a sleek, metallic design inspired by advanced
                    technology, this aftershave bottle is as stylish as it is
                    functional. But it's not just a pretty face - inside, you'll
                    find a nourishing and protective aftershave formula that
                    will leave your skin feeling refreshed and hydrated.
                  </p>
                </div>
              </div>

              <h2 className="absolute top-[350vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Cutting-Edge of Grooming
              </h2>

              <button className="absolute top-[590vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Phantom
              </button>
            </Scroll>
          </ScrollControls>
        </Canvas>
        <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#1A2224]">
          <p className="text-[50px]">Made by Bilal Haider</p>
          <button
            className="mt-10"
            onClick={() =>
              window.open(
                "https://github.com/bilalhaider789/phantom3D",
                "_blank"
              )
            }
          >
            Get Code
          </button>
          <div className=" mt-16 flex gap-6 text-[30px]">
            <p>Three.js </p>
            <p>React-Fiber </p>
            <p>React-Drei </p>
            <p>Gsap</p>
            <p>Tailwind</p>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
