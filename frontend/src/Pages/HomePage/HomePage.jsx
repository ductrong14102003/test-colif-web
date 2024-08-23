import React, { useEffect, useState, useMemo } from "react";
import Banner from "./Banner/Banner";
import Offers from "./Offers/Offers";
import NewCollections from "./NewCollections/NewCollections";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Popular from "./Popular/Popular";

const HomePage = () => {
  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);

  const fetchInfo = () => {
    fetch("http://localhost:4000/popularinwomen")
      .then((res) => res.json())
      .then((data) => setPopular(data));
    fetch("http://localhost:4000/newcollections")
      .then((res) => res.json())
      .then((data) => setNewCollection(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <Banner />
      <Popular data={popular} />
      <Offers />
      <NewCollections data={newcollection} />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
