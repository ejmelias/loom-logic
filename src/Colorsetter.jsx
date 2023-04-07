import { useState, useRef } from "react";

function Colorsetter({ draft, currentColor, orient }) {

    const length = colors.length;
    const [isMouseDown, setIsMouseDown] = useState(false);
    const ref = useRef()
    const orientation = {
        vertical: 'grid-flow-row auto-rows-max',
        horizontal: 'grid-flow-col auto-cols-max'
    };
    
    function handleHorizontalMove(event) {
        if (isMouseDown) {
            const col = Math.floor((event.nativeEvent.clientX - ref.current.getBoundingClientRect().left) / 20);
            if(col >= 0 && col < length) {
                const newColors = [...colors];
                newColors[col] = currentColor;
                setColors(newColors);
            }
        }
    }

    function handleVerticalMove(event) {
        if (isMouseDown) {
            const row = Math.floor((event.nativeEvent.clientY - ref.current.getBoundingClientRect().top) / 20);
            if(row < length) {
                const newColors = [...colors];
                newColors[row] = currentColor;
                setColors(newColors);
            }
        }
    }
    
    function handleClick(id) {
        const newColors = [...colors];
        newColors[id] = currentColor;
        setColors(newColors);
    };

    return (
        <div className={`${orientation[orient]} max-w-max m-2 grid border border-black`} 
            onPointerDown={() => setIsMouseDown(true)}
            onPointerUp={() => setIsMouseDown(false)}
            onPointerMove={orient === 'horizontal' ? handleHorizontalMove : handleVerticalMove}
            onPointerLeave={() => {setIsMouseDown(false)}}
            ref={ref}
        >
            {colors.map((cell, i) => (
                <div 
                    key={i}
                    className={'border-black border-[0.5px] hover:ring-4 hover:ring-blue-500/75 hover:z-50 w-5 h-5'}
                    style={{ backgroundColor: cell}}
                    onClick={()=>handleClick(i)}
                />
            ))}
        </div>
    );
}

export default Colorsetter;