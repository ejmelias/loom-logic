import { useRef, useState, useCallback } from 'react';
import { Container, Graphics, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js'

function Pedalling({ draft, updateDraft, currentColor, multi, squareSize, x, y, insertMode, removeMode, maxPedalling }) {

    const [isMouseDown, setIsMouseDown] = useState(false);
    const colorRef = useRef()
    const cursorRef = useRef();
    const subCursorRef = useRef();
    const addCursorRef = useRef();
    const containerRef = useRef();
    const [hovered, setHovered] = useState(false);

    function handleColorDrag(event) {
        /*if (isMouseDown) { 
            const row = Math.floor((event.nativeEvent.clientY - colorRef.current.getBoundingClientRect().top) / 20);
            if(row < draft.PedalColors.length) {
                updateDraft(draft => { draft.PedalColors[row] = currentColor });
            }
        }*/
    }

    function handleMove(e) {
        const x = Math.floor(containerRef.current.toLocal(e.global).x / squareSize) * squareSize
        const y = Math.floor(containerRef.current.toLocal(e.global).y / squareSize) * squareSize
        if(x >= 0) {
            cursorRef.current.position = {x: x, y: y};
        }
        subCursorRef.current.position = {x: 0, y: y};
        addCursorRef.current.position = {x: 0, y: Math.round(containerRef.current.toLocal(e.global).y / squareSize) * squareSize}
    }

    function handleColorClick(id) {
        updateDraft(draft => {draft.PedalColors[id] = currentColor});
    }

    function handlePedalClick(id) {
        updateDraft(draft => {
            if(removeMode) {
                if(draft.Weft > 1) {
                    draft.Pedalling.splice(id[0], 1);
                    draft.PedalColors.splice(id[0], 1);
                    draft.Weft--;
                }
            } else if (insertMode) {
                if(draft.Weft < maxPedalling) {
                    draft.Pedalling.splice(addCursorRef.current.position.y / squareSize, 0, Array.from({ length: draft.Pedals }).fill(0));
                    draft.PedalColors.splice(addCursorRef.current.position.y / squareSize, 0, currentColor);
                    draft.Weft++;
                }
            } else {     
                if(!multi) {
                    for(let i = 0; i < draft.Pedalling[0].length; i++) {
                        if(i !== id[1]) {
                            draft.Pedalling[id[0]][i] = 0;
                        }
                    }
                }
                if(draft.Pedalling[id[0]][id[1]] === 0) {
                    draft.Pedalling[id[0]][id[1]] = 1;
                } else {
                    draft.Pedalling[id[0]][id[1]] = 0;
                }
            }
        });
    }

    const insertModeCursor = useCallback((g) => {
        g.clear();
        g.lineStyle(5, 0x00bf1d );
        g.moveTo(0, 0);
        g.lineTo(squareSize * draft.Pedals, 0);
    },[draft.Pedals])

    const removeModeCursor = useCallback((g) => {
        g.clear();
        g.lineStyle(3, 0xfc031c, 1);
        g.drawRect(0, 0, squareSize * draft.Pedals, squareSize)
    },[draft.Pedals])

    //mouse hover square
    const normalCursor = useCallback((g) => {
        g.clear();
        g.lineStyle(3, 0x0066ff, 1);
        g.drawRect(0, 0, squareSize, squareSize)
    },[])

    //draw grid and border
    const drawColorGrid = useCallback((g) => {
        g.clear();
        g.lineStyle(1, 0x00000);
        for(let i = 1; i < draft.Weft; i++) {
            g.moveTo(0, squareSize * i);
            g.lineTo(squareSize, squareSize * i);
        }
        g.lineStyle(2, 0x00000, 1, 1);
        g.drawRect(0, 0, squareSize, draft.Weft * squareSize)
    }, [draft]);    
    
    const drawPedalGrid = useCallback((g) => {
        g.clear();
        g.lineStyle(1, 0x00000);
        for(let i = 1; i < draft.Pedals; i++) {
            g.moveTo(squareSize * i, 0);
            g.lineTo(squareSize * i, draft.Weft * squareSize);
        }
        for(let i = 1; i < draft.Weft; i++) {
            g.moveTo(0, squareSize * i);
            g.lineTo(draft.Pedals * squareSize, squareSize * i);
        }
        g.lineStyle(2, 0x00000, 1, 1);
        g.drawRect(0, 0, draft.Pedals * squareSize, draft.Weft * squareSize)
    }, [draft]); 

    return (
        <Container width={(draft.Pedals + 2) * squareSize + 4} height={draft.Weft * squareSize + 4} x={x} y={y} options={{ backgroundColor: 0xFFFFFF }}>
            <Container 
                width={squareSize + 4} 
                height={draft.Weft * squareSize + 4} 
                x={(draft.Pedals + 1) * squareSize} 
                y={0} 
                options={{ backgroundColor: 0xFFFFFF }}
                eventMode="static"
                onpointerdown={() => setIsMouseDown(true)}
                onpointerup={() => setIsMouseDown(false)}
                onpointermove={handleColorDrag}
                onpointerleave={() => {setIsMouseDown(false)}}
            >
                {draft.PedalColors.map((cell, i) => (
                    <Sprite
                        key={i}
                        texture={PIXI.Texture.WHITE}
                        width={squareSize}
                        height={squareSize}
                        tint={cell}
                        x={0}
                        y={i * squareSize}
                        eventMode="static"
                        onclick={()=>handleColorClick(i)}
                    />
                ))}
                <Graphics draw={drawColorGrid} />
            </Container>
            <Container ref={containerRef} width={draft.Pedals * squareSize + 4} height={draft.Weft * squareSize + 4} x={0} y={0} options={{ backgroundColor: 0xFFFFFF }} eventMode='static' onmouseenter={()=>setHovered(true)} onmouseleave={()=>setHovered(false)} onmousemove={handleMove}>
                {draft.Pedalling.map((row, i) => (
                    row.map((cell, j) => (
                        <Sprite
                            key={[i,j]}
                            texture={PIXI.Texture.WHITE}
                            width={squareSize}
                            height={squareSize}
                            tint={cell === 1 ? 0x000000 : 0xffffff}
                            x={j * squareSize}
                            y={i * squareSize}
                            eventMode="static"
                            onclick={()=>handlePedalClick([i,j])}
                        />
                    ))
                ))}
                <Graphics draw={drawPedalGrid} />
                <Graphics ref={cursorRef} draw={normalCursor} alpha={(hovered && !removeMode && !insertMode) ? 1 : 0}/>
                <Graphics ref={subCursorRef} draw={removeModeCursor} alpha={(hovered && removeMode) ? 1 : 0}/>
                <Graphics ref={addCursorRef} draw={insertModeCursor} alpha={(hovered && insertMode) ? 1 : 0}/>
            </Container>
        </Container>
    );    
}
export default Pedalling;