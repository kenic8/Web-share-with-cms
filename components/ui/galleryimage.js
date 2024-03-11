import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { likeImage } from "@/firebase/database/imagelike";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { removeLikedImage } from "@/firebase/database/imagelike";
import { getLikedImages } from "@/firebase/database/imagelike";
import { useState, useEffect } from "react";

export default function Galleryimage({ props, user, id }) {
  const [liked, setLiked] = useState(false);
  // // console.log(user);
  let link = "/displaypost/singlepost?id=" + props.id;

  const handleClicklike = (user) => {
    likeImage(user.uid, props.id);
    setLiked(true);
  };

  const handleClickdislike = (user) => {
    console.log(user);
    removeLikedImage(user.uid, props.id);
    setLiked(false);
  };

  ///check if liked
  const isliked = async function Matchimages(user, imageid) {
    const userimages = await getLikedImages(user.uid);
    return userimages.includes(imageid);
  };

  useEffect(() => {
    async function fetchData() {
      const likedStatus = await isliked(user, props.id);
      setLiked(likedStatus);
    }

    fetchData();
  }, [props.id]);

  return (
    <>
      <div className="image-card">
        <Card sx={{ maxWidth: 4 / 4 }}>
          <CardActionArea>
            <CardMedia
              sx={{ height: 150 }}
              image={`http://192.168.88.201:8080${props.page_teaser.url}`}
            />
            <div className="button-grid ">
              <div className="b-right">
                <FavoriteIcon
                  onClick={() => {
                    if (liked) {
                      handleClickdislike(user)
                    } else {
                      handleClicklike(user)
                    }
                  }}
                  className={liked === true ? "svg-like" : "svg-not-like"}
                ></FavoriteIcon>
                <FileDownloadIcon className="svg-down"></FileDownloadIcon>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}
