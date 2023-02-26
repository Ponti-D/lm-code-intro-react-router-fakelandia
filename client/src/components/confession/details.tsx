import { useState } from "react";
import ErrorMessage from "./error_message";

interface DetailsProps {
    details: string;
  onChangeDetails: (newvalue: string) => void;
}

const Detais: React.FC<DetailsProps> = ({ details, onChangeDetails }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const validate: (value: string) => string | undefined = (value) => {
    if (value.length < 10 || value.length > 100) {
      return "The detials needs to be between 10 and 100 charactors long.";
    }
    return undefined;
  };
  return (
    <div className="form__controlgroup form__controlgroup--details">
      <label htmlFor="details">Details here 👉</label>
      <textarea
        id="details"
        className="form__input--details"
        value={details}
        rows={5}
        onChange={(e) => {
            const errmessage = validate(e.target.value);
            setErrorMessage(errmessage);
            onChangeDetails(e.target.value);
        }}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
export default Detais;
