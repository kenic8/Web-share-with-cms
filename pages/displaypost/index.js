"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import Link from "next/link";

////////

function DisplayPost({ props }) {
  ////skal modtage url param
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthContext();
  const creator =
  props.created_by && props.created_by.lastname
    ? props.created_by.firstname + " " + props.created_by.lastname
    : "Unknown";

  let whoami;
  if (user != null) {
    whoami = user["uid"];
    let link = "/displaypost/singlepost?id=" + props.id;
    return (
      <div className="content-wrapper-template" id={props.page_heading}>
        <div className="sub-content-wrapper">
          <h1>{props.page_heading} </h1>
          <div className="meta-info">
            <h3>Creation date: {props.created_at}</h3>
            <h3>Last updated: {props.updated_at}</h3>
          </div>
         {console.log(props)}
          {props.content_blocks?.map((contentItem, index) => (

            console.log( "iam item", contentItem),
            <div key={index}>
              <h3> Section {index + 1}</h3>

              <div key={index}>
                {contentItem.__component === "content.image-content" && (
                  <div>
                    <img
                      src={
                        `http://192.168.88.201:8080${contentItem.Image_content.url}`
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
                        `http://192.168.88.201:8080${contentItem.Image_content[0].url}`
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
                    <p>{contentItem.text_content.text}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <h3>Creator: {creator}</h3>
          <Link className="se-mere-button" href={link}>
            {" "}
            <p>mere info</p>{" "}
          </Link>
        </div>
      </div>
    );
  } else {
    return router.push("/frontpage");
  }
}

export default DisplayPost;
