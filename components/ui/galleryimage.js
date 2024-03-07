import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { likeImage } from "@/firebase/database/imagelike";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { removeLikedImage } from "@/firebase/database/imagelike";

export default function Galleryimage({ props, user }) {
  console.log(user);
  let link = "/displaypost/singlepost?id=" + props.id;

  const handleClicklike = (user) => {
    likeImage(user.uid, props.id);
  };
  const handleClickdislike = (user) => {
    console.log(user);
    removeLikedImage(user.uid, props.id);
  };

  return (
    <>
      <div className="image-card">
        <Card sx={{ maxWidth: 4 / 4 }}>
          <CardActionArea>
            <CardMedia
              sx={{ height: 250 }}
              image={`http://192.168.88.201:8080${props.page_teaser.url}`}
            />
            <div className="button-grid ">
              <div className="b-right">
                <FavoriteIcon
                  onClick={() => handleClicklike(user)}
                  className="svg-like"
                ></FavoriteIcon>
                <ThumbDownIcon
                  onClick={() => handleClickdislike(user)}
                  className="svg-like"
                ></ThumbDownIcon>
                <FileDownloadIcon className="svg-down"></FileDownloadIcon>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}
