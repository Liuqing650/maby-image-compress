import React from 'react';
import mabyCompress from '../index';
import './index.css';
class ImageCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      compress: {},
      originImage: null,
      newImage: null,
      canvas: null
    };
    this.getImage = this.getImage.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }
  getImage() {
    const img = this.refs.image;
    this.setState({
      image: img.files[0]
    });
  }
  handleImage() {
    const { image } = this.state;
    const canvas = this.refs.canvas;
    const compress = mabyCompress({ image, scale: 0.5, canvas }, (data) => {
      console.log('data--->', data);
      this.setState({
        newImage: data.compressBase64,
        originImage: data.originImageBase64,
        compress: data
      });
    });
  }
  render() {
    const { compress, image, newImage, originImage } = this.state;
    return (
      <div className="wrap">
        <div className="fileWrap">
          <input type="file" ref="image" />
          <button onClick={this.getImage}>获取</button>
          <button onClick={this.handleImage}>压缩</button>
        </div>
        <div className="clearfix show">
          <div className="origin">
            <img src={originImage} />
            <div className="text">转换前</div>
          </div>
          <canvas ref="canvas"></canvas>
          <div className="now">
            <img src={newImage} />
            <div className="text">转换后</div>
          </div>
        </div>
      </div>
    );
  }
};
export default ImageCom;
