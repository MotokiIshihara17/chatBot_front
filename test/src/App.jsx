import { useEffect, useState, useRef } from "react";
import { Text, Input, Button, ImageOffIcon } from "@yamada-ui/react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("stay");
  const [inputValue, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [datas, setDatas] = useState("");
  const [imageSrc, setImage] = useState("");
  let data;
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const promptChange = (e) => {
    setPrompt(e.target.value);
  };

  const imgChange = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const url = new FileReader();
      url.readAsDataURL(imgFile);
      url.onload = () => {
        const imgData = url.result.split(",")[1];
        console.log(imgData);
        setImage(imgData);
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function uploadData() {
      console.log(inputValue);
      const response = await fetch("https://chatbot-back-ja86.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          ques: inputValue,
          img: imageSrc,
        }),
      });
      let data = await response.text();
      setDatas(data);
      console.log(data);
    }

    uploadData();
  };

  return (
    <>
      <form className="userform" onSubmit={handleSubmit}>
        <div id="text">AI技術検証モード</div>
        <div id="imgBox">
          <p id="img">画像</p>
          <Input
            type="file"
            accept="image/*"
            onChange={imgChange}
            className="inputImg"
          ></Input>
        </div>
        <div id="promptBox">
          <p id="prompt">前段の指示</p>
          <Input
            type="text"
            className="input"
            value={prompt}
            onChange={promptChange}
            required
          />
        </div>
        <div id="contextBox">
          <p id="context">文脈</p>
          <Input
            type="text"
            className="input"
            value={inputValue}
            onChange={handleChange}
            required
          />
        </div>
        <div>{datas}</div>

        <Button id="user-button" type="submit">
          送信する
        </Button>
        <Button
          id="backButton"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ホーム画面に戻る
        </Button>
      </form>
    </>
  );
}

export default App;
