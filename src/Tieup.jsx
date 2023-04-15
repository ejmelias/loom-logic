import { Container, Sprite, Graphics } from '@pixi/react';
import { useCallback, useState, useRef } from 'react';
import * as PIXI from 'pixi.js'

function Tieup({ draft, updateDraft, squareSize, x, y }) {

    const [hovered, setHovered] = useState(false);
    const cursorRef = useRef();
    const containerRef = useRef();
    

    function handleTieupClick(id) {
        updateDraft(draft => {
            if(draft.Tieup[id[0]][id[1]] === 0) {
                draft.Tieup[id[0]][id[1]] = 1;
            } else {
                draft.Tieup[id[0]][id[1]] = 0;
            }
        });
    }

    function handleMove(e) {
        const x = Math.floor(Math.abs(containerRef.current.toLocal(e.global).x) / squareSize) * squareSize
        const y = Math.floor(containerRef.current.toLocal(e.global).y / squareSize) * squareSize
        if(cursorRef.current) cursorRef.current.position = {x: x, y: y};
    }

    //mouse hover square
    const mouseHover = useCallback((g) => {
        g.clear();
        g.lineStyle(3, 0x0066ff, 1);
        g.drawRect(0, 0, squareSize, squareSize)
    },[])

    //draw grid and border
    const draw = useCallback((g) => {
        g.clear();
        g.lineStyle(1, 0x00000);
        for(let i = 1; i < draft.Shafts; i++) {
            g.moveTo(0, squareSize * i);
            g.lineTo(draft.Pedals * squareSize, squareSize * i);
        }
        for(let i = 1; i < draft.Pedals; i++) {
            g.moveTo(squareSize * i, 0);
            g.lineTo(squareSize * i, draft.Shafts * squareSize);
        }
        g.lineStyle(2, 0x00000, 1, 1);
        g.drawRect(0, 0, draft.Pedals * squareSize, draft.Shafts * squareSize)
    }, [draft]);    

    return(
        <Container ref={containerRef} width={draft.Pedals * squareSize + 4} height={draft.Shafts * squareSize + 4} x={x} y={y} options={{ backgroundColor: 0xFFFFFF }} eventMode='static' onmouseenter={()=>setHovered(true)} onmouseleave={()=>setHovered(false)} onmousemove={handleMove}>
            {draft.Tieup.map((row, i) => (
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
                        onclick={()=>handleTieupClick([i,j])}
                    />
                ))
            ))}
            <Graphics draw={draw}/>
            <Graphics ref={cursorRef} draw={mouseHover} alpha={hovered ? 1 : 0}/>
        </Container>
    );
}
export default Tieup;