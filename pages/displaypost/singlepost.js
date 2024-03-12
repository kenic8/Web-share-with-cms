"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Link from "next/link";

function DisplaySinglePost({ props }) {
  ////skal modtage url param
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const user = useAuthContext();
  const [Data, setData] = useState([]);
  const creator =
    Data.created_by && Data.created_by.lastname
      ? Data.created_by.firstname + " " + Data.created_by.lastname
      : "Unknown";

  const handleGet = async (e) => {
    const fetch = await getDoument(id,"content-pages");
    const content = fetch.result;
    setData(content);
  };

  // console.log(Data)
  useEffect(() => {
    // Update the document title using the browser API
    handleGet();
  }, [Data.length]);

  let whoami;
  if (user != null) {
    whoami = user["uid"];
    return (
      <div className="frontpage-grid">
        <div className="content-wrapper">
          {/* {console.log(data.category)} */}
          <h1>{Data.page_heading} </h1>
          <div className="meta-info">
            <h5>Creation date: {Data.created_at}</h5>
            <h5>Last updated: {Data.updated_at}</h5>
          </div>

          {Data.content_blocks?.map((contentItem, index) => (
            <div key={index}>
            

              <div key={index}>
                {contentItem.__component === "content.image-content" && (
                  <div>
                    <img
                      src={`http://192.168.88.201:8080${contentItem.Image_content.url}`}
                      alt="Image"
                    />
                  </div>
                )}
                {contentItem.__component === "content.image-text-content" && (
                  <div>
                    <h3>{contentItem.Image_heading}</h3>
                    <img
                      src={`http://192.168.88.201:8080${contentItem.Image_content[0].url}`}
                      alt="Image"
                    />
                    <h3>{contentItem.text_heading}</h3>
                    <p>{contentItem.text_content}</p>
                    <div>
                      <p>{contentItem.content}</p>
                    </div>
                  </div>
                )}
                {contentItem.__component === "content.text-content" && (
                  <div>
                    <h4>{contentItem.heading}</h4>
                    <p>{contentItem.text_content}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <h3>Creator: {creator}</h3>
        </div>
      </div>
    );
  } else {
    return router.push("/frontpage");
  }
}

export default DisplaySinglePost;
