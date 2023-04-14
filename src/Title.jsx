import { useState } from "react";

function Title({ draft, updateDraft }) {
 
    const [isOpen, setIsOpen] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        if(formJson.title != "") {
            updateDraft(draft => {draft.Title = formJson.title});
        }

        setIsOpen(false);
    }
    
    return (
        <>
            <div className='flex mb-5 w-64 items-center'>
                <span className='w-full min-w-0 truncate ... pl-2 whitespace-nowrap overflow-hidden text-center font-semibold'>{draft.Title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-1 text-violet-600 cursor-pointer" onClick={() => setIsOpen(true)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </div>
            {isOpen &&
            <div className="absolute top-2">
                <form onSubmit={handleSubmit} className="flex items-center bg-violet-600 rounded-md border border-gray-300">
                    <label className="text-white">
                        <span className="m-2">New title:</span>
                        <input className="text-black p-1" name="title" type="text" defaultValue={draft.Title}/>
                    </label>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                    <button onClick={() => setIsOpen(false)} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </form>
            </div>}
        </>
    )
}
export default Title;