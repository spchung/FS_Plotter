import {useState, useEffect} from 'react';

// Just a function that calculates the height of the user screen -> only used by view.js to determine how tall the graph element needs to be 

function getWindowDimensions(){
    const { innerWidth: width, innerHeight: height } = window;
    return{
        width,
        height
    };
};

export default function useWindowDimensions(){
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}