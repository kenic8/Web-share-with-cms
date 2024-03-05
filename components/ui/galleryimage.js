import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function Galleryimage({ props }) {
  let link = "/displaypost/singlepost?id=" + props.id;
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
                <FavoriteIcon className="svg-like"></FavoriteIcon>
                <FileDownloadIcon className="svg-down"></FileDownloadIcon>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}
