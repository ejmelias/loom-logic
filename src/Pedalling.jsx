function Pedalling({ draft, updateDraft, currentColor, multi }) {

    function handleColorClick(id) {
        updateDraft(draft => {draft.PedalColors[id] = currentColor});
    }

    function handleThreadClick(id) {
        updateDraft(draft => {
            
            if(!multi) {
                for(let i = 0; i < draft.Pedalling[0].length; i++) {
                    if(i !== id[1]) {
                        draft.Pedalling[id[0]][i] = 0;
                    }
                }
            }
            if(draft.Pedalling[id[0]][id[1]] === 0) {
                draft.Pedalling[id[0]][id[1]] = 1;
            } else {
                draft.Pedalling[id[0]][id[1]] = 0;
            }
        });
    }

    return (
        <div>
            <div className="grid-flow-row auto-rows-max max-w-max m-2 grid border border-black">
                {draft.PedalColors.map((cell, i) => (
                    <div 
                        key={i}
                        className={'border-black border-[0.5px] hover:ring-4 hover:ring-blue-500/75 hover:z-50 w-5 h-5'}
                        style={{ backgroundColor: cell}}
                        onClick={()=>handleColorClick(i)}
                    />
                ))}
            </div>
            <div className='max-w-max m-2 grid grid-flow-row auto-rows-max border border-black '>
                {draft.Pedalling.map((row, i) => (
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
export default Pedalling;