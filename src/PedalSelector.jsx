import SizeSelector from "./SizeSelector";

function PedalSelector({ draft, updateDraft, values }) {

    function handleChange(e) {
        updateDraft(draft => {
            while(e < draft.Pedalling[0].length) {
                draft.Pedalling.map((row) => { row.pop() });
                draft.Tieup.map((row) => { row.pop() });
            }
            while(e > draft.Pedalling[0].length) {
                draft.Pedalling.map((row) => { row.push(0) });
                draft.Tieup.map((row) => { row.push(0) });
            }
            draft.Pedals = e;
        });
    }

    return <SizeSelector values={values} current={draft.Pedals} setCurrent={handleChange}>Treadles:</SizeSelector>
}
export default PedalSelector;