import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateIcon from '@material-ui/icons/Update';

function Captcha({ getCapchaVerified }) {
  const [username, setUsername] = useState("");
  const characters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz1234567890@#%";
  const [captcha, setCaptcha] = useState(generateCaptcha());

  function generateString(length) {
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

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = () => {
    const successButton = document.getElementById("successBTN");
    successButton.style.cursor = "wait";
    successButton.innerHTML = "Checking...";
    successButton.disabled = true;

    if (captcha.value === username) {
      getCapchaVerified(true);
      successButton.style.backgroundColor = "green";
      successButton.innerHTML = "Captcha Verified";
      successButton.disabled = true;
      successButton.style.cursor = "not-allowed";
    } else {
      successButton.style.backgroundColor = "red";
      successButton.style.cursor = "not-allowed";
      successButton.innerHTML = "Not Matched";
      successButton.disabled = true;

      const resetButtonState = () => {
        successButton.style.backgroundColor = "#007bff";
        successButton.style.cursor = "pointer";
        successButton.innerHTML = "Verify Captcha";
        successButton.disabled = false;
        setUsername("");
        setCaptcha(generateCaptcha());
      };

      getCapchaVerified(false);
      setTimeout(resetButtonState, 3000);
    }
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  return (
    <div className="container" style={{ paddingTop: "0px" }}>
      <div className="row d-flex flex-50">
        <input
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
        </h4><span style={{
          width: "10%",
          height: "10%",
          paddingLeft: 6,
          backgroundColor: "aliceblue"
        }}
          onClick={refreshCaptcha}><UpdateIcon /></span>
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
          }}
        >
          Verify Captcha
        </button>

      </div>
    </div>
  );
}

export default Captcha;
