import { JustTalk, MisdemeanourKind } from "../../../types/misdemeanours.types";


interface ReasonForContactProps {
    value: MisdemeanourKind | JustTalk;
    onChangeReasonForContact: (newValue: MisdemeanourKind | JustTalk) => void;
}

const ReasonForContact: React.FC<ReasonForContactProps> = ({
    value,
    onChangeReasonForContact,
}) => {

    return (
        <div className="form__controlgroup">
            <label htmlFor="reason">Reason for contact:</label>
            <select
                defaultValue="just-talk"
                className="form__input"
                id="reason"
                onChange={(e) => {
                    onChangeReasonForContact(e.target.value as MisdemeanourKind | JustTalk);
                }}
            >
                <option value="rudeness">Mild Public Rudeness 🤪</option>
                <option value="vegetables">Not Eating Your Vegetables 🥗 </option>
                <option value="lift">Speaking in a Lift 🗣</option>
                <option value="united">Supporting Manchester United 😈</option>
                <option value="just-talk">I just want to talk 😬</option>
            </select>

        </div>
    );
};
export default ReasonForContact;
