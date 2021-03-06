import React, { useState } from "react";

export function InputImage() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [state, setState] = useState({ url: false });
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    setState({ url: true });
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "block",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
      }}
      className="mx-auto"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none",
        }}
      />
      <div onClick={() => imageUploader.current.click()}>
        <img
          src="/img/uploadImage.png"
          ref={uploadedImage}
          style={{
            width: "400pX",
            maxHeight: 300,
            position: "relative",
          }}
        />
      </div>
      {!state.url ? (
        <div className="mt-3 text-warning text-center">
          {" تصویر خود را انتخاب کنید."}
        </div>
      ) : (
        <div className="text-success mt-3 text-center">
          تصویر با موفقیت انتخاب شد.
        </div>
      )}
    </div>
  );
}
