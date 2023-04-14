import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Stage } from '@pixi/react';
import Pattern from './Pattern'
import Toggle from './Toggle'
import ColorPicker from './ColorPicker';
import DownloadPDFButton from './DownloadPDFButton';
import LoadWIFButton from './LoadWIFButton';
import SaveWIFButton from './SaveWIFButton';
import Threading from './Threading';
import Pedalling from './Pedalling';
import Tieup from './Tieup';
import ShaftSelector from './ShaftSelector';
import PedalSelector from './PedalSelector';
import Title from './Title';

const SHAFT_VALUES = [4, 8, 12, 16, 24, 32];
const PEDAL_VALUES = [4, 6, 8, 10, 12, 14];
const MAX_WIDTH = 64;
const MAX_HEIGHT = 64;
const SQUARE_SIZE = 20;

const initialDraft = {
    Title: "Untitled-draft",
    Warp: 64, //width 
    Weft: 64, //height
    Shafts: 4,
    Pedals: 4,
    Threading: Array.from({ length: 4 }, () => Array.from({ length: 64 }).fill(0)),
    Tieup: Array.from({ length: 4 }, () => Array.from({ length: 4 }).fill(0)),
    Pedalling: Array.from({ length: 64 }, () => Array.from({ length: 4 }).fill(0)),
    ThreadColors: Array.from({ length: 64 }).fill('#7c3aed'),
    PedalColors: Array.from({ length: 64 }).fill('#FFFFFF'),
}

function App() {

    const [showGrid, setShowGrid] = useState(true);
    const [multipedalling, setMultipedaling] = useState(true);
    const [currentColor, setCurrentColor] = useState('#7c3aed');

    const [draft, updateDraft] = useImmer(initialDraft);

    return (
        <div className='grid grid-flow-col-dense w-screen h-screen bg-gray-200 ' onDragStart={(e) => {e.preventDefault()}} draggable={false}>
            <div className='m-2 p-2 border rounded-md justify-center border-gray-300 bg-gray-50 shadow-sm max-w-fit'>
                <Title draft={draft} updateDraft={updateDraft} />
                <div><ShaftSelector draft={draft} updateDraft={updateDraft} values={SHAFT_VALUES}/></div>
                <div><PedalSelector draft={draft} updateDraft={updateDraft} values={PEDAL_VALUES}/></div>
                <ColorPicker color={currentColor} onChange={setCurrentColor} />
                <div className='divide-y'>
                    <div><Toggle value={showGrid} setValue={setShowGrid}>Pattern grid</Toggle></div>
                    <div><Toggle value={multipedalling} setValue={setMultipedaling}>Multi-treadling</Toggle></div>
                </div>
                <LoadWIFButton draft={draft} updateDraft={updateDraft} maxWidth={MAX_WIDTH} maxHeight={MAX_HEIGHT} />
                <SaveWIFButton draft={draft}/>
                <DownloadPDFButton draft={draft}/>
            </div>
            <Stage width={(draft.Warp + draft.Pedals + 6) * SQUARE_SIZE} height={(draft.Weft + draft.Shafts + 6) * SQUARE_SIZE} options={{ backgroundColor: 0xb6bfb8 }}>
                <Threading draft={draft} updateDraft={updateDraft} currentColor={currentColor} squareSize={SQUARE_SIZE} x={SQUARE_SIZE} y={SQUARE_SIZE}/>
                <Tieup draft={draft} updateDraft={updateDraft} squareSize={SQUARE_SIZE} x={(draft.Warp + 2) * SQUARE_SIZE} y={3 * SQUARE_SIZE}/>
                <Pedalling draft={draft} updateDraft={updateDraft} currentColor={currentColor} multi={multipedalling} squareSize={SQUARE_SIZE} x={(draft.Warp + 2) * SQUARE_SIZE} y={(draft.Shafts + 4) * SQUARE_SIZE}/>
                <Pattern draft={draft} grid={showGrid} squareSize={SQUARE_SIZE} x={SQUARE_SIZE} y={(draft.Shafts + 4) * SQUARE_SIZE} />
            </Stage>
        </div>
    )
}

export default App