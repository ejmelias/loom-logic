import { useRef, useState, useCallback } from 'react';
import { Container, Graphics, Sprite } from '@pixi/react';
import * as PIXI from 'pixi.js'

function Pedalling({ draft, updateDraft, currentColor, multi, squareSize, x, y }) {

    const [isMouseDown, setIsMouseDown] = useState(false);
    const colorRef = useRef()
    const cursorRef = useRef();
    const containerRef = useRef();
    const [hovered, setHovered] = useState(false);

    function handleColorDrag(event) {
        if (isMouseDown) { /*
            const row = Math.floor((event.nativeEvent.clientY - colorRef.current.getBoundingClientRect().top) / 20);
            if(row < draft.PedalColors.length) {
                updateDraft(draft => { draft.PedalColors[row] = currentColor });
            }*/
        }
    }

    function handleMove(e) {
        const x = Math.floor(containerRef.current.toLocal(e.global).x / squareSize) * squareSize
        const y = Math.floor(containerRef.current.toLocal(e.global).y / squareSize) * squareSize
        if(cursorRef.current) cursorRef.current.position = {x: x, y: y};
    }

    function handleColorClick(id) {
        updateDraft(draft => {draft.PedalColors[id] = currentColor});
    }

    function handlePedalClick(id) {
        updateDraft(draft => {
            
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
        });
    }

    //mouse hover square
    const mouseHover = useCallback((g) => {
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
                <Graphics ref={cursorRef} draw={mouseHover} alpha={hovered ? 1 : 0}/>
            </Container>
        </Container>
    );    
}
export default Pedalling;