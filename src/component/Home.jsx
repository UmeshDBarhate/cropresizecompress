import React, { useRef, useState } from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { cropimgatom, resizeimage ,optimizeimgatom} from "./atoms";
import { useAtom } from "jotai";
import CropImage from "./CropImage";
import Uploadimage from "./Uploadimage";
import ResizeImage from "./ResizeImage";
import Optimizeimg from "./Optimizeimg";

const Home = () => {
  const [Cropimg, setCropimg] = useAtom(cropimgatom);
  const[resizeimg,setResizeimg]=useAtom(resizeimage)
  const[optimizeimage,setOptimizeimage]=useAtom(optimizeimgatom)

  console.log(Cropimg);

  let show;
  if (Cropimg) {
    show = <CropImage />;
  }else if(resizeimg){
    show=<ResizeImage/>
  }else if(optimizeimage){
    show=<Optimizeimg/>
  }
  else {
    show = <Uploadimage />;
  }
  return (
    <Segment>
      <Grid columns={2} relaxed="very">
        <Grid.Column width={3}>
          <div className="imgbuttons">
            <Button
              primary
              className="button"
              onClick={() => setCropimg(!Cropimg)}
            >
              Crop
            </Button>

            <Button primary className="button"
            onClick={()=>setResizeimg(!resizeimg)}>
              Resize
            </Button>

            <Button primary className="button"
            onClick={()=>setOptimizeimage(!optimizeimage)}>
              Optimize
            </Button>
          </div>
        </Grid.Column>

        <Grid.Column width={13}>
          <Segment placeholder>{show}</Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Home;
