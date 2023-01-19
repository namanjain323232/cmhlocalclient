import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Slider, Checkbox, Button, Tooltip, Empty, Tag } from "antd";
import { getVendorsByCount, getVendorsByFilter } from "../../actions/vendor";
import { fetchCategories } from "../../actions/category";
import { fetchSubcategories } from "../../actions/subcategory";
import VendorCard from "../cards/VendorCard";
import {
  DownSquareOutlined,
  StarOutlined,
  CloseOutlined,
  RightCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Star from "./Star";
import Autocomplete from "react-google-autocomplete";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const didMountRef = useRef(false);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [area, setArea] = useState([]);
  const [price, setPrice] = useState(undefined);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [star, setStar] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [sub, setSub] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const { text } = search;

  useEffect(() => {
    loadVendors();
    loadCategories();
    loadSubcategories();
  }, []);

  // load vendors by count when the page loads for the first time
  const loadVendors = () => {
    setLoading(true);
    getVendorsByCount(12).then((v) => setVendors(v.data));
    setLoading(false);
  };

  const loadCategories = () =>
    fetchCategories().then((res) => setCategories(res.data));

  const loadSubcategories = () =>
    fetchSubcategories().then((res) => setSubcategories(res.data));

  //load vendors based on user search text input in search bar
  useEffect(() => {
    if (didMountRef.current) {
      const delay = setTimeout(() => {
        loadVendorsByFilter({ query: text });
        if (!text) {
          loadVendors();
        }
      }, 300);
      return () => clearTimeout(delay);
    } else {
      didMountRef.current = true;
    }
  }, [text]);

  const loadVendorsByFilter = (arg) => {
    getVendorsByFilter(arg)
      .then((res) => {
        setVendors(res.data);
      })
      .catch((res) => {
        console.log("filter catch : " + res);
      });
  };

  // load vendors based on price range selected
  useEffect(() => {
    if (didMountRef.current) {
      handleFilters();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      didMountRef.current = true;
    }
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const clearSliderFilter = () => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(undefined);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const clearRatingFilter = () => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar([]);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const clearSubCategoryFilter = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setSub("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
    e.preventDefault();
  };

  //handle change for categories
  const handleCategoryChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    const catInState = [...category];
    const catChecked = e.target.value;
    //check if the category id already exists in the array of current categories.
    //if the item is found, it returns index of the item otherwise it returns -1
    const catAlreadyInState = catInState.indexOf(catChecked);
    if (catAlreadyInState === -1) {
      catInState.push(catChecked);
    } else {
      catInState.splice(catAlreadyInState, 1);
    }
    setCategory(catInState);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleStarClicked = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    var selectedStars = [...star];
    const alreadySelectedStars = selectedStars.indexOf(num);
    if (alreadySelectedStars === -1) {
      selectedStars.push(num);
    } else {
      selectedStars.splice(alreadySelectedStars, 1);
    }

    setStar(selectedStars);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleAreas = (area) => {
    console.log("call handlearea");
    setSelectedArea(area);
    console.log(area, "areaaaa");
    setAreas((result) => [...result, area]);

    // setAreas(areas.filter(a => a.place_id != area.place_id));
  };

  //handle selection of star ratings
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star
        starClicked={handleStarClicked}
        numberOfStars={5}
        selected={[...star].indexOf(5) > -1}
      />
      <Star
        starClicked={handleStarClicked}
        numberOfStars={4}
        selected={[...star].indexOf(4) > -1}
      />
      <Star
        starClicked={handleStarClicked}
        numberOfStars={3}
        selected={[...star].indexOf(3) > -1}
      />
      <Star
        starClicked={handleStarClicked}
        numberOfStars={2}
        selected={[...star].indexOf(2) > -1}
      />
      <Star
        starClicked={handleStarClicked}
        numberOfStars={1}
        selected={[...star].indexOf(1) > -1}
      />
    </div>
  );

  const showAreas = () =>
    [...areas].map((s) => (
      <Tag
        color="blue"
        className="p-1 m-1"
        key={s.place_id}
        style={{ cursor: "pointer" }}
      >
        {s.formatted_address}
      </Tag>
    ));

  const handleSubCategory = (sub) => {
    console.log(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setSub(sub);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleFilters = () => {
    console.log(price);
    loadVendorsByFilter({
      query: text,
      price: price,
      category: category,
      stars: star,
      sub: sub,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col col-md-3 mt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
            <SubMenu key="1" title={<span className="h6">Area</span>}>
              <div className="row">
                <div className="col col-md-10">
                  <Autocomplete
                    apiKey="AIzaSyAG4N6GONCjaMkk-QnJw1eHeConkKFrzGY" //"AIzaSyBnYVkxZoAHzYSlNAq167HjQ3seFcUPa7Q" //--AIzaSyAG4N6GONCjaMkk-QnJw1eHeConkKFrzGY
                    options={{
                      componentRestrictions: { country: "uk" },
                    }}
                    onPlaceSelected={(place) => {
                      handleAreas(place);
                    }}
                    className="ml-3 w-100"
                  />
                </div>
                <div className="col col-md-10">
                  <div className="pl-4 pr-4">{showAreas()}</div>
                </div>
              </div>
            </SubMenu>
            <Button
              size="small"
              shape="circle"
              type="dashed"
              style={{ float: "right", margin: "11px 5px 0px 0px" }}
              onClick={clearSliderFilter}
              icon={
                <CloseOutlined
                  className="d-block"
                  style={{ fontSize: "medium" }}
                />
              }
            />
            <SubMenu
              key="2"
              title={<span className="h6">Price</span>}
              style={{ width: "87%" }}
            >
              <div className="row">
                <div className="col col-md-9">
                  <Slider
                    className="ml-4 mt-2"
                    tipFormatter={(v) => `£${v}`}
                    range
                    value={price == undefined ? [0, 0] : price}
                    onChange={handleSlider}
                    max="500"
                  />
                </div>

                <div className="col col-md-2">
                  <Tooltip title="Clear Price"></Tooltip>
                </div>

                <div className="col-md-12 mt-1 mb-1">
                  <b className="text-primary ml-4">
                    {" "}
                    {price ? `£${price[0]} - £${price[1]}` : ""}{" "}
                  </b>
                </div>
              </div>
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>
                {categories &&
                  categories.map((c) => (
                    <div
                      className="pt-2 fixedHeight overflowScroll"
                      key={c._id}
                    >
                      <Checkbox
                        className="pb-2 pl-4 pr-4"
                        onChange={handleCategoryChange}
                        value={c._id}
                        name="category"
                        checked={category.includes(c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    </div>
                  ))}
              </div>
            </SubMenu>
            <Button
              size="small"
              shape="circle"
              type="dashed"
              style={{ float: "right", margin: "11px 5px 0px 0px" }}
              onClick={clearRatingFilter}
              icon={
                <CloseOutlined
                  className="d-block"
                  style={{ fontSize: "medium" }}
                />
              }
            />
            <SubMenu
              key="4"
              style={{ width: "87%" }}
              title={
                <span className="h6 mt-2">
                  <StarOutlined style={{ marginTop: "-2px" }} /> Rating
                  <Tooltip title="Clear Ratings"></Tooltip>
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>{showStars()}</div>
            </SubMenu>
            <Button
              size="small"
              shape="circle"
              type="dashed"
              onClick={clearSubCategoryFilter}
              style={{ float: "right", margin: "11px 5px 0px 0px" }}
              icon={
                <CloseOutlined
                  className="d-block"
                  style={{ fontSize: "medium" }}
                />
              }
            />

            <SubMenu
              key="5"
              style={{ width: "87%" }}
              title={
                <span className="h6 mt-2">
                  <DownSquareOutlined /> Sub Category
                  <Tooltip title="Clear Sub Category"></Tooltip>
                </span>
              }
            >
              <div className="pl-4 pr-4">
                {subcategories &&
                  subcategories.map((s) => (
                    <Tag
                      color={`${s._id == sub._id ? "#1d2d50" : ""}`} //#108ee9
                      onClick={() => handleSubCategory(s)}
                      className="p-1 m-1"
                      key={s._id}
                      style={{ cursor: "pointer" }}
                    >
                      {s.name}
                    </Tag>
                  ))}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Vendors</h4>
          )}

          {vendors.length < 1 && (
            <Empty
              description={<b>"Sorry, we couldn't find any results !"</b>}
            />
          )}

          <div className="col col-md-12">
            <div className="row">
              {vendors.map((v) => (
                <div
                  className="col col-md-4"
                  key={v._id}
                  style={{ cursor: "pointer" }}
                >
                  <VendorCard vendor={v} />
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
