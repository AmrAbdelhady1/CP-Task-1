import { ChangeEvent } from "react";
import classes from "./style.module.css";
import uploadIcon from "../../assets/images/uploadIcon.png";
import DeleteIconSvg from "../../assets/svg/deleteIcon";

interface Props {
  imageUrl: string;
  onChange: (value: string) => void;
}

export const UploadImage = ({ imageUrl, onChange }: Props) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const url = URL.createObjectURL(selectedFile);
      onChange(url);
    }
  };

  const deleteImage = () => {
    onChange("");
  };

  return (
    <div className={classes.layout}>
      {!imageUrl ? (
        <>
          <div className={classes.headerContainer}>
            <h1 className={classes.header}>Upload cover image</h1>
          </div>

          <div className="px-10 py-[63.56px]">
            <label
              htmlFor="image-uploader"
              className={classes.uploaderContainer}
            >
              <input
                type="file"
                id="image-uploader"
                className="w-full h-full hidden"
                onChange={handleFileChange}
              />
              <img
                src={uploadIcon}
                alt="upload-icon"
                className="w-[33px] h-[33px]"
              />
              <p className={`${classes.header} !text-sm mt-2`}>
                Upload cover image
              </p>
              <p className={`${classes.header} !text-sm !text-[#979797] mt-2`}>
                16:9 ratio is recommended. Max image size 1mb
              </p>
            </label>
          </div>
        </>
      ) : (
        <>
          <img src={imageUrl} alt="uploaded-image" className={classes.image} />
          <div
            className="flex items-center p-7 gap-1 cursor-pointer"
            onClick={deleteImage}
          >
            <DeleteIconSvg />
            <p className={classes.deleteText}>Delete & re-upload</p>
          </div>
        </>
      )}
    </div>
  );
};
