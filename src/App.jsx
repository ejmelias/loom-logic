import { useState, useMemo, useEffect, useLayoutEffect,  } from 'react';
import { multiply, transpose, resize } from 'mathjs';
import { useImmer } from 'use-immer';
import Pattern from './Pattern'
import Toggle from './Toggle'
import SizeSelector from './SizeSelector'
import ColorPicker from './ColorPicker';
import DownloadPDFButton from './DownloadPDFButton';
import LoadWIFButton from './LoadWIFButton';
import Threading from './Threading';
import Pedalling from './Pedalling';

const patternWidth = 48; //warp
const patternHeight = 50; //weft
const shaftValues = [4, 8, 12, 16, 24, 32];
const pedalValues = [4, 6, 8, 10, 12, 14];

const initialDraft = {
    Warp: 48, //width 
    Weft: 50, //height
    Shafts: 4,
    Pedals: 4,
    Threading: Array.from({ length: 4 }, () => Array.from({ length: 48 }).fill(0)),
    Tieup: Array.from({ length: 4 }, () => Array.from({ length: 4 }).fill(0)),
    Pedalling: Array.from({ length: 50 }, () => Array.from({ length: 4 }).fill(0)),
    ThreadColors: Array.from({ length: 48 }).fill('#7c3aed'),
    PedalColors: Array.from({ length: 50 }).fill('#7c3aed'),
}



function App() {
    //console.log("render")

    const [showGrid, setShowGrid] = useState(true);
    const [multipedalling, setMultipedaling] = useState(true);
    const [currentColor, setCurrentColor] = useState('#7c3aed');

    const [draft, updateDraft] = useImmer(initialDraft);
    const [pattern, setPattern] = useState(Array.from({ length: initialDraft.Weft }, () => Array.from({ length: initialDraft.Warp }).fill(0)))

    const [pedalIsEmpty, setPedalIsEmpty] = useState(Array.from({ length: initialDraft.Weft }).fill(true));

/*
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
    },[tieup, threading, pedalling])*/

    return (
        <div className='flex bg-gray-200' onDragStart={(e) => {e.preventDefault()}} draggable={false}>
            {/*<div className='m-2 p-2 border rounded-md border-gray-300 bg-gray-50 shadow-sm'>
                <div><SizeSelector values={shaftValues} current={shafts} setCurrent={setShafts}>Shafts</SizeSelector></div>
                <div><SizeSelector values={pedalValues} current={pedals} setCurrent={setPedals}>Treadles</SizeSelector></div>
    <ColorPicker color={currentColor} onChange={setCurrentColor} />*/}
                <div className='divide-y'>
                    <div><Toggle value={showGrid} setValue={setShowGrid}>Pattern grid</Toggle></div>
                    <div><Toggle value={multipedalling} setValue={setMultipedaling}>Multi-treadling</Toggle></div>
                </div>{/*
                <LoadWIFButton setShafts={setShafts} setPedals={setPedals} setTieup={setTieup} />
                <DownloadPDFButton threading={threading} threadColors={threadColors} tieup={tieup} pedalling={pedalling} pedalColors={pedalColors} pattern={pattern} />
    </div>*/}
            <ColorPicker color={currentColor} onChange={setCurrentColor} />
            <div className="grid auto-rows-max grid-flow-row justify-center">
                {/*<div className='row' >
                    <Colorsetter draft={draft} currentColor={currentColor} orient="horizontal" />
                </div>
                <div className='grid auto-cols-max grid-flow-col' >
                    <Grid data={threading} setData={setThreading} type='threading' />
                    <Grid data={tieup} setData={setTieup} />
                </div>
                <div className='grid auto-cols-max grid-flow-col' >
                    <Pattern data={pattern} grid={showGrid} draft={draft} isEmpty={pedalIsEmpty} />
                    <Grid data={pedalling} setData={setPedalling} multi={multipedalling} type='pedalling'  isEmpty={pedalIsEmpty} setIsEmpty={setPedalIsEmpty}/>
                    <Colorsetter colors={pedalColors} setColors={setPedalColors} currentColor={currentColor} orient="vertical" />
</div>*/}
                <Threading draft={draft} updateDraft={updateDraft} currentColor={currentColor} />
                <Pedalling draft={draft} updateDraft={updateDraft} currentColor={currentColor} multi={multipedalling} />
            </div>
        </div>
    )
}

export default App