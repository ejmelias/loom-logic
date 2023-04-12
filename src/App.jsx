import { useState, useMemo, useEffect, } from 'react';
import { useImmer } from 'use-immer';
import Pattern from './Pattern'
import Toggle from './Toggle'
import ColorPicker from './ColorPicker';
import DownloadPDFButton from './DownloadPDFButton';
import LoadWIFButton from './LoadWIFButton';
import Threading from './Threading';
import Pedalling from './Pedalling';
import Tieup from './Tieup';
import ShaftSelector from './ShaftSelector';
import PedalSelector from './PedalSelector';

const SHAFT_VALUES = [4, 8, 12, 16, 24, 32];
const PEDAL_VALUES = [4, 6, 8, 10, 12, 14];
const MAX_WIDTH = 64;
const MAX_HEIGHT = 64;

const initialDraft = {
    Warp: 48, //width 
    Weft: 50, //height
    Shafts: 4,
    Pedals: 4,
    Threading: Array.from({ length: 4 }, () => Array.from({ length: 48 }).fill(0)),
    Tieup: Array.from({ length: 4 }, () => Array.from({ length: 4 }).fill(0)),
    Pedalling: Array.from({ length: 50 }, () => Array.from({ length: 4 }).fill(0)),
    ThreadColors: Array.from({ length: 48 }).fill('#7c3aed'),
    PedalColors: Array.from({ length: 50 }).fill('#FFFFFF'),
}

function App() {
    //console.log("render")

    const [showGrid, setShowGrid] = useState(true);
    const [multipedalling, setMultipedaling] = useState(true);
    const [currentColor, setCurrentColor] = useState('#7c3aed');

    const [draft, updateDraft] = useImmer(initialDraft);

    const [pedalIsEmpty, setPedalIsEmpty] = useState(Array.from({ length: initialDraft.Weft }).fill(true));

    return (
        <div className='grid grid-flow-col-dense  w-screen h-screen bg-gray-200 ' onDragStart={(e) => {e.preventDefault()}} draggable={false}>
            <div className='m-2 p-2 border rounded-md border-gray-300 bg-gray-50 shadow-sm max-w-fit'>
                <div><ShaftSelector draft={draft} updateDraft={updateDraft} values={SHAFT_VALUES}/></div>
                <div><PedalSelector draft={draft} updateDraft={updateDraft} values={PEDAL_VALUES}/></div>
                <ColorPicker color={currentColor} onChange={setCurrentColor} />
                <div className='divide-y'>
                    <div><Toggle value={showGrid} setValue={setShowGrid}>Pattern grid</Toggle></div>
                    <div><Toggle value={multipedalling} setValue={setMultipedaling}>Multi-treadling</Toggle></div>
                </div>
                <LoadWIFButton draft={draft} updateDraft={updateDraft} maxWidth={MAX_WIDTH} maxHeight={MAX_HEIGHT} />
                <DownloadPDFButton draft={draft}/>
            </div>
            <div className="overflow-auto p-5 border rounded-lg bg-blue-500/50 border-pink-500">
                <div className='grid grid-flow-col auto-cols-max' >
                    <Threading draft={draft} updateDraft={updateDraft} currentColor={currentColor} />
                    <div className='self-end'><Tieup draft={draft} updateDraft={updateDraft} /></div>
                </div>
                <div className='grid grid-flow-col auto-cols-max' >
                    <Pattern draft={draft} grid={showGrid}/>
                    <Pedalling draft={draft} updateDraft={updateDraft} currentColor={currentColor} multi={multipedalling} />
                </div>
            </div>
        </div>
    )
}

export default App