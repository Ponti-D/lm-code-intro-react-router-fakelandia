import React, { useContext, useState } from "react";
import { JustTalk, MisdemeanourKind } from "../../../types/misdemeanours.types";
import { MisdemeanoursContext } from "../misdemeanours/MisdemeanoursContext";
import Detais from "./details";
import ReasonForContact from "./reason_for_contact";
import Subject from "./subject";

const Confession: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [reason, setReason] = useState<MisdemeanourKind | JustTalk>(
    "just-talk"
  );

  const [hasError, sethasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const misdemeanour = useContext(MisdemeanoursContext);
  let formValid = false;

  const subjectValid = subject.trim().length >= 3 && subject.trim().length < 20;

  const detailsValid =
    details.trim().length >= 10 && details.trim().length < 100;

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
          <ReasonForContact value={reason} onChangeReasonForContact={(newValue) => setReason(newValue)}
          />

          <Detais
            details={details}
            onChangeDetails={(newValue) => setDetails(newValue)}
          />
          {hasError && errorMessage.length > 0 && (
            <p className="errorMessage" aria-label="error message">
              {errorMessage}{" "}
            </p>
          )}
          <div className="submit__container">
            <button name="submit" disabled={!subjectValid || !detailsValid}>Submit 🤓</button>
            {successMessage.length > 0 && (
              <p aria-label="success Message">{successMessage}</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Confession;
