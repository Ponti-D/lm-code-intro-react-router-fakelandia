import { useState } from "react";
import ErrorMessage from "./error_message";

interface SubjectProps {
  subject: string;
  onChangeSubject: (newvalue: string) => void;
}

const Subject: React.FC<SubjectProps> = ({ subject, onChangeSubject }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const validate: (value: string) => string | undefined = (value) => {
    if (value.length < 3 || value.length > 23) {
      return "The subject needs to be between 3 and 20 charactors long";
    }
    return undefined;
  };
  return (
    <div className="form__controlgroup">
      <label htmlFor="subject">Subject: </label>
      <input
        className="form__input"
        id="subject"
        type="text"
        required
        value={subject}
        onChange={(e) => {
          const errmessage = validate(e.target.value);
          setErrorMessage(errmessage);
          onChangeSubject(e.target.value);
        }}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
export default Subject;