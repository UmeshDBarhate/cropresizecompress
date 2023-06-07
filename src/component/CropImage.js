import React, { useRef,useState } from "react";
import ReactCrop from "react-image-crop";
import { selectimgatom ,cropimgatom} from "./atoms";
import { useAtom } from "jotai";
import { Button} from "semantic-ui-react";

const CropImage = () => {
    const[aspect,setAspect]=useState(true)
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [Cropimg, setCropimg] = useAtom(cropimgatom);
  const cropimgref = useRef();
  const [selectedimg, setSelectedimg] = useAtom(selectimgatom);

  const handleCropComplete = (crop) => {
    console.log(crop);
    getCroppedImage(crop);

    
  };

  const getCroppedImage = (crop) => {
    const img = new Image()
    img.src = selectedimg
    console.log(img)

    
    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    
    canvas.width = crop.width;
    canvas.height = crop.height;
    
    console.log(canvas.width, canvas.height);
    const ctx = canvas.getContext("2d");
    

    ctx.drawImage(
      img,
      (crop.x * scaleX),
      (crop.y * scaleY),
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const croppedImageUrl = canvas.toDataURL("image/jpeg");
    setSelectedimg(croppedImageUrl);
    setCropimg(!Cropimg)

  };

  return (
    <>
    <Button onClick={()=>setAspect(!aspect)}>change aspect {aspect?"1/1":"16/9"}</Button>
    <div>
    <ReactCrop
      crop={crop}
      onChange={(newCrop) => setCrop(newCrop)}
      onComplete={handleCropComplete}
      aspect={aspect ? 16 / 9 : 1 / 1}
    >
      <img ref={cropimgref} src={selectedimg} alt="" />
      
    </ReactCrop>
    </div>
    </>
  );
};

export default CropImage;
