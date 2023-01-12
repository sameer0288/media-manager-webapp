import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/medias"

const EditMedia = (props) => {
  const {id}=useParams()
  const navigate=useNavigate()
  const [state, setState] = useState({
    id,
    category: "",
    name: "",
    link: "",
  });

  const update = (e) => {
    e.preventDefault();

    if (state.category === "" || state.name === "" || state.link === "") {
      alert("All field are mandatory!!");
      return;
    }
    console.log("state",state)
    props.updateMediaHandler(state);
    setState({ category: "", name: "", link: "" });
    navigate('/')
    console.log(props);
  };


  useEffect(() => {
    const sameer = async () => {
      const response=await api.get(`https://server-api-b2zx.onrender.com/medias/${id}`);
      console.log(response.data)
      setState(response.data)
      };

      sameer()

  }, [])
  

  return (
    <div className="ui main">
      <h2>Update Media</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Bucket</label>
          <input
            type="text"
            name="category"
            placeholder="Bucket"
            value={state.category}
            onChange={(e) => setState({ ...state, category: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </div>
        <div className="link">
          <label>Link</label>
          <input
            type="url"
            name="link"
            placeholder="Link"
            value={state.link}
            onChange={(e) => setState({ ...state, link: e.target.value })}
          />
        </div>

        <button className="ui button blue" style={{ marginTop: "15px" }}>
          Update
        </button>
      </form>
      <Link to="/">
        <button className="ui button blue" style={{ float: "right" }}>
          Media List
        </button>
      </Link>
    </div>
  );
};

export default EditMedia;
