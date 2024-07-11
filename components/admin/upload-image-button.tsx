import React from "react";
import { Button } from "../ui/button";

const UploadImageButton = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <>
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        // accept="images/*"
        onChange={handleImageChange}
      />
      <Button
        onClick={() => fileInputRef.current.?.click()}
        type="button"
        className="w-full"
        variant="outline"
      >
        {imageFile?.name || "Coose Image"}
      </Button>
    </>
  );
};

export default UploadImageButton;
