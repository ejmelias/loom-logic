import { pdf, Document, Page, Text, StyleSheet, Canvas, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { multiply, transpose } from "mathjs";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    canvas: {
        margin: 50,
        width: 300,
        height: 700
    }
});

function DownloadPDFButton ({ draft }) {
    
    const handleDownload = async () => {
        const pedalling = JSON.parse(JSON.stringify(draft.Pedalling));
        const tieup = JSON.parse(JSON.stringify(draft.Tieup));
        const threading = JSON.parse(JSON.stringify(draft.Threading));
        const pattern = multiply(multiply(pedalling, transpose(tieup)), threading)

        const size = 10 / ((draft.Warp + draft.Pedals) * 0.0137);
        const paint = (painterObject) => {

            for(let i = 0; i < draft.Warp; i++) {
                painterObject.rect(i * size, 0, size, size).fillAndStroke(draft.ThreadColors[i], 'black').lineWidth(0.5);
            }

            for(let i = 0; i < draft.Shafts; i++) {
                for(let j = 0; j < draft.Warp; j++) {
                    if(draft.Threading[i][j] > 0) {
                        painterObject.rect(j * size, (i * size) + (2 * size), size, size).fillAndStroke('black', 'black').lineWidth(0.5);
                    } else {
                        painterObject.rect(j * size, (i * size) + (2 * size), size, size).stroke('black').lineWidth(0.5);
                    }
                }
            }

            for(let i = 0; i < draft.Weft; i++) {
                for(let j = 0; j < draft.Warp; j++) {
                    if(pattern[i][j] > 0) {
                        painterObject.rect(j * size, (i * size) + ((draft.Shafts + 3) * size), size, size).fillAndStroke(draft.ThreadColors[j], 'gray').lineWidth(0.5);
                    } else {
                        painterObject.rect(j * size, (i * size) + ((draft.Shafts + 3)  * size), size, size).fillAndStroke(draft.PedalColors[j], 'gray').lineWidth(0.5);
                    }
                }
            }

            for(let i = 0; i < tieup.length; i++) {
                for(let j = 0; j < tieup[i].length; j++) {
                    if(tieup[i][j] > 0) {
                        painterObject.rect((j * size) + (threading[0].length * size) + size, (i * size) + (2 * size), size, size).fillAndStroke('black', 'black').lineWidth(0.5);
                    } else {
                        painterObject.rect((j * size) + (threading[0].length * size) + size, (i * size) + (2 * size), size, size).fillAndStroke('white', 'black').lineWidth(0.5);
                    }
                }
            }

            for(let i = 0; i < pedalling.length; i++) {
                for(let j = 0; j < pedalling[i].length; j++) {
                    if(pedalling[i][j] > 0) {
                        painterObject.rect((j * size) + (threading[0].length * size) + size, (i * size) + (7 * size), size, size).fillAndStroke('black', 'black').lineWidth(0.5);
                    } else {
                        painterObject.rect((j * size) + (threading[0].length * size) + size, (i * size) + (7 * size), size, size).fillAndStroke('white', 'black').lineWidth(0.5);
                    }
                }
            }

            for(let i = 0; i < draft.PedalColors.length; i++) {
                painterObject.rect(((threading[0].length + pedalling[0].length) * size) + (2 * size), (i * size) + (7 * size), size, size).fillAndStroke(draft.PedalColors[i], 'black').lineWidth(0.5);
            }
        }
        const blob = await pdf(
            (
                <Document>
                    <Page wrap orientation='landscape'>
                        <Canvas 
                            style={styles.canvas}
                            paint={paint}
                        />
                    </Page>
                </Document>
            )
        ).toBlob()
        saveAs(blob, 'test.pdf')
    }

    return (
        <div className='flex justify-center'>
            <button 
                className='flex w-48 py-1 bg-violet-600 text-white font-semibold rounded-md shadow-sm m-1 justify-center items-center'
                onClick={handleDownload}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Save as PDF
            </button>            
        </div>
    );
}

export default DownloadPDFButton;