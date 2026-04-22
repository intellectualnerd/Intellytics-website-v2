
import React, { useEffect } from 'react';
import './LoaderAnimation.css';
import { hatch } from 'ldrs';
const LoaderAnimation = () => {
    useEffect(() => {
        hatch.register()
        // Register the l-cardio component
    }, []);
    return (
        <>
            <div className='body'>
                <l-hatch
                    size="90"
                    bg-opacity="0.1"
                    speed="3"
                    stroke="20"
                    color="#FFEB7A"
                ></l-hatch>
            </div>
        </>

    );
};



export default LoaderAnimation;
