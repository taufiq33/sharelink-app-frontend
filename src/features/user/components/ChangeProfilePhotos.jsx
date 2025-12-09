import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { ALLOWED_IMAGE_TYPE } from "../schemas/UpdateProfileSchema";
import defaultPhotoProfile from "@/assets/defaultPhotoProfile.webp";

export default function ChangeProfilePhotos({
  isRemoved,
  handlePhotoRemoved,
  user,
  zodControl,
}) {
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  function handleFileSelected(e) {
    if (e.target.files.length > 1 || e.target.files.length === 0) {
      console.log("1 image File must be uploaded");
      return false;
    }

    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  return (
    <div className="photo-profile flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-3">
      <img
        className="w-20 h-20 rounded-full mr-4"
        src={
          isRemoved ? defaultPhotoProfile : preview ? preview : user.avatarUrl
        }
        alt=""
      />

      <Controller
        name="photoProfile"
        control={zodControl}
        render={({ field }) => (
          <>
            <Button
              onClick={() => {
                fileRef.current.click();
              }}
              size="sm"
              type="button"
            >
              Change Photo
            </Button>

            <Input
              ref={fileRef}
              type="file"
              className={"hidden"}
              accept={ALLOWED_IMAGE_TYPE.join(",")}
              onChange={(e) => {
                field.onChange(e.target.files);
                handleFileSelected(e);
              }}
            />

            {!preview && (
              <Button
                disabled={isRemoved}
                onClick={handlePhotoRemoved}
                variant={"destructive"}
                size="sm"
              >
                Remove Photo
              </Button>
            )}
          </>
        )}
      />
    </div>
  );
}
