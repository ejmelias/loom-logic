import { Container, Sprite, Graphics } from '@pixi/react';
import { useCallback } from 'react';
import * as PIXI from 'pixi.js'

function Tieup({ draft, updateDraft, squareSize, x, y }) {

    function handleTieupClick(id) {
        updateDraft(draft => {
            if(draft.Tieup[id[0]][id[1]] === 0) {
                draft.Tieup[id[0]][id[1]] = 1;
            } else {
                draft.Tieup[id[0]][id[1]] = 0;
            }
        });
    }

    //draw grid and border
    const draw = useCallback((g) => {
        g.clear();
        g.lineStyle(1, 0x00000);
        for(let i = 1; i < draft.Shafts; i++) {
            g.moveTo(squareSize * i, 0);
            g.lineTo(squareSize * i, draft.Shafts * squareSize);
        }
        for(let i = 1; i < draft.Pedals; i++) {
            g.moveTo(0, squareSize * i);
            g.lineTo(draft.Shafts * squareSize, squareSize * i);
        }
        g.lineStyle(2, 0x00000);
        g.drawRect(0, 0, draft.Pedals * squareSize, draft.Shafts * squareSize)
    }, []);    

    return(
        <Container width={draft.Pedals * squareSize} height={draft.Shafts * squareSize} x={x} y={y} options={{ backgroundColor: 0xFFFFFF }}>
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
        </Container>
    );
}
export default Tieup;