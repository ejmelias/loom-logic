import { useState, useRef, useCallback } from "react";
import { Container, Sprite, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js'

function Threading({ draft, updateDraft, currentColor, squareSize, x, y }) {

    const [isMouseDown, setIsMouseDown] = useState(false);
    const colorRef = useRef()
    const cursorRef = useRef();
    const containerRef = useRef();
    const [hovered, setHovered] = useState(false);

    function handleColorDrag(event) {
        if (isMouseDown) {
            /*
            const col = Math.floor((event.nativeEvent.clientX - colorRef.current.getBoundingClientRect().left) / 20);
            if(col >= 0 && col < draft.ThreadColors.length) {
                updateDraft(draft => { draft.ThreadColors[col] = currentColor });
            }*/
        }
    }

    function handleMove(e) {
        const x = Math.floor(containerRef.current.toLocal(e.global).x / squareSize) * squareSize
        const y = Math.floor(containerRef.current.toLocal(e.global).y / squareSize) * squareSize
        if(cursorRef.current) cursorRef.current.position = {x: x, y: y};
    }

    function handleColorClick(id) {
        updateDraft(draft => {draft.ThreadColors[id] = currentColor});
    }

    function handleThreadClick(id) {
        updateDraft(draft => {
            for(let i = 0; i < draft.Threading.length; i++) {
                if(i !== id[0]) {
                    draft.Threading[i][id[1]] = 0;
                }
            }
            if(draft.Threading[id[0]][id[1]] === 0) {
                draft.Threading[id[0]][id[1]] = 1;
            } else {
                draft.Threading[id[0]][id[1]] = 0;
            }
        });
    }

    //mouse hover square
    const mouseHover = useCallback((g) => {
        g.clear();
        g.lineStyle(3, 0x0066ff, 1, 0);
        g.drawRect(0, 0, squareSize, squareSize)
    },[])

    //draw grid and border
    const drawColorGrid = useCallback((g) => {
        g.clear();
        g.lineStyle(1, 0x00000);
        for(let i = 1; i < draft.Warp; i++) {
            g.moveTo(squareSize * i, 0);
            g.lineTo(squareSize * i, squareSize);
        }
        g.lineStyle(2, 0x00000);
        g.drawRect(0, 0, draft.Warp * squareSize, squareSize)
    }, [draft]);    
    
    const drawThreadGrid = useCallback((g) => {
        g.clear();
        g.lineStyle(1, 0x00000);
        for(let i = 1; i < draft.Warp; i++) {
            g.moveTo(squareSize * i, 0);
            g.lineTo(squareSize * i, draft.Shafts * squareSize);
        }
        for(let i = 1; i < draft.Shafts; i++) {
            g.moveTo(0, squareSize * i);
            g.lineTo(draft.Warp * squareSize, squareSize * i);
        }
        g.lineStyle(2, 0x00000);
        g.drawRect(0, 0, draft.Warp * squareSize, draft.Shafts * squareSize)
    }, [draft]); 

    return (
        <Container width={draft.Warp * squareSize} height={(draft.Shafts + 2) * squareSize} x={x} y={y} options={{ backgroundColor: 0xFFFFFF }}>
            <Container 
                width={draft.Warp * squareSize} 
                height={squareSize} x={0} y={0} 
                options={{ backgroundColor: 0xFFFFFF }}
                eventMode="static"
                onpointerdown={() => setIsMouseDown(true)}
                onpointerup={() => setIsMouseDown(false)}
                onpointermove={handleColorDrag}
                onpointerleave={() => {setIsMouseDown(false)}}
            >
                {draft.ThreadColors.map((cell, i) => (
                    <Sprite
                        key={i}
                        texture={PIXI.Texture.WHITE}
                        width={squareSize}
                        height={squareSize}
                        tint={cell}
                        x={i * squareSize}
                        y={0}
                        eventMode="static"
                        onclick={()=>handleColorClick(i)}
                    />
                ))}
                <Graphics draw={drawColorGrid}/>
            </Container>
            <Container ref={containerRef} width={draft.Warp * squareSize} height={draft.Shafts * squareSize} x={0} y={2 * squareSize} options={{ backgroundColor: 0xFFFFFF }}eventMode='static' onmouseenter={()=>setHovered(true)} onmouseleave={()=>setHovered(false)} onmousemove={handleMove}>
                {draft.Threading.map((row, i) => (
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
                            onclick={()=>handleThreadClick([i,j])}
                        />
                    ))
                ))}
                <Graphics draw={drawThreadGrid}/>
                {hovered && <Graphics ref={cursorRef} draw={mouseHover}/>}
            </Container>
        </Container>
    );
}
export default Threading;