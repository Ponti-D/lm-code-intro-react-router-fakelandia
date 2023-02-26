import React, { useContext, useState } from "react";
import { JustTalk, MisdemeanourKind } from "../../../types/misdemeanours.types";
import { MisdemeanoursContext } from "../misdemeanours/MisdemeanoursContext";
import Subject from "./subject";


const Confession: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [detailsTouched, setDetailsTouched] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [reason, setReason] = useState<MisdemeanourKind | JustTalk>(
    "just-talk"
  );
  const [hasError, sethasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const misdemeanour = useContext(MisdemeanoursContext);
  let formValid = false;

  const subjectValid = subject.trim().length >= 3 && subject.trim().length < 20;
  //const subjectTouchedInvalid = !subjectValid && subjectTouched;

  const detailsValid =
    details.trim().length >= 10 && details.trim().length < 100;
  const detailsTouchedInvalid = !detailsValid && detailsTouched;

  // const subjectTouchHandler = (e: any) => {
  //   setSubjectTouched(true);
    
  // };
  const detailsTouchHandler = (e: any) => {
    setDetailsTouched(true);
  };

  // const changeSubjectHandler = (e: any) => {
  //   e.preventDefault();
  //   setSubject(e.target.value);
  //   setsuccessMessage("");
  // };

  const changeDetailsHandler = (e: any) => {
    e.preventDefault();
    setDetails(e.target.value);
    setsuccessMessage("");
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    formValid = subjectValid && detailsValid;

    if (!formValid) return;

    const newMisdemeanour = {
      subject,
      reason,
      details,
    };

    console.log(newMisdemeanour);
    try {
      const response = await fetch("http://localhost:8080/api/confess/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMisdemeanour),
      });

      if (!response.ok) {
        sethasError(true);
        setErrorMessage("Error - confession wasn't saved - try again later!");
        return;
      }

      const data = await response.json();

      if (data.message && !data.justTalked) {
        misdemeanour.push({
          citizenId: Math.floor(2 + Math.random() * 100),
          misdemeanour: reason,
          date: new Date().toLocaleDateString(),
        });
      }
      setsuccessMessage("Confession submitted " + data.message);
    } catch (error) {
      console.log(error);
    }
  
    setDetails("");
    setSubject("");
    setReason("just-talk");
    setSubjectTouched(false);
    setDetailsTouched(false);
  };

  return (
    <>
      <div className="confession__text">
        <h1>Confession 🦜</h1>
        <p>
          It's very difficult to catch people committing misdemeanours so we
          appreciate it when citizens confess to us directly.
        </p>
        <p>
          However, if you're just having a hard day and need to vent then you're
          welcome to contact us here too. Up to you!
        </p>
      </div>
      <div className="form__container">
        <form className="form" onSubmit={onFormSubmit}>
          <Subject 
           subject={subject}
           onChangeSubject={(newValue) => setSubject(newValue)}
          />

          <div className="form__controlgroup">
            <label htmlFor="reason">Reason for contact:</label>
            <select
              defaultValue="just-talk"
              className="form__input"
              id="reason"
              required
              onChange={(e) => setReason(e.target.value as MisdemeanourKind)}
            >
              <option value="rudeness">Mild Public Rudeness 🤪</option>
              <option value="vegetables">Not Eating Your Vegetables 🥗 </option>
              <option value="lift">Speaking in a Lift 🗣</option>
              <option value="united">Supporting Manchester United 😈</option>
              <option value="just-talk">I just want to talk 😬</option>
            </select>
          </div>
          <div className="form__controlgroup form__controlgroup--details">
            <label htmlFor="details">Details here 👉</label>
            <textarea
              id="details"
              className="form__input--details"
              value={details}
              rows={5}
              onChange={changeDetailsHandler}
              required
              onBlur={detailsTouchHandler}
            />
            {detailsTouchedInvalid && (
              <p className="errorMessage" aria-label="validation Message">
                The detials needs to be between 10 and 100 charactors long.
              </p>
            )}
          </div>
          {hasError && errorMessage.length > 0 && (
            <p className="errorMessage"  aria-label="error message">
              {errorMessage}{" "}
            </p>
          )}
          <div className="submit__container">
            <button disabled={!subjectValid || !detailsValid}>  
              Submit 🤓
            </button>
            {successMessage.length > 0 &&   <p aria-label="success Message" >{successMessage}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Confession;
