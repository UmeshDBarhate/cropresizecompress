import React,{useRef} from "react";
import { useAtom } from "jotai";
import { uploadatom, selectimgatom, cropimgatom } from "./atoms";
import { Divider, Grid, Image, Segment, Button } from "semantic-ui-react";

const Uploadimage = () => {
  const imgRef = useRef();
  const [uploadimg, setUploadimg] = useAtom(uploadatom);
  const [selectedimg, setSelectedimg] = useAtom(selectimgatom);
  

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedimg(reader.result);
        setUploadimg(!selectedimg);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      {uploadimg ? (
        <Image src={selectedimg} size="large" />
      ) : (
        <>
          <input
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/*"
            ref={imgRef}
          />
          <Button
            primary
            onClick={() => {
              imgRef.current.click();
            }}
          >
            Add Document
          </Button>
        </>
      )}
    </>
  );
};

export default Uploadimage;
