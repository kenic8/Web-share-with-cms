import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { likeImage } from "@/firebase/database/imagelike";
import { removeLikedImage } from "@/firebase/database/imagelike";
import { getLikedImages } from "@/firebase/database/imagelike";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 800,
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  p: 4,
};

export default function Galleryimage({ props, user, id }) {
  const [liked, setLiked] = useState(false);

  const handleClicklike = (user) => {
    likeImage(user.uid, props.id);
    setLiked(true);
  };

  const handleClickdislike = (user) => {
    // // console.log(user);
    removeLikedImage(user.uid, props.id);
    setLiked(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Card sx={{ maxWidth: 4 / 4 }} >
        <div className="button-grid ">
              <div className="b-right">
                <FavoriteIcon
                  onClick={() => {
                    if (liked) {
                      handleClickdislike(user);
                    } else {
                      handleClicklike(user);
                    }
                  }}
                  className={liked === true ? "svg-like" : "svg-not-like"}
                ></FavoriteIcon>
                <FileDownloadIcon className="svg-down"></FileDownloadIcon>
              </div>
            </div>
          <CardActionArea  onClick={() => handleOpen()}>
            <CardMedia
              sx={{ height: 150 }}
              image={`http://192.168.88.201:8080${props.url}`}
             
            />
            
          </CardActionArea>
        </Card>
      </div>

      <div className="modal">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="box-modal">
            <div className="image-card-modal">
              <div className="image-card-modal-image">
              <div className="button-grid-modal ">
                <h5>Muligheder</h5>
                  <div className="b-right">
                    <FavoriteIcon
                      onClick={() => {
                        if (liked) {
                          handleClickdislike(user);
                        } else {
                          handleClicklike(user);
                        }
                      }}
                      className={liked === true ? "svg-like" : "svg-not-like"}
                    ></FavoriteIcon>
                    <FileDownloadIcon className="svg-down"></FileDownloadIcon>
                  </div>
                </div>
                <img
                  src={`http://192.168.88.201:8080${props.url}`}
                ></img>
             
              </div>

              <div className="image-card-modal-info">
                <button>Download</button>
                <h3>Fil type:</h3>
                <p>EPS, JPG</p>
                <h3>Type</h3>
                <p>video</p>
                <h3>tags</h3>
                <p>Multiplechoice</p>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
