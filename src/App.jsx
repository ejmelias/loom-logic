import { useState, useMemo, useEffect, useLayoutEffect,  } from 'react';
import { multiply, transpose, resize } from 'mathjs';
import Grid from './Grid'
import Pattern from './Pattern'
import Colorsetter from './Colorsetter'
import Toggle from './Toggle'
import SizeSelector from './SizeSelector'
import ColorPicker from './ColorPicker';
import DownloadPDFButton from './DownloadPDFButton';
import LoadWIFButton from './LoadWIFButton';

const patternWidth = 48; //warp
const patternHeight = 50; //weft
const shaftValues = [4, 8, 12, 16, 24, 32];
const pedalValues = [4, 6, 8, 10, 12, 14];

function App() {
    //console.log("render")

    const [showGrid, setShowGrid] = useState(true);
    const [multipedalling, setMultipedaling] = useState(true);
    const [shafts, setShafts] = useState(shaftValues[0]);
    const [pedals, setPedals] = useState(pedalValues[0]);
    const [dimensions, setDimensions] = useState({warp: 48, weft: 50,}); //warp = width, weft = height
    
    const [currentColor, setCurrentColor] = useState('#7c3aed');
    const [threadColors, setThreadColors] = useState(Array.from({ length: dimensions.warp }).fill('#7c3aed'));
    const [pedalColors, setPedalColors] = useState(Array.from({ length: dimensions.weft }).fill('#d5c3a1'));
    
    const [threading, setThreading] = useState(Array.from({ length: shafts }, () => Array.from({ length: dimensions.warp }).fill(0)));
    const [pedalling, setPedalling] = useState(Array.from({ length: dimensions.weft}, () => Array.from({ length: pedals }).fill(0)));
    const [tieup, setTieup] = useState(Array.from({ length: shafts}, () => Array.from({ length: pedals }).fill(0)));
    const [pattern, setPattern] = useState(Array.from({ length: dimensions.weft }, () => Array.from({ length: dimensions.warp }).fill(0)))
    const [pedalIsEmpty, setPedalIsEmpty] = useState(Array.from({ length: dimensions.weft }).fill(true));


    useEffect(() => {
        const newTieup = [...tieup];
        const newPedalling = [...pedalling];

        while(pedals > newTieup[0].length) { // # pedals increased, push cells onto each row 
            newTieup.map((row) => { row.push(0) });
            newPedalling.map((row) => { row.push(0) });
        }

        while(pedals < newTieup[0].length) { // # pedals decreased, pop cells off each row
            newTieup.map((row) => { row.pop() });
            newPedalling.map((row) => { row.pop() });
        }
        setTieup(newTieup);
        setPedalling(newPedalling);
    },[pedals]);

    useEffect(() => {
        const newTieup = [...tieup];
        const newThreading = [...threading];

        while(shafts > newTieup.length) { // # shafts increased, unshift rows onto the front
            newTieup.unshift(Array.from({ length: pedals }).fill(0));
            newThreading.unshift(Array.from({ length: dimensions.warp }).fill(0));
        }
        while(shafts < newTieup.length) { // # shafts decreased, shift rows off the front
            newTieup.shift();
            newThreading.shift();
        }
        setTieup(newTieup);
        setThreading(newThreading);
    },[shafts]);

    useEffect(() => {
        setPattern(multiply(multiply(pedalling, transpose(tieup)), threading))
    },[tieup, threading, pedalling])

    return (
        <div className='flex bg-gray-200' onDragStart={(e) => {e.preventDefault()}} draggable={false}>
            <div className='m-2 p-2 border rounded-md border-gray-300 bg-gray-50 shadow-sm'>
                <button onClick={() => {setPedals(8); setShafts(8);}}>test</button>
                <div><SizeSelector values={shaftValues} current={shafts} setCurrent={setShafts}>Shafts</SizeSelector></div>
                <div><SizeSelector values={pedalValues} current={pedals} setCurrent={setPedals}>Treadles</SizeSelector></div>
                <ColorPicker color={currentColor} onChange={setCurrentColor} />
                <div className='divide-y'>
                    <div><Toggle value={showGrid} setValue={setShowGrid}>Pattern grid</Toggle></div>
                    <div><Toggle value={multipedalling} setValue={setMultipedaling}>Multi-treadling</Toggle></div>
                </div>
                <LoadWIFButton setShafts={setShafts} setPedals={setPedals} setTieup={setTieup} />
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