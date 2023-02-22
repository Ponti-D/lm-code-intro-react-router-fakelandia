import React, { useState } from "react";
import { Misdemeanour } from "../../../types/misdemeanours.types";

const Confession: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [reason, setReason] = useState<string>("talk");
  const [details, setDetails] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationMessage, setvalidationMessage] = useState("");

  const onChangeDetails = (e:any) => {
      e.preventDefault();   
      setDetails(e.target.value);    
      if(e.target.value.length <10 || e.target.value.length > 100) {
        setvalidationMessage("The detials needs to be between 10 and 100 haractors long.")
        setIsFormValid(false);
      }else{
        setvalidationMessage("");
        setIsFormValid(true);
      }
    
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
        <form  >
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
              defaultValue="talk"
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
              <option value="talk">I just want to talk 😬</option>
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
          {!isFormValid && (
            <div >
              <label>{validationMessage}</label>
            </div>
          )}
          <button disabled={!isFormValid}> Submit 🤓</button>
        </form>
      </div>
    </>
  );
};

export default Confession;
