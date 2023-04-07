
function Pattern({ data, grid, pedalColors, threadColors, isEmpty }) { 

    return (
        <div>
            <div className='max-w-max m-2 grid grid-flow-row auto-rows-max border border-black'>
                {data.map((row, i) => (
                    <div key={i} className="grid grid-flow-col auto-cols-max">
                        {row.map((cell, j) => (
                            <div className={`h-5 w-5 ${grid ? "border-[0.5px]" : ""}`}
                                key={[i,j]}
                                style={{ backgroundColor: cell > 0 ? threadColors[j] : (isEmpty[i] ? '#FFFFFF' : pedalColors[i]) }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Pattern;