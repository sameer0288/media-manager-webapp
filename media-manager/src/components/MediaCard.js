import React from "react";
import { Link } from "react-router-dom";

const MediaCard = (props) => {
  const { id, category, name, link } = props.media;
  return (
    <div className="item">
      <div className="content">
        <Link to={`/media/${id}?url=${link}`}>
          <div className="header">{category}</div>
          <div style={{ marginTop: "5px" }}>{name}</div>

          <div style={{ marginTop: "5px" }}>{link}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{
          color: "red",
          marginBottom: "7px",
          marginLeft: "15px",
          fontSize: "1.6rem",
          float: "right",
        }}
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link to={`/edit/${id}`}>
        <i
          className="edit alternate outline icon"
          style={{
            color: "blue",
            marginBottom: "7px",
            fontSize: "1.6rem",
            float: "right",
          }}

        ></i>
      </Link>
    </div>
  );
};

export default MediaCard;
