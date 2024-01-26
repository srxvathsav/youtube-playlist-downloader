import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [displayLink, setDisplaylink] = useState("");

  useEffect(() => {
    // Fetch initial message from the server when the component mounts
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const onChangeHandler = (e) => {
    setDisplaylink(e.target.value);
  };

  const onClickHandler = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to submit the YouTube video URL
      const response = await fetch("http://localhost:8000/submitUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: displayLink }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response JSON
      const responseData = await response.json();
      console.log(responseData);

      // Clear the input field
      setDisplaylink("");

      // Uncomment the line below if you want to trigger the client-side download
      // downloadFile(responseData.downloadLink);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to trigger client-side download
  // const downloadFile = (downloadLink) => {
  //   const anchor = document.createElement("a");
  //   anchor.href = downloadLink;
  //   anchor.download = "downloadedFile.mp3"; // Set desired filename
  //   anchor.click();
  // };

  return (
    <div className="App">
      <h2>{message}</h2>
      <form>
        <input
          className="form-control"
          type="url"
          placeholder="Playlist link"
          value={displayLink}
          onChange={onChangeHandler}
        />
        <button className="btn btn-primary" onClick={onClickHandler}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;


