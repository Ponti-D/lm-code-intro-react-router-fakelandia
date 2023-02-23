import React, { useContext, useState } from "react";
import { MisdemeanoursContext } from "../misdemeanours/misdemeanours";

const Confession: React.FC = () => {
  const [subject, setSubject] = useState<string>("ww");
  const [reason, setReason] = useState<string>("just-talk");
  const [details, setDetails] = useState<string>("wwwwwwwwwwwdddw");
  const [formValid, setFormValid] = useState(false);
  const [validationMessage, setvalidationMessage] = useState("");
  const [hasError, sethasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const misdemeanour = useContext(MisdemeanoursContext);

  const onChangeDetails = (e: any) => {
    e.preventDefault();

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
      const response = await fetch("http://localhost:8080/api/confesss/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMisdemeanour),
      });

      if (!response.ok) {
        sethasError(true);
        setErrorMessage(
          "Error - confession wasn't saved - try again later!"
        );
        return;
      }
      
      const data = await response.json();

      console.log(response.status + data.message);

    } catch (error) {
      console.log(error);
    }

    // setDetails("");
    // setSubject("");
    // setReason("talk");
    // setIsFormValid(false);
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
        <form onSubmit={onFormSubmit}>
          <div>
            <label>Subject: </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
          </div>
          <div>
            <label> Reason for contact :</label>
            <select
              defaultValue="just-talk"
              className="reason"
              name="reason"
              required
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Reason for confess</option>
              <option value="rudeness">Mild Public Rudeness 🤪</option>
              <option value="vegetables">Not Eating Your Vegetables 🥗 </option>
              <option value="lift">Speaking in a Lift 🗣</option>
              <option value="united">Supporting Manchester United 😈</option>
              <option value="just-talk">I just want to talk 😬</option>
            </select>
          </div>
          <div>
            <label>Details here ....</label>
            <textarea
              name="details"
              className="confess_details"
              value={details}
              rows={5}
              onChange={onChangeDetails}
              required
            />
          </div>
          {!formValid && (
            <div>
              <label>{validationMessage}</label>
            </div>
          )}
          { hasError && (
            <div>
              <label>{errorMessage}</label>
            </div>
          )}
          <button disabled={!formValid}> Submit 🤓</button>
        </form>
      </div>
    </>
  );
};

export default Confession;
