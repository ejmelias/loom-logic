import { useState } from "react";
import { HexColorPicker } from 'react-colorful';

function ColorPicker({ color, onChange }) {

    const [colorHistory, setColorHistory] = useState((Array.from({ length: 13 }).fill('#FFFFFF')));
    const [currentColor, setCurrentColor] = useState('#FFFFFF');
    
    function handleColorChange() {
        const newHistory = [...colorHistory];
        newHistory.pop();
        newHistory.unshift(color);
        setColorHistory(newHistory);
        onChange(currentColor)
        console.log(color)
    }

    return (
        <div>
            <div className='flex justify-center p-5' ><HexColorPicker color={color} onChange={setCurrentColor} onPointerUp={handleColorChange}/></div>
                <div className='flex justify-center' >
                    <div className="grid grid-cols-7 mb-5 max-w-max ">
                    {colorHistory.map((color, i) => (
                        <div 
                            key={i} 
                            className="h-5 w-5 rounded-md m-1 ring-1 ring-gray-300"
                            style={{ backgroundColor: color }}
                            onClick={() => onChange(colorHistory[i])}
                        />
                    ))}
                    <div className="h-5 w-5 rounded-md m-1 bg-white ring-1 ring-gray-300" onClick={() => onChange('#ffffff')}/>
                    </div>
                </div>
        </div>
    );
}

export default ColorPicker;