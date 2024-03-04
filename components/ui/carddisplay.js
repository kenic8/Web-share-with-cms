import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Carddisplay({ props }) {
  // console.log("hej", props.attributes.page_tags[0].meta_tags);
  // let link = "/updatepost?id=" + props.id;

  console.log(props)
  let link = "/displaypost/singlepost?id=" + props.id;
  return (
    <>
      <Link className="post-link" href={link} props={props}>
        <Card sx={{ maxWidth: 4/4 }}>
          <CardActionArea>
          
            <CardMedia
              sx={{ height: 220 }}
              image={`http://192.168.88.201:8080${props.page_teaser.url}`}
              title="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {props.page_category}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {props.page_heading}
              </Typography>
              <Typography
                gutterBottom
                sx={{ maxWidth: 4 / 4 }}
                variant="h7"
                component="div"
              >
                {props.created_by.firstname + " " + props.created_by.lastname}
              </Typography>

           
              <div className="card-flex-button">
                {props.page_tags.meta_tags &&
                  props.page_tags.meta_tags.includes("kode") && (
                    <p className="tag-template" variant="outlined">
                      Kode
                    </p>
                  )}

                {props.page_tags.meta_tags &&
                  props.page_tags.meta_tags.includes("interaktiv") && (
                    <p className="tag-quiz">Interaktiv</p>
                  )}

                {props.page_tags.meta_tags &&
                  props.page_tags.meta_tags.includes("multiplechoice") && (
                    <p className="tag-video">Multiplechoice</p>
                  )}
              </div>
            </CardContent>
            {props.page_category && props.page_category.includes("quiz") && (
              <CardMedia
                component="img"
                height="5"
                image="./templateblue.png"
                alt="card-content"
                loading="lazy"
              />
            )}

            {props.page_category &&
              props.page_category.includes("template") && (
                <CardMedia
                  component="img"
                  height="5"
                  image="./templatepink.png"
                  alt="card-content"
                  loading="lazy"
                />
              )}

            {props.page_category && props.page_category.includes("video") && (
              <CardMedia
                component="img"
                height="5"
                image="./templatered.png"
                alt="card-content"
                loading="lazy"
              />
            )}
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}
