import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // still imported but used differently

class ParticleBackground extends React.PureComponent {
  particlesInit = async (engine) => {
    // For v2, loadFull might not exist or work differently
    // Instead, just initialize particles normally
    // If you want, you can import presets manually

    // Example: await loadFull(engine); // only if loadFull exists in your version
  };

  render() {
    return (
      <Particles
        id="tsparticles"
        init={this.particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#000" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: { min: 1, max: 5 } },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              outMode: "bounce",
            },
            links: {
              enable: true,
              distance: 150,
              color: "#000",
              opacity: 0.4,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    );
  }
}

export default ParticleBackground;
