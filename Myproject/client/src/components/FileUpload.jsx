import { useRef ,useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTruckFast,faSquareCaretUp,faMagnifyingGlass,faUser,faCircleDown,} from "@fortawesome/free-solid-svg-icons";
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

    fetch('http://localhost:3000/upload', {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
      setFiles(prevFiles => [...prevFiles, {
        name:file.name,
        owner:owner,
        date: new Date().toLocaleDateString(),
        size:Math.round(file.size/1024)+"kb"
      }]);
  }
  function handleDownload(filename) {
    fetch(`http://localhost:3000/upload/${filename}`)
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
  
    useEffect(() => {
       const user = localStorage.getItem("username");
        if (user) {
        setOwner(user);
      }
        }, []);
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
