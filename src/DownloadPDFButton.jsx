import { pdf, Document, Page, Text, StyleSheet, Canvas } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

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

function DownloadPDFButton ({ pattern, threading, pedalling, tieup, pedalColors, threadColors }) {
    
    const handleDownload = async () => {
        const size = (pattern[0].length + pedalling[0].length) * 0.125;
        const paint = (painterObject) => {

            for(let i = 0; i < threadColors.length; i++) {
                painterObject.rect(i * size, 0, size, size).fillAndStroke(threadColors[i], 'black').lineWidth(0.5);
            }

            for(let i = 0; i < threading.length; i++) {
                for(let j = 0; j < threading[i].length; j++) {
                    if(threading[i][j] > 0) {
                        painterObject.rect(j * size, (i * size) + (2 * size), size, size).fillAndStroke('black', 'black').lineWidth(0.5);
                    } else {
                        painterObject.rect(j * size, (i * size) + (2 * size), size, size).stroke('black').lineWidth(0.5);
                    }
                }
            }

            for(let i = 0; i < pattern.length; i++) {
                for(let j = 0; j < pattern[i].length; j++) {
                    if(pattern[i][j] > 0) {
                        painterObject.rect(j * size, (i * size) + (7 * size), size, size).fillAndStroke(threadColors[j], 'gray').lineWidth(0.5);
                    } else {
                        painterObject.rect(j * size, (i * size) + (7 * size), size, size).fillAndStroke(pedalColors[j], 'gray').lineWidth(0.5);
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

            for(let i = 0; i < pedalColors.length; i++) {
                painterObject.rect(((threading[0].length + pedalling[0].length) * size) + (2 * size), (i * size) + (7 * size), size, size).fillAndStroke(pedalColors[i], 'black').lineWidth(0.5);
            }
        }
        const blob = await pdf(
            (
                <Document>
                    <Page>
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
                className='flex w-40 py-1 bg-violet-600 text-white font-semibold rounded-md shadow-sm m-1 justify-center items-center'
                onClick={handleDownload}
            >
                Download PDF
            </button>            
        </div>
    );
}

export default DownloadPDFButton;