import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "../api/medias";
import Header from "./Header";
import AddMedia from "./AddMedia";
import MediaList from "./MediaList";
import IframePage from "./IfamePage.jsx";
import "./App.css";
import EditMedia from "./EditMedia";

const App = () => {
  // const LOCAL_STORAGE_KEY = "medias";
  const [medias, setMedias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //   JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  // );

  // RetriveMedias
  const retriveMedias = async () => {
    const response = await api.get("https://server-api-b2zx.onrender.com/medias");
    return response.data;
  };

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const addMediaHandler = async (media) => {
    const request = {
      id: randomNumberInRange(1, 9999),
      ...media,
    };

    const response = await api.post("https://server-api-b2zx.onrender.com/medias", request);
    setMedias([...medias, response.data]);
  };

  const removeMediaHandler = async (id) => {
    await api.delete(`https://server-api-b2zx.onrender.com/medias/${id}`);
    const newMediaList = medias.filter((media) => {
      return media.id !== id;
    });
    setMedias(newMediaList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newMediaList = medias.filter((media) => {
      return Object.values(media)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newMediaList);
    }
    else{
      setSearchResults(medias);
    }
  };
  const updateMediaHandler = async (media) => {
    const response = await api.put(`https://server-api-b2zx.onrender.com/medias/${media.id}`, media);
    const { id, category, name, link } = response.data;
    setMedias(
      medias.map((media) => {
        return media.id === id ? { ...response.data } : media;
      })
    );
  };

  useEffect(() => {
    //   const retriveMedias = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //   if (retriveMedias) setMedias(retriveMedias);
    const getAllMedias = async () => {
      const allMedias = await retriveMedias();
      if (allMedias) setMedias(allMedias);
    };
    getAllMedias();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(medias));
  }, [medias]);
  return (
    <Router>
      <Header />
      <div className="ui container">
        <Routes>
          <Route path="/media/:id" element={<IframePage />} />
          <Route
            path="/"
            element={
              <MediaList
                medias={searchTerm.length < 1 ? medias:searchResults}
                getMediaId={removeMediaHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/create"
            element={<AddMedia addMediaHandler={addMediaHandler} />}
          />
          <Route
            path="/edit/:id"
            element={<EditMedia updateMediaHandler={updateMediaHandler} />}
          />

          {/* <AddMedia addMediaHandler={addMediaHandler} />
        <MediaList medias={medias} getMediaId={removeMediaHandler} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
