import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const IfamePage = () => {
  const location = useLocation();

  // console.log(location);
  // console.log(location.search);

  let urlRegex = /(https?:\/\/[^\s]+)/g;
  let url2 = urlRegex.exec(location.search)[0];
  let regex =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
  let match = url2.match(regex);
  let video_id;
  if (match && match[1]) {
    video_id = match[1];
    console.log(video_id);
  }
  let pattern = /^https?:\/\/(www\.)?youtube\.com/;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {pattern.test(url2) && 
          <iframe
            width="500"
            height="500"
            src={`https://www.youtube.com/embed/${video_id}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        }
        {pattern.test(url2) ||
          <iframe
            width="500"
            height="500"
            src={url2}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        }
       
        <div
          style={{
            position: "absolute",
            top: "300px",
            right: "120px",
          }}
        >
          <Link to="/">
            <button className="ui blue button">Back To Media List</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default IfamePage;
