import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function About() {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="inset-0 flex items-center justify-center">
                <button
                type="button"
                onClick={openModal}
                className="rounded-md h-8  px-4 font-medium text-black/30 underline"
                >
                    About
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        About
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            I created Loom Logic with the goal of providing a free and simple way for weavers to create, view and edit weaving drafts.
                                        </p>
                                        <br/>
                                        <p className="text-sm text-gray-500">
                                            This is an ongoing project, and is by no means complete. If you would like to request a feature, report a bug, or just get in contact
                                            please send me an <a href="mailto: ejmelias@gmail.com" className='text-blue-500'>email</a>.
                                        </p>
                                        <br/>
                                        <p className="text-sm text-gray-500">
                                            If you are interested in the source code for this project, it can be viewed <a href="https://github.com/ejmelias/weaving-draft" target="_blank" rel="noopener noreferrer" className='text-blue-500'>here</a>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default About;