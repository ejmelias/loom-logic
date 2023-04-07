import SizeSelector from "./SizeSelector";

function ShaftSelector({ draft, updateDraft, values }) {

    function handleChange(e) {
        updateDraft(draft => {
            while(e < draft.Threading.length) {
                draft.Threading.shift();
                draft.Tieup.shift();
            }
            while(e > draft.Threading.length) {
                draft.Threading.unshift(Array.from({ length: draft.Warp }).fill(0));
                draft.Tieup.unshift(Array.from({ length: draft.Pedals }).fill(0));
            }
            draft.Shafts = e;
        });
    }

    return <SizeSelector values={values} current={draft.Shafts} setCurrent={handleChange}>Shafts:</SizeSelector>
}
export default ShaftSelector;