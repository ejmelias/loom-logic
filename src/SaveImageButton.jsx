import { saveAs } from 'file-saver';

function SaveImageButton ({ draft }) {
    
    const handleDownload = async () => {
        const canvas = document.getElementById('canvas');
        canvas.toBlob((blob) => saveAs(blob, 'pattern.png'))
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
                Save as image
            </button>            
        </div>
    );
}

export default SaveImageButton;