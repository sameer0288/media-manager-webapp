import React, { useRef } from "react";
import MediaCard from "./MediaCard";
import { Link } from "react-router-dom";

const MediaList = (props) => {
  const inputE1 = useRef("");
  const deleteMediaHandler = (id) => {
    props.getMediaId(id);
  };

  const renderMediaList = props.medias.map((media) => {
    return (
      <MediaCard
        media={media}
        clickHandler={deleteMediaHandler}
        key={media.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputE1.current.value);
  };

  return (
    <div className="main">
      <h2>
        Media List
        <Link to="/create">
          <button className="ui button blue" style={{ float: "right" }}>
            Create Media
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input" style={{ width: "50vw" }}>
          <input
            ref={inputE1}
            type="text"
            placeholder="Search Media"
            className="prompt"
            style={{ border: ".3px solid gray" }}
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon" style={{ fontSize: "1.2rem" }}></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderMediaList.length > 0 ? renderMediaList : "No Media available"}
      </div>
    </div>
  );
};

export default MediaList;
