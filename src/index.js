import React from 'react';
const getBase64Image = (img) => {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let dataURL = canvas.toDataURL("image/png");
  return dataURL;
}
// blob 转 base64
const blobToDataURL = (blob, callback) => {
  let file = new FileReader();
  file.onload = (even) => callback(even.target.result);
  file.readAsDataURL(blob);
}
const MabyCompress = (props, complete) => {
  const { image, scale, canvas } = props;
  if (!image) {
    return undefined;
  }
  // 选择的文件对象
  let reader = new FileReader();
  let img = new Image();
  // 缩放图片需要的canvas
  let file = image;
  let blobImage = null;
  let originImage = null;
  // 目标尺寸
  let targetWidth = 0, targetHeight = 0;
  // base64地址图片加载完毕后
  let canvasDom = canvas || document.createElement('canvas');
  let context = canvasDom.getContext('2d');
  if (file.type.indexOf("image") == 0) {
    reader.readAsDataURL(file);
  }
  // 文件base64
  img.onload = function () {
    originImage = getBase64Image(img);
    // 图片原始尺寸
    const originWidth = this.width;
    const originHeight = this.height;
    // 最大尺寸限制
    const maxWidth = scale ? Math.round(this.width * scale) : Math.round(this.width * 0.1), maxHeight = scale ? Math.round(this.height * scale) : Math.round(this.height * 0.1);
    // 目标尺寸
    targetWidth = originWidth;
    targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // canvasDom对图片进行缩放
    canvasDom.width = targetWidth;
    canvasDom.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // canvasDom转为blob
    canvasDom.toBlob(function (blob) {
      blobImage = blob;
      blobToDataURL(blob, (base) => {
        const handleProps = {
          image: img,
          blob: blob,
          compressBase64: base,
          originImageBase64: originImage
        };
        complete(handleProps);
      });
    }, file.type || 'image/png');
  };
  reader.onload = function (e) {
    img.src = e.target.result;
  };
};
export default MabyCompress;
