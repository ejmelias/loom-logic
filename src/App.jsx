import { useState } from 'react';
import { useImmer } from 'use-immer';
import { Stage } from '@pixi/react';
import Pattern from './Pattern'
import Toggle from './Toggle'
import ColorPicker from './ColorPicker';
import SaveImageButton from './SaveImageButton';
import LoadWIFButton from './LoadWIFButton';
import SaveWIFButton from './SaveWIFButton';
import Threading from './Threading';
import Pedalling from './Pedalling';
import Tieup from './Tieup';
import ShaftSelector from './ShaftSelector';
import PedalSelector from './PedalSelector';
import Title from './Title';
import About from './About';

const SHAFT_VALUES = [4, 8, 12, 16, 24, 32];
const PEDAL_VALUES = [4, 6, 8, 10, 12, 14];
const MAX_WIDTH = 164;
const MAX_HEIGHT = 164;
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
    App: {}
}

function App() {

    const [showGrid, setShowGrid] = useState(true);
    const [multipedalling, setMultipedaling] = useState(true);
    const [currentColor, setCurrentColor] = useState('#7c3aed');
    const [draft, updateDraft] = useImmer(initialDraft);

    const [insertMode, setInsertMode] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);

    return (
        <div className='grid grid-flow-col-dense w-screen h-screen bg-gray-50 ' onDragStart={(e) => {e.preventDefault()}} draggable={false}>
            <div className='p-2 border-r justify-center border-gray-500 bg-slate-100 shadow-sm max-w-fit'>
                <Title draft={draft} updateDraft={updateDraft} />
                <div><ShaftSelector draft={draft} updateDraft={updateDraft} values={SHAFT_VALUES}/></div>
                <div><PedalSelector draft={draft} updateDraft={updateDraft} values={PEDAL_VALUES}/></div>
                <ColorPicker color={currentColor} onChange={setCurrentColor} />
                <div className='flex justify-center pt-5'>
                    <button 
                        className={`p-2 m-2 h-10 w-20 justify-center ${insertMode ? 'outline ountline-4 outline-blue-500 bg-violet-900 outline-offset-2' : 'border-gray-500 bg-violet-600 border'} rounded-md text-white font-semibold`}
                        onClick={()=>{setInsertMode(!insertMode); setRemoveMode(false)}}
                    > 
                        {insertMode ? 'Cancel' : 'Insert'}
                    </button>
                    <button 
                        className={`p-2 m-2 h-10 w-20 justify-center ${removeMode ? 'outline ountline-4 outline-blue-500 bg-violet-900 outline-offset-2' : 'border-gray-500 bg-violet-600 border'} rounded-md text-white font-semibold`}
                        onClick={()=>{setInsertMode(false); setRemoveMode(!removeMode)}}
                    > 
                        {removeMode ? 'Cancel' : 'Remove'}
                    </button>
                </div>
                <div className='flex justify-center pb-5'>
                    <div className='flex h-12 w-60 text-sm text-center'>
                        {insertMode ? 'Click on the threading or treadling to insert a row or column' : ''}
                        {removeMode ? 'Click on the threading or treadling to remove a row or column' : ''}
                    </div>
                </div>
                <div className='divide-y pb-10'>
                    <div><Toggle value={showGrid} setValue={setShowGrid}>Pattern grid</Toggle></div>
                    <div><Toggle value={multipedalling} setValue={setMultipedaling}>Multi-treadling</Toggle></div>
                </div>
                <LoadWIFButton draft={draft} updateDraft={updateDraft} maxWidth={MAX_WIDTH} maxHeight={MAX_HEIGHT} />
                <SaveWIFButton draft={draft}/>
                <SaveImageButton draft={draft}/>
                <div className='pt-10'><About /></div>
            </div>
            <div className='overflow-auto'>
                <Stage id={'canvas'} width={(draft.Warp + draft.Pedals + 6) * SQUARE_SIZE} height={(draft.Weft + draft.Shafts + 6) * SQUARE_SIZE} options={{ backgroundColor: 0xf3f4f6, preserveDrawingBuffer: true }}>
                    <Threading draft={draft} updateDraft={updateDraft} currentColor={currentColor} squareSize={SQUARE_SIZE} x={SQUARE_SIZE} y={SQUARE_SIZE} insertMode={insertMode} removeMode={removeMode} maxThreads={MAX_WIDTH}/>
                    <Tieup draft={draft} updateDraft={updateDraft} squareSize={SQUARE_SIZE} x={(draft.Warp + 2) * SQUARE_SIZE} y={3 * SQUARE_SIZE}/>
                    <Pedalling draft={draft} updateDraft={updateDraft} currentColor={currentColor} multi={multipedalling} squareSize={SQUARE_SIZE} x={(draft.Warp + 2) * SQUARE_SIZE} y={(draft.Shafts + 4) * SQUARE_SIZE} insertMode={insertMode} removeMode={removeMode} maxPedalling={MAX_WIDTH}/>
                    <Pattern draft={draft} grid={showGrid} squareSize={SQUARE_SIZE} x={SQUARE_SIZE} y={(draft.Shafts + 4) * SQUARE_SIZE} />
                </Stage>
            </div>
        </div>
    )
}

export default App