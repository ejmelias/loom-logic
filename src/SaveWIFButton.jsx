import { saveAs } from 'file-saver';

function SaveWIFButton({ draft }) {

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return `${parseInt(result[1], 16).toString()},${parseInt(result[2], 16).toString()},${parseInt(result[3], 16).toString()}`
    }

    function handleSave() {

        const threadColorSet = new Set(draft.ThreadColors);
        const pedalColorSet = new Set(draft.PedalColors);
        const combined = new Set([...threadColorSet, ...pedalColorSet]);

        // Base info
        let base = `[WIF]\nVersion=1.1\nDate=April 20, 1997\nDevelopers=wif@mhsoft.com\nSource Program=James
        \n[CONTENTS]\nTEXT=true\nWARP=true\nWEFT=true\nTIEUP=true\nCOLOR TABLE=true\nCOLOR PALETTE=true\nWARP COLORS=true\nWEFT COLORS=true\nTHREADING=true\nTREADLING=true
        \n[TEXT]\nTitle=${draft.Title}\n\n[WEAVING]\nShafts=${draft.Shafts}\nTreadles=${draft.Pedals}\nRising Shed=true
        \n[WARP]\nUnits=centimeters\nThreads=${draft.Warp}\nColor=${threadColorSet.size}
        \n[WEFT]\nUnits=centimeters\nThreads=${draft.Weft}\nColor=${pedalColorSet.size}
        \n[COLOR PALETTE]\nRange=0,255\nEntries=${combined.size}\n`;

        // Tieup
        let tieup = "\n[TIEUP]\n";
        for(let i = 0; i < draft.Pedals; i++) { // for each pedal (column in the tieup, pedals numbered left to right starting at 1)
            tieup += `${i+1}=`;
            for(let j = draft.Shafts - 1; j >= 0; j--) { // for each row (shaft in the current tieup column )
                if(draft.Tieup[j][i] === 1 ) {
                    tieup += `${Math.abs(j-draft.Shafts)},`; // shafts are numbered in reverse compared the array numbering, starting at 1 from the bottom (ie. 1st shaft corresponds to the row in Tieup[draft.Tieup.length] )
                }
            }
            tieup = tieup.replace(/,\s*$/, ""); // remove trailing comma, if there is one
            tieup += '\n';
        }
        
        // Threading
        let threading = "\n[THREADING]\n";
        for(let i = draft.Warp - 1; i >= 0; i--) { // for each thread (column in threading, numbered in reverse, starting at 1 on the right)
            threading += `${Math.abs(i - draft.Warp)}=`;
            for(let j = draft.Shafts - 1; j >= 0; j--) { // same as the tieup
                if(draft.Threading[j][i] === 1){ 
                    threading += `${Math.abs(j-draft.Shafts)},`;
                }
            }
            threading = threading.replace(/,\s*$/, ""); 
            threading += '\n';
        }

        // Treadling
        let treadling = '\n[TREADLING]\n';
        for(let i = 0; i < draft.Weft; i ++) { // pedals numbered like a normal 2d array, except numbering starts at 1
            treadling += `${i+1}=`;
            for(let j = 0; j < draft.Pedals; j++) {
                if(draft.Pedalling[i][j] === 1) {
                    treadling += `${j+1},`;
                }
            }
            treadling = treadling.replace(/,\s*$/, "");
            treadling += '\n';
        }

        // Color Table
        let colorTable = '\n[COLOR TABLE]\n';
        let colorTableObj = {}
        let index = 1;
        console.log(combined)
        for(const item of combined){
            colorTableObj[item] = index;
            colorTable += `${index}=${hexToRgb(item)}\n`;
            index++;
        }

        // Warp Colors
        let warpColors = '\n[WARP COLORS]\n';
        for(let i = draft.ThreadColors.length - 1; i >= 0  ; i--) {
            warpColors += `${Math.abs(i - draft.Warp)}=${colorTableObj[draft.ThreadColors[i]]}\n`;
        }

        // Weft Colors
        let weftColors = '\n[WEFT COLORS]\n';
        for(let i = 0; i < draft.PedalColors.length; i++) {
            weftColors += `${i+1}=${colorTableObj[draft.PedalColors[i]]}\n`;
        }

        const data = base.concat(tieup, threading, treadling, colorTable, warpColors, weftColors);
        const blob = new Blob([data]);
        const date = new Date();
        saveAs(blob, `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}.wif`);
    }

    return (
        <div className='flex justify-center'>
            <button 
                className='flex w-48 py-1 bg-violet-600 text-white font-semibold rounded-md shadow-sm m-1 justify-center items-center'
                onClick={handleSave}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Save as WIF
            </button>            
        </div>
    );
}
export default SaveWIFButton;