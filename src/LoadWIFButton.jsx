import { decodeINI } from './ini'

function LoadWIFButton ({ draft, updateDraft, maxHeight, maxWidth }) {

    const readFile = async (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => { 
            const data = decodeINI(e.target.result);

            try {
                console.log(data)

                const shafts = parseInt(data.WEAVING.Shafts);
                const pedals = parseInt(data.WEAVING.Treadles);
                const warp = (parseInt(data.WARP.Threads) > maxWidth ? maxWidth : parseInt(data.WARP.Threads))
                const weft = (parseInt(data.WEFT.Threads) > maxHeight ? maxHeight : parseInt(data.WEFT.Threads))

                // Tie-up
                const tieup = Array.from({ length: shafts}, () => Array.from({ length: pedals }).fill(0))
                if(data.TIEUP) {
                    Object.keys(data.TIEUP).forEach(key => {
                        const tie = data.TIEUP[key].split(",");
                        for(let i = 0; i < tie.length; i++) {
                            if(tie[i]) {
                                tieup[Math.abs((parseInt(tie[i])-1) - (shafts - 1))][key-1] = 1;
                            }
                        }
                    });
                }

                // threading
                const threading =  Array.from({ length: shafts}, () => Array.from({ length: warp }).fill(0));
                if(data.THREADING) {
                    for(let i = 1; i <= warp; i++) {
                        if(data.THREADING[i]) {
                            threading[Math.abs(data.THREADING[i] - shafts)][Math.abs(i - warp)] = 1;
                        }
                    }
                }
                    
                // pedalling 
                const pedalling = Array.from({ length: weft}, () => Array.from({ length: pedals }).fill(0));
                if(data.TREADLING) {
                    for(let i = 1; i <= weft; i++) {
                        if(data.TREADLING[i]) {
                            pedalling[Math.abs(i - weft)][Math.abs(data.TREADLING[i] - pedals)] = 1;
                        }
                    }
                }

                // thread colors
                const threadColors = Array.from({ length: warp }).fill('#000000');
                if(data["WARP COLORS"] && data["COLOR TABLE"] && data["COLOR PALETTE"]) {
                    const range = data["COLOR PALETTE"].Range.split(',')
                    for(let i = 1; i <= warp; i++) {
                        if(data["WARP COLORS"][i]) {
                            const rgb = data["COLOR TABLE"][data["WARP COLORS"][i]].split(',');
                            const rgb255 = rgb.map(item => (item / range[1]) * 255)
                            threadColors[Math.abs(i - warp)] = "rgb("+rgb255.join(",")+")";
                        }
                    }
                }

                // pedal colors
                const pedalColors = Array.from({ length: warp }).fill('#FFFFFF');
                if(data["WEFT COLORS"] && data["COLOR TABLE"] && data["COLOR PALETTE"]) {
                    const range = data["COLOR PALETTE"].Range.split(',')
                    for(let i = 1; i <= weft; i++) {
                        if(data["WEFT COLORS"][i]) {
                            const rgb = data["COLOR TABLE"][data["WEFT COLORS"][i]].split(',');
                            const rgb255 = rgb.map(item => (item / range[1]) * 255)
                            pedalColors[Math.abs(i - weft)] = "rgb("+rgb255.join(",")+")";
                        }
                    }
                }
                
                updateDraft(draft => {
                    draft.Warp = warp;
                    draft.Weft = weft;
                    draft.Shafts = shafts;
                    draft.Pedals = pedals;
                    draft.Tieup = tieup;
                    draft.Threading = threading;
                    draft.Pedalling = pedalling;
                    draft.ThreadColors = threadColors;
                    draft.PedalColors = pedalColors;
                });

            } catch(error) {
                alert("An error occured while loading the selected file.");
                console.log(error);
            }
        };
        reader.readAsText(file)
    }
    

    return (
        <div className='flex justify-center my-5'>
            <div className="w-64">
                <label htmlFor="file_input" className="inline-block font-semibold mx-2" >
                    Load WIF file:
                </label>
                <input 
                    type="file" 
                    accept=".wif"
                    id="file_input"
                    className='w-full min-w-0 flex-auto border border-gray-300 border-1 text-sm rounded-md file:w-24 cursor-pointer file:cursor-pointer file:py-1 file:bg-violet-600 file:text-white file:font-semibold file:rounded-l-md file:shadow-sm file:border-0 file:justify-center file:items-center'
                    onChange={readFile}
                />
            </div>
        </div>
    );
}

export default LoadWIFButton;