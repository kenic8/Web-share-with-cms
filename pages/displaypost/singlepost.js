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
    Data.createdBy &&
    Data.createdBy.data &&
    Data.createdBy.data.attributes &&
    Data.createdBy.data.attributes.firstname &&
    Data.createdBy.data.attributes.lastname
      ? Data.createdBy.data.attributes.firstname +
        " " +
        Data.createdBy.data.attributes.lastname
      : "Unknown";

  const handleGet = async (e) => {
    const fetch = await getDoument(id);
    const content = fetch.result.data.attributes;
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
            <h3>Creation date: {Data.createdAt}</h3>
            <h3>Last updated: {Data.updatedAt}</h3>
          </div>

          {Data.content_blocks?.map((contentItem, index) => (
            <div key={index}>
              <h3> Section {index + 1}</h3>

              <div key={index}>
                {contentItem.__component === "content.image-content" && (
                  <div>
                    <img
                      src={
                        "http://localhost:1337" +
                        contentItem.Image_content.data.attributes.url
                      }
                      alt="Image"
                    />
                  </div>
                )}
                {contentItem.__component === "content.image-text-content" && (
                  <div>
                    <h4>{contentItem.Image_heading}</h4>
                    <img
                      src={
                        "http://localhost:1337" +
                        contentItem.Image_content.data.attributes.url
                      }
                      alt="Image"
                    />
                    <h4>{contentItem.text_heading}</h4>
                    <p>{contentItem.text_content}</p>
                    <div>
                      <p>{contentItem.content}</p>
                    </div>
                  </div>
                )}
                {contentItem.__component === "content.text-content" && (
                  <div>
                    <h4>{contentItem.heading}</h4>
                    <p>{contentItem.text_content[0].children[0].text}</p>
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
