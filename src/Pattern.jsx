import { multiply, transpose } from "mathjs";

function Pattern({ draft, grid }) { 

    const pedalling = JSON.parse(JSON.stringify(draft.Pedalling));
    const tieup = JSON.parse(JSON.stringify(draft.Tieup));
    const threading = JSON.parse(JSON.stringify(draft.Threading));
    const pattern = multiply(multiply(pedalling, transpose(tieup)), threading)

    return (
        <div>
            <div className='max-w-max m-2 grid grid-flow-row auto-rows-max border border-black'>
                {pattern.map((row, i) => (
                    <div key={i} className="grid grid-flow-col auto-cols-max">
                        {row.map((cell, j) => (
                            <div className={`h-5 w-5 ${grid ? "border-[0.5px]" : ""}`}
                                key={[i,j]}
                                style={{ backgroundColor: cell > 0 ? draft.ThreadColors[j] :  draft.PedalColors[i] }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Pattern;