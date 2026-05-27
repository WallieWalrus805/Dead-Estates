import { useEffect, useRef } from "react";
import launch from "../animations/Scene I.mp4";

export function Welcome() {

    return (
        <>
            <video id="Scene_I" autoPlay controls playsInline>
                <source src={launch} type="video/mp4"/>
            </video>
        </>
    );
}