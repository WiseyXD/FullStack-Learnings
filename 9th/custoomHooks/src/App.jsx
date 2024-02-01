import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function useInterval(cb, interval) {
    useEffect(() => {
        const timer = setInterval(cb, interval);
        return () => {
            clearInterval(timer);
        };
    }, [cb, interval]);
}

function useDebounce(value, interval) {
    const [debounceVal, setDebounceVal] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceVal(value);
        }, interval);

        return () => {
            clearTimeout(timer);
        };
    }, [value, interval]);

    return debounceVal;
}

function App() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState("");

    const debouncedValue = useDebounce(input, 500);

    useEffect(() => {
        // Make api call on the debouced value
        console.log(debouncedValue);
    }, []);

    return (
        <>
            {count}
            <form action="#">
                <input type="text" onChange={(e) => setInput(e.target.value)} />
            </form>
        </>
    );
}
export default App;
