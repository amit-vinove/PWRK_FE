import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateIcon from '@material-ui/icons/Update';

function Captcha({ getCapchaVerified }) {
  const [username, setUsername] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const inputRef = useRef(null);


  function generateString(length) {
    const characters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz1234567890@#%";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generateCaptcha() {
    return {
      value: generateString(6),
    };
  }

  useEffect(() => {
    if (captcha.value === username) {
      verifyCaptcha();
    }
  }, [captcha]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const verifyCaptcha = () => {
    getCapchaVerified(true);
    inputRef.current.style.backgroundColor = "green";
    inputRef.current.disabled = true;
    inputRef.current.style.cursor = "not-allowed";
  };

  const onSubmit = () => {
    if (captcha.value === username) {
      verifyCaptcha();
    } else {
      inputRef.current.style.backgroundColor = "red";
      inputRef.current.style.cursor = "not-allowed";
      inputRef.current.disabled = true;

      setTimeout(() => {
        inputRef.current.style.backgroundColor = "";
        inputRef.current.style.cursor = "auto";
        inputRef.current.disabled = false;
        setUsername("");
        setCaptcha(generateCaptcha());
      }, 3000);

      getCapchaVerified(false);
    }
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    inputRef.current.style.backgroundColor = "";
    inputRef.current.disabled = false;
    inputRef.current.style.cursor = "auto";
  };

  return (
    <div className="container" style={{ paddingTop: "0px" }}>
      <div className="row d-flex flex-50">
        <input
          ref={inputRef}
          style={{ width: "50%" }}
          type="text"
          id="inputType"
          className="form-control"
          placeholder="Enter Captcha"
          value={username}
          onChange={handleChange}
          autoComplete="off"
        />
        <h4
          id="captcha"
          className="px-auto"
          style={{ width: "40%", paddingLeft: 25, paddingBottom: 5 }}
        >
          {captcha.value}
        </h4>
        <span
          style={{
            width: "10%",
            height: "10%",
            paddingLeft: 6,
            backgroundColor: "aliceblue",
            visibility: inputRef.current && inputRef.current.disabled ? "hidden" : "visible"
          }}
          onClick={refreshCaptcha}
        >
          <UpdateIcon />
        </span>
        <button
          type="button"
          id="successBTN"
          onClick={onSubmit}
          className="btn btn-primary btn-sm"
          style={{
            width: "124px",
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 10,
            visibility: inputRef.current && inputRef.current.disabled ? "hidden" : "visible"
          }}
        >
          Verify Captcha
        </button>
      </div>
    </div>
  );
}

export default Captcha;
