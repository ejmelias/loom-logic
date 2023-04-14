import { multiply, transpose } from "mathjs";
import { Container, Sprite, Graphics } from '@pixi/react';
import { useCallback } from "react";
import * as PIXI from 'pixi.js'

function Pattern({ draft, grid, squareSize, x, y }) { 

    const pedalling = JSON.parse(JSON.stringify(draft.Pedalling));
    const tieup = JSON.parse(JSON.stringify(draft.Tieup));
    const threading = JSON.parse(JSON.stringify(draft.Threading));
    const pattern = multiply(multiply(pedalling, transpose(tieup)), threading)

    //draw grid 
    const lines = useCallback((g) => {
        g.clear();
        g.lineStyle(1, 0xd4d3cf);
        for(let i = 1; i < draft.Warp; i++) {
            g.moveTo(squareSize * i, 0);
            g.lineTo(squareSize * i, draft.Weft * squareSize);
        }
        for(let i = 1; i < draft.Weft; i++) {
            g.moveTo(0, squareSize * i);
            g.lineTo(draft.Warp * squareSize, squareSize * i);
        }
    }, []);

    //draw border
    const border = useCallback((g) => {
        g.clear();
        g.lineStyle(2, 0x00000);
        g.drawRect(0, 0, draft.Warp * squareSize, draft.Weft * squareSize)
    }, []);

    return ( 
        <Container width={draft.Warp * squareSize} height={draft.Weft * squareSize} x={x} y={y} options={{ backgroundColor: 0xFFFFFF }}>
            {pattern.map((row, cellY) => 
                (row.map((cell, cellX) => (
                    <Sprite
                        key={[cellY,cellX]}
                        texture={PIXI.Texture.WHITE}
                        width={squareSize}
                        height={squareSize}
                        tint={cell > 0 ? draft.ThreadColors[cellX] : draft.PedalColors[cellY]}
                        x={cellX * squareSize}
                        y={cellY * squareSize}
                    />
                ))
            ))}
            {grid && <Graphics draw={lines}/>}
            <Graphics draw={border}/>
        </Container>
    );
}

export default Pattern;