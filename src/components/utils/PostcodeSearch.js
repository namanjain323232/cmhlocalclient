import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import { withRouter } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { FontSizeOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import keys from "../../config/keys";
import GetSubcategories from "./GetSubcategories";

class PostcodeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { subCat: "", area: {} };
  }
  handleChangeSub = (subCat) => {
    this.setState({ subCat });
  };
  handlesetArea = (area) => {
    this.setState({ area });

    console.log(this.state, "areaaaa");
  };
  handleAreas = (area) => {
    // console.log(formattedAreas);
    this.handlesetArea(area);

    // setAreas((result) => [...result, area]);

    // setAreas(areas.filter(a => a.place_id != area.place_id));
  };
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0]).then((latLng) => {
          console.log("Success", latLng);
          this.setState({ address });
          console.log("Results", results);
        });
      })
      .catch((error) => console.error("Error", error));
  };
  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.props.history.push({
      // `/shop?category=${this.state.subCat}&place_add=${this.state.area.formatted_address}&place_id=${this.state.area.place_id}`
      pathname: "/shop",
      state: {
        subCat: `${this.state.subCat}`,
        place_add: `${this.state.area.formatted_address}`,
        place_id: `${this.state.area.place_id}`,
      },
    });
    console.log(this.state);
  };
  searchOptions = {
    componentRestrictions: { country: ["gb"] },
  };

  render() {
    return (
      <Row justify="center">
        <Col span={5}>
          {/* <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={this.searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <Col style={{ position: "static", display: "inline-block" }}>
                <input
                  {...getInputProps({
                    placeholder: "Search a Location ...",
                    className:
                      "location-search-input mt-3 mb-3 font-weight-bold h6",
                    style: { height: "50px", width: "100%" },
                  })}
                />
                <Col
                  span={32}
                  style={{ position: "absolute", zIndex: 1 }}
                  className="autocomplete-dropdown-container"
                >
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, i) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <Col
                        span={32}
                        key={i + "_" + suggestion.id}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </Col>
                    );
                  })}
                </Col>
              </Col>
            )}
          </PlacesAutocomplete> */}

          <Autocomplete
            apiKey="AIzaSyAG4N6GONCjaMkk-QnJw1eHeConkKFrzGY" //"AIzaSyBnYVkxZoAHzYSlNAq167HjQ3seFcUPa7Q" //--AIzaSyAG4N6GONCjaMkk-QnJw1eHeConkKFrzGY
            options={{
              componentRestrictions: { country: "uk" },
            }}
            style={{ width: "110%", height: "50px", margin: "1rem 0" }}
            onPlaceSelected={(place) => {
              this.handleAreas(place);
            }}
            className="ml-3 w-100 font-weight-bold h6"
          />
        </Col>
        <Col span={5}>
          <GetSubcategories handleChangeSub={this.handleChangeSub} />
        </Col>

        <Col span={1} className="h3 mt-3" style={{ marginLeft: "50px" }}>
          <SearchOutlined onClick={this.handleSearchSubmit} />
        </Col>
      </Row>
    );
  }
}

// export default GoogleApiWrapper({
//   apiKey: keys.GOOGLE_MAPS_API_KEY,
// })(PostcodeSearch);

export default withRouter(PostcodeSearch);
