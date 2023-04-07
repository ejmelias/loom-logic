import { useState, useRef } from "react";

function Threading({ draft, updateDraft, currentColor }) {

    const [isMouseDown, setIsMouseDown] = useState(false);
    const colorRef = useRef()

    function handleColorDrag(event) {
        if (isMouseDown) {
            const col = Math.floor((event.nativeEvent.clientX - colorRef.current.getBoundingClientRect().left) / 20);
            if(col >= 0 && col < draft.ThreadColors.length) {
                updateDraft(draft => { draft.ThreadColors[col] = currentColor });
            }
        }
    }

    function handleColorClick(id) {
        updateDraft(draft => {draft.ThreadColors[id] = currentColor});
    }

    function handleThreadClick(id) {
        updateDraft(draft => {
            for(let i = 0; i < draft.Threading.length; i++) {
                if(i !== id[0]) {
                    draft.Threading[i][id[1]] = 0;
                }
            }
            if(draft.Threading[id[0]][id[1]] === 0) {
                draft.Threading[id[0]][id[1]] = 1;
            } else {
                draft.Threading[id[0]][id[1]] = 0;
            }
        });
    }

    return (
        <div>
            <div className="grid-flow-col auto-cols-max max-w-max m-2 grid border border-black"
                onPointerDown={() => setIsMouseDown(true)}
                onPointerUp={() => setIsMouseDown(false)}
                onPointerMove={handleColorDrag}
                onPointerLeave={() => {setIsMouseDown(false)}}
                ref={colorRef}
            >
                {draft.ThreadColors.map((cell, i) => (
                    <div 
                        key={i}
                        className={'border-black border-[0.5px] hover:ring-4 hover:ring-blue-500/75 hover:z-50 w-5 h-5'}
                        style={{ backgroundColor: cell}}
                        onClick={()=>handleColorClick(i)}
                    />
                ))}
            </div>
            <div className='max-w-max m-2 grid grid-flow-row auto-rows-max border border-black '>
                {draft.Threading.map((row, i) => (
                    <div key={i} className="grid grid-flow-col auto-cols-max">
                        {row.map((cell, j) => (
                            <div 
                                key={[i,j]}
                                className={`w-5 h-5 border-black border-[0.5px] hover:ring-4 hover:ring-blue-500/75 hover:z-50 ${cell === 1 ? 'bg-black' : 'bg-white'}`}
                                onClick={() => handleThreadClick([i,j])}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Threading;