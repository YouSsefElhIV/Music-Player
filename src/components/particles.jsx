import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesTest = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);
    return (
        <Particles id="tsparticles" url="./particles.json" init={particlesInit}/>
    );
};

export default ParticlesTest
