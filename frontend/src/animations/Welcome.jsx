import { useEffect, useRef } from "react";
import launch from "../assets/audio/launch.mp3";

export function Welcome() {
    const audioRef = useRef(null);

    useEffect(() => {
        const handleUserInteraction = () => {
            audioRef.current.play();
            document.removeEventListener("click", handleUserInteraction);
        };

        document.addEventListener("click", handleUserInteraction);

        return () => {
            document.removeEventListener("click", handleUserInteraction);
        };
    }, []);

    return <audio ref={audioRef} src={launch} />;
}