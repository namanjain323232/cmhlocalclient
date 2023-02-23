import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
  render() {
    return (
      <div style={{ width: "30%", marginLeft: "1rem" }}>
        <Carousel
          //   showArrows={true}
          autoPlay={true}
          // onChange={onChange}
          // onClickItem={onClickItem}
          // onClickThumb={onClickThumb}
        >
          <div>
            <img src="images/gardener.jpg" />
            <p className="legend">Legend 1</p>
          </div>
          {/* <div>
          <img src="assets/2.jpeg" />
          <p className="legend">Legend 2</p>
        </div> */}
          {/* <div>
          <img src="assets/3.jpeg" />
          <p className="legend">Legend 3</p>
        </div> */}
          <div>
            <img src="images/helper-image2.jpg" />
            <p className="legend">Legend 4</p>
          </div>
          <div>
            <img src="images/general1.jpg" />
            <p className="legend">Legend 5</p>
          </div>
          <div>
            <img src="images/general1.jpg" />
            <p className="legend">Legend 6</p>
          </div>
        </Carousel>
      </div>
    );
  }
}

// ReactDOM.render(<DemoCarousel />, document.querySelector(".demo-carousel"));
export default DemoCarousel;
// ReactDOM.render(<DemoCarousel />, document.querySelector(".demo-carousel"));

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
