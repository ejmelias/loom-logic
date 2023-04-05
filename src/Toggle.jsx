import { Switch } from '@headlessui/react';

function Toggle({ value, setValue, children}) {

    return (
        <Switch.Group>
            <div className="inline-flex justify-between w-64 items-center mx-1 px-3 py-1">
                <Switch.Label className="mr-4 font-semibold text-sm">{children}</Switch.Label>
                <Switch
                    checked={value}
                    onChange={setValue}
                    className={`${value ? 'bg-violet-600' : 'bg-gray-300'} relative inline-flex h-4 w-8 items-center rounded-full`}
                >                   
                    <span className={`${value ? 'translate-x-[18px]' : 'translate-x-[2px]'} inline-block h-3 w-3 transform rounded-full bg-white transition`}/>
                </Switch>
            </div>
        </Switch.Group>
    )
}
export default Toggle;