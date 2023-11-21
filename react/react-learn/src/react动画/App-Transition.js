import React, { useState } from 'react'
import { Transition } from 'react-transition-group';

const duration = 500;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

export default function App() {
    const [inProp, setInProp] = useState(false);
    return (
        <div>
            <Transition
                in={inProp}
                timeout={duration}
                addEndListener={(node, done) => {
                    console.log(node);
                    // done()
                }}
            >
                {state => {
                    console.log('state', state);
                    return (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            I'm a fade Transition!
                        </div>
                        // ...
                    )
                }}
            </Transition>
            <button onClick={() => setInProp(!inProp)}>
                Click 切换
            </button>
        </div>
    );
}

