import { useRef ,useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTruckFast,faSquareCaretUp,faMagnifyingGlass,faUser,faCircleDown,faTrash} from "@fortawesome/free-solid-svg-icons";
import styles from "../style/FileUpload.module.css"
import { useState } from "react";

function FileUpload() {
  const fileInputRef = useRef();
  const [files, setFiles] = useState([]);
  const [owner, setOwner] = useState("");
  function handleClick() {
    fileInputRef.current.click();
  }

    function upload(e) {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("owner", owner); // 👈 gửi kèm owner

    fetch("https://server-67ff.onrender.com/upload", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        // Thêm file mới vào state từ response
        setFiles((prev) => [...prev, data.file]);
      });
  }
  function handleDownload(filename) {
    fetch(`https://server-67ff.onrender.com/upload/${filename}`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
    function handleDelete(filename) {
    fetch(`https://server-67ff.onrender.com/delete/${filename}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== filename));
      })
      .catch((err) => console.log("Error deleting file:", err));
    }
    useEffect(() => {
       const user = localStorage.getItem("username");
        if (user) {
        setOwner(user);
      }
       const filesFromServer = data.map((file) => ({
  name: file.name,
  owner: file.owner,
  date: file.date,
  size: file.size,
}));
  return (
    <>
      <Helmet>
        <title>We Drive</title>
      </Helmet>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <FontAwesomeIcon id="icon" icon={faTruckFast} />
              <button>We Drive</button>
            </div>
            <div className={styles.upload}>
              <button onClick={handleClick}>
                UploadFile
                <FontAwesomeIcon icon={faSquareCaretUp} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={upload}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.search}>
              <input placeholder="Search Anything....." type="text" />
              <FontAwesomeIcon id="icon" icon={faMagnifyingGlass} />
            </div>
            <div className={styles.user}>
              <FontAwesomeIcon id="icon" icon={faUser} />
              <button>{owner}</button>
            </div>
          </div>

          <div className={styles.file}>
            <div className="name">
              <p>Name</p>
            </div>
            <div className="owner">
              <p>Owner</p>
            </div>
            <div className="date">
              <p>Date</p>
            </div>
            <div className="size">
              <p>size</p>
            </div>
            <div>
              <p>download</p>
            </div>
          </div>
          <div className={styles.file_ctn}>
            {files.map((f, idx) => (
              <div key={idx} className={styles.ctn}>
                <div className="name">
                  <p>{f.name}</p>
                </div>
                <div className="owner">
                  <p>{f.owner}</p>
                </div>
                <div className="date">
                  <p>{f.date}</p>
                </div>
                <div className="size">
                  <p>{f.size}</p>
                </div>
                <div>
                  <button onClick={() => handleDownload(f.name)}>
                    <FontAwesomeIcon icon={faCircleDown} />
                  </button>
                  <button onClick={() => handleDelete(f.name)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default FileUpload;
