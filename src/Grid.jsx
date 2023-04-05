import { useState, useRef } from "react";

function Grid({ data, setData, multi, type, isEmpty, setIsEmpty }) 
{
    const numRows = data.length;
    const numCols = data[0].length;
    /*
    const [isMouseDown, setIsMouseDown] = useState(false);
    const ref = useRef();

    function handleMouseMove(event) {
        if (isMouseDown) {
            const col = Math.floor((event.nativeEvent.clientX - ref.current.getBoundingClientRect().left) / 20);
            const row = Math.floor((event.nativeEvent.clientY - ref.current.getBoundingClientRect().top) / 20);
            if(col >=0 && col < numCols && row >= 0 && row < numRows) {
                const updatedCells = [...data];
                updatedCells[row][col] = 1
                if(type === 'threading') {
                    for(let i = 0; i < numRows; i++) {
                        if(i !== row) {
                            updatedCells[i][col] = 0;
                        }
                    }
                }
                setData(updatedCells);
            }
        }
    }
    */

    function handleCellClick(id) {
        const updatedCells = [...data];
        if(type === 'threading') {
            for(let i = 0; i < numRows; i++) {
                if(i !== id[0]) {
                    updatedCells[i][id[1]] = 0;
                }
            }
        } else if(type === 'pedalling' && !multi) {
            for(let i = 0; i < numCols; i++) {
                if(i !== id[1]) {
                    updatedCells[id[0]][i] = 0;
                }
            }
        }
        if(updatedCells[id[0]][id[1]] === 0) {
            updatedCells[id[0]][id[1]] = 1
        } else {
            updatedCells[id[0]][id[1]] = 0
        }
        if(type === 'pedalling') {
            const newEmptyArray = [...isEmpty]
            let empty = true;
            for(let i = 0; i < numCols; i++) {
                if(updatedCells[id[0]][i] != 0) {
                    empty = false;
                }
            }
            if(!empty) {
                newEmptyArray[id[0]] = false;
            } else { 
                newEmptyArray[id[0]] = true;
            }
            setIsEmpty(newEmptyArray);
        }
        setData(updatedCells);
    }

    return (
        <div className='max-w-max m-2 grid grid-flow-row auto-rows-max border border-black '

        >
            {data.map((row, i) => (
                <div key={i} className="grid grid-flow-col auto-cols-max">
                    {row.map((cell, j) => (
                        <div 
                            key={[i,j]}
                            className={`w-5 h-5 border-black border-[0.5px] hover:ring-4 hover:ring-blue-500/75 hover:z-50 ${cell === 1 ? 'bg-black' : 'bg-white'}`}
                            onClick={() => handleCellClick([i,j])}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;