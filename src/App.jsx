import { useState, useMemo } from 'react';
import { multiply, transpose, resize } from 'mathjs';
import Grid from './Grid'
import Pattern from './Pattern'
import Colorsetter from './Colorsetter'
import Toggle from './Toggle'
import SizeSelector from './SizeSelector'
import ColorPicker from './ColorPicker';
import DownloadPDFButton from './DownloadPDFButton';
import LoadWIFButton from './LoadWIFButton';

const patternWidth = 48;
const patternHeight = 50;
const shaftValues = [4, 8, 12, 16, 24, 32];
const pedalValues = [4, 6, 8, 10, 12, 14];

function App() {
    console.log("render")

    const [showGrid, setShowGrid] = useState(true);
    const [multipedalling, setMultipedaling] = useState(true);
    const [shafts, setShafts] = useState(shaftValues[0]);
    const [pedals, setPedals] = useState(pedalValues[0])
    
    const [currentColor, setCurrentColor] = useState('#7c3aed');
    const [threadColors, setThreadColors] = useState(Array.from({ length: patternWidth }).fill('#7c3aed'));
    const [pedalColors, setPedalColors] = useState(Array.from({ length: patternHeight }).fill('#d5c3a1'));
    
    const [threading, setThreading] = useState(Array.from({ length: shafts }, () => Array.from({ length: patternWidth }).fill(0)));
    const [pedalling, setPedalling] = useState(Array.from({ length: patternHeight}, () => Array.from({ length: pedals }).fill(0)));
    const [tieup, setTieup] = useState(Array.from({ length: shafts}, () => Array.from({ length: pedals }).fill(0)));
    const [pedalIsEmpty, setPedalIsEmpty] = useState(Array.from({ length: patternHeight }).fill(true));

    /**
     * Determining the pattern is accomplished through matrix multiplication
     * pattern = (pedalling) x (transposed tie-up) x (threading)
     */
    const pattern = multiply(multiply(pedalling, transpose(tieup)), threading);

    // NOTE: could rotate matrix 180 and back to add/remove rows from top. Could use this for extending pattern width.
    useMemo(() => {
        setTieup(resize(tieup, [shafts, pedals]))
        setThreading(resize(threading, [shafts, patternWidth]));
    }, [shafts])

    useMemo(() => {
        setTieup(resize(tieup, [shafts, pedals]))
        setPedalling(resize(pedalling, [patternHeight, pedals]));
    }, [pedals])

    return (
        <div className='flex bg-gray-200' onDragStart={(e) => {e.preventDefault()}} draggable={false}>
            <div className='m-2 p-2 border rounded-md border-gray-300 bg-gray-50 shadow-sm'>
                <div><SizeSelector values={shaftValues} current={shafts} setCurrent={setShafts}>Shafts</SizeSelector></div>
                <div><SizeSelector values={pedalValues} current={pedals} setCurrent={setPedals}>Treadles</SizeSelector></div>
                <ColorPicker color={currentColor} onChange={setCurrentColor} />
                <div className='divide-y'>
                    <div><Toggle value={showGrid} setValue={setShowGrid}>Pattern grid</Toggle></div>
                    <div><Toggle value={multipedalling} setValue={setMultipedaling}>Multi-treadling</Toggle></div>
                </div>
                <LoadWIFButton setShafts={setShafts} setPedals={setPedals} />
                <DownloadPDFButton threading={threading} threadColors={threadColors} tieup={tieup} pedalling={pedalling} pedalColors={pedalColors} pattern={pattern} />
            </div>
            <div className="grid auto-rows-max grid-flow-row justify-center">
                <div className='row' >
                    <Colorsetter colors={threadColors} setColors={setThreadColors} currentColor={currentColor} orient="horizontal" />
                </div>
                <div className='grid auto-cols-max grid-flow-col' >
                    <Grid data={threading} setData={setThreading} type='threading' />
                    <Grid data={tieup} setData={setTieup} />
                </div>
                <div className='grid auto-cols-max grid-flow-col' >
                    <Pattern data={pattern} grid={showGrid} pedalColors={pedalColors} threadColors={threadColors} isEmpty={pedalIsEmpty} />
                    <Grid data={pedalling} setData={setPedalling} multi={multipedalling} type='pedalling'  isEmpty={pedalIsEmpty} setIsEmpty={setPedalIsEmpty}/>
                    <Colorsetter colors={pedalColors} setColors={setPedalColors} currentColor={currentColor} orient="vertical" />
                </div>
            </div>
        </div>
    )
}

export default App