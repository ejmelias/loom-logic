import { decodeINI } from './ini'

function LoadWIFButton ({ setShafts, setPedals, setThreading, setPedalling, setTieup, setPedalColors, setThreadColors }) {

    const readFile = async (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => { 
            const data = decodeINI(e.target.result);

            try {
                console.log(data)

                const shafts = parseInt(data.WEAVING.Shafts);
                const pedals = parseInt(data.WEAVING.Treadles);

                // Tie-up
                const tieup = Array.from({ length: shafts}, () => Array.from({ length: pedals }).fill(0))
                Object.keys(data.TIEUP).forEach(key => {
                    const tie = data.TIEUP[key].split(",");
                    for(let i = 0; i < tie.length; i++) {
                        tieup[Math.abs((parseInt(tie[i])-1) - (shafts - 1))][key-1] = 1;
                    }
                });



            } catch(error) {
                alert("An error occured while loading the selected file.");
                console.log(error);
            }
        };
        reader.readAsText(file)
    }
    

    return (
        <div className='flex justify-center my-5'>
            <div className="w-64">
                <label htmlFor="file_input" className="inline-block font-semibold mx-2" >
                    Load WIF file:
                </label>
                <input 
                    type="file" 
                    accept=".wif"
                    id="file_input"
                    className='w-full min-w-0 flex-auto border border-gray-300 border-1 text-sm rounded-md file:w-24 cursor-pointer file:cursor-pointer file:py-1 file:bg-violet-600 file:text-white file:font-semibold file:rounded-l-md file:shadow-sm file:border-0 file:justify-center file:items-center'
                    onChange={readFile}
                />
            </div>
        </div>
    );
}

export default LoadWIFButton;