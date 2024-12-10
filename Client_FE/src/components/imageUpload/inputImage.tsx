import React from "react";

const image = document.querySelector<HTMLImageElement>("img");
const input = document.querySelector<HTMLImageElement>("input");
input?.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    image!.src = URL.createObjectURL(target.files[0]);
  }
});
const inputImage = () => {
  return (
    <div>
      <h2>Upload Input</h2>
      <img alt="" />
      <form action="index.html" method="post">
        <input type="file" name="file" id="file" />
        <label htmlFor="file">Select a file...</label>
      </form>
    </div>
  );
};

export default inputImage;
