"use client";
import React from "react";
import { useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
export default function Search(props) {
  let filter = [];
  let matcharr = [];
  let element;
  let queryData = [];
  console.log(props.data.result.data)
  let data = [...props.data.result.data];
  const changeQuery = props.query;
  useEffect(() => {
    changeQuery(queryData);
  }, [queryData.length]);

  const handleSearch = (v, f) => {
    f = [];
    let value = v.toLowerCase();
    matcharr = value.split(" ");

    let searchResults = data.filter((elm) => {
      console.log(elm)
      let wordArr = elm.attributes.page_heading
        .toLowerCase()
        .split(" ")
        .filter((str) => str !== "");
      // console.log(elm.data.tags);
      element = elm;
      console.log(typeof elm.attributes.page_tags[0].meta_tags)
      const tagarray = elm.attributes.page_tags[0].meta_tags.split(" ");
     return  wordArr.some(item => matcharr.includes(item) || tagarray.some(tag => matcharr.includes(tag)));
    });
    // console.log(searchResults.length);
    ///puhser elm arr
    if (searchResults.length != 0 && v != "") {
      console.log("pushed");
      searchResults.forEach((element) => {
        f.push(element);
      });
      changeQuery(f);
      return;
    }

    changeQuery([]);
    console.log(f);
    // <-----------> query
  };

  return (
    <div className="wrapper">
        <SearchIcon></SearchIcon>
        <input
          onKeyUp={(e) => handleSearch(e.target.value, filter)}
          required
          type="input"
          name="text"
          rows="15"
          cols="50"
          id="search"
          placeholder="Quiz,Templates"
        />
      </div>
   
  );
}
