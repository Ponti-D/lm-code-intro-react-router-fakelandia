import React, { useContext, useState } from "react";
import { JustTalk, MisdemeanourKind } from "../../../types/misdemeanours.types";
import { MisdemeanoursContext } from "../misdemeanours/MisdemeanoursContext";

const Confession: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [reason, setReason] = useState<MisdemeanourKind | JustTalk>(
    "just-talk"
  );
  const [details, setDetails] = useState<string>("");
  const [formValid, setFormValid] = useState(false);
  const [validationMessage, setvalidationMessage] = useState("");
  const [hasError, sethasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  
  const misdemeanour = useContext(MisdemeanoursContext);
 

  const onChangeSubject = (e: any) => {
    e.preventDefault();
    setsuccessMessage("");
    setSubject(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setvalidationMessage(
        "The detials needs to be between 3 and 20 haractors long."
      );
      setFormValid(false); //set submit button status
    } else {
     
      setvalidationMessage("");
      setFormValid(true);
    }
  };

  const onChangeDetails = (e: any) => {
    e.preventDefault();
    setsuccessMessage("");
    setDetails(e.target.value);

    if (e.target.value.length < 10 || e.target.value.length > 100) {
      setvalidationMessage(
        "The detials needs to be between 10 and 100 haractors long."
      );
      setFormValid(false); //set submit button status
    } else {
      setvalidationMessage("");
      setFormValid(true);
    }
  };

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    
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
      setsuccessMessage( "Confession submitted " + data.message) ;
      console.log(response.status + "Confession submitted " + data.message);
    } catch (error) {
      console.log(error);
    }
   
    setDetails("");
    setSubject("");
    setReason("just-talk");
     setFormValid(false);
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
          <div className="form__controlgroup">
            <label>Subject: </label>
            <input
            className="form__input"
              type="text"
              required
              value={subject}
              onChange={onChangeSubject}
            />
          </div>
          <div className="form__controlgroup">
            <label> Reason for contact:</label>
            <select
              defaultValue="just-talk"
              className="form__input"
              name="reason"
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
              name="details"
              className="form__input--details"  
              value={details}
              rows={5}
              onChange={onChangeDetails}
              required
              
            />
          </div>
          {!formValid && validationMessage.length > 0 && (
            <div>
              <label htmlFor="validationMessage">
                Please correct your information
              </label>
              <p>{validationMessage}</p>
            </div>
          )}
          {hasError && (
            <div>
              <label htmlFor="errorMessage">Errors</label>
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="submit__container">
            <button disabled={!formValid || hasError}> Submit 🤓</button>
            {successMessage.length > 0 && (
              <p className="success__message">{successMessage}</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Confession;
