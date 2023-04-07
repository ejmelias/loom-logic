function Tieup({ draft, updateDraft }) {


    function handleTieupClick(id) {
        updateDraft(draft => {
            if(draft.Tieup[id[0]][id[1]] === 0) {
                draft.Tieup[id[0]][id[1]] = 1;
            } else {
                draft.Tieup[id[0]][id[1]] = 0;
            }
        });
    }

    return (
        <div>
            <div className='max-w-max m-2 grid grid-flow-row auto-rows-max border border-black '>
                {draft.Tieup.map((row, i) => (
                    <div key={i} className="grid grid-flow-col auto-cols-max">
                        {row.map((cell, j) => (
                            <div 
                                key={[i,j]}
                                className={`w-5 h-5 border-black border-[0.5px] hover:ring-4 hover:ring-blue-500/75 hover:z-50 ${cell === 1 ? 'bg-black' : 'bg-white'}`}
                                onClick={() => handleTieupClick([i,j])}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Tieup;