import React, { useEffect } from "react";
import { Grid, Segment, Input, Button } from "semantic-ui-react";
import { imgheight, imgwidth, selectimgatom, resizeimage } from "./atoms";
import { useAtom } from "jotai";

const ResizeImage = () => {
  const [selectedimg, setSelectedimg] = useAtom(selectimgatom);
  const [height, setHeight] = useAtom(imgheight);
  const [width, setWidth] = useAtom(imgwidth);
  const [resizecompo, setResizecompo] = useAtom(resizeimage);

  console.log(width);
  console.log(height);
  const setResize = () => {
    const Resizeimg = new Image();
    Resizeimg.src = selectedimg;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height =height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      Resizeimg,
      0,
      0,
      width,
      height,
      0,
      0,
      width,
      height
    );
    const resizeImageUrl = canvas.toDataURL("image/jpeg");
    setSelectedimg(resizeImageUrl);
    setResizecompo(!resizecompo);
  };
  useEffect(() => {
    const imageElement = new Image();
    imageElement.src = selectedimg;

    imageElement.addEventListener("load", () => {
      setWidth(imageElement.naturalWidth);
      setHeight(imageElement.naturalHeight);
    });

    return () => {
      // Cleanup event listener if component unmounts
      imageElement.removeEventListener("load", () => {
        setWidth(imageElement.naturalWidth);
        setHeight(imageElement.naturalHeight);
      });
    };
  }, [selectedimg]);
  return (
    <div className="resize-option-box">
      <div>
        <p>
          <label>Width</label>
        </p>
        <Input>
          <input
            type="number"
            value={width}
            onChange={(event) => {
              setWidth(parseInt(event.target.value));
              setHeight((width * 9) / 16);
            }}
          />
        </Input>
        <br />
        <br />
        <p>
          <label>Height</label>
        </p>
        <Input>
          <input
            type="number"
            value={height}
            onChange={(event) => {
              setHeight(parseInt(event.target.value));
              setWidth((height * 16) / 9);
            }}
          />
        </Input>
      </div>

      <div className="dropdown-box">
        <p>
          <label>select ratio</label>
        </p>
        <Input>
          <input type="text" value="px" disabled />
        </Input>
      </div>
      <Button primary className="button" onClick={setResize}>
        Resize img
      </Button>
    </div>
  );
};

export default ResizeImage;
