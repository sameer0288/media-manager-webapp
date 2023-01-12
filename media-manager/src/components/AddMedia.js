import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
  
const AddMedia = (props) => {
  const navigate =useNavigate();
  const [state, setState] = useState({
    category: "",
    name: "",
    link: "",
  });

  const create = (e) => {
    e.preventDefault();

    if (state.category === "" || state.name === "" || state.link === "") {
      alert("All field are mandatory!!");
      return;
    }
    props.addMediaHandler(state);
    setState({ category: "", name: "", link: "" });
    
    console.log(props);
    navigate('/')
  };

  return (
    <div className="ui main">
      <h2>Create Media</h2>
      <form className="ui form" onSubmit={create}>
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
          Create
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

export default AddMedia;
