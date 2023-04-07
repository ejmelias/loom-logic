import { RadioGroup } from "@headlessui/react";

function SizeSelector({ values, current, setCurrent, children }) {

    return (
        <div className="inline-flex shadow-sm rounded-md m-1">
            <RadioGroup value={current} onChange={setCurrent}>
                <RadioGroup.Label>
                    <span className="bg-violet-600 text-white rounded-l-md inline-flex py-1 w-20 font-semibold text-sm justify-center items-center border-r border-gray-300">
                        {children}
                    </span>
                </RadioGroup.Label>
                <div className="inline-flex rounded-md" >
                    {values.map((value, i) => (
                        <RadioGroup.Option key={value} value={value}>
                            <span className={`${value === current ? "bg-violet-600 text-white" : "bg-white hover:bg-gray-200 ring-1 ring-inset ring-gray-300"} ${i === values.length-1 ? 'rounded-r-md' : ''} inline-flex py-1 w-7 font-semibold text-sm justify-center items-center cursor-pointer`}>
                                {value}
                            </span>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

export default SizeSelector;