import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Slider, Checkbox } from "antd";
import { getVendorsByCount, getVendorsByFilter } from "../../actions/vendor";
import { fetchCategories } from "../../actions/category";
import { fetchSubcategories } from "../../actions/subcategory";
import VendorCard from "../cards/VendorCard";
import { PoundOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import Star from "./Star";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {

    const dispatch = useDispatch();
    const { search } = useSelector(state => ({ ...state }));
    const didMountRef = useRef(false);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    //   const [area, setArea] = useState([]);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [star, setStar] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [sub, setSub] = useState("");

    const { text } = search;

    useEffect(() => {
        loadVendors();
        loadCategories();
        loadSubcategories();
    }, []);

    // load vendors by count when the page loads for the first time
    const loadVendors = () => {
        setLoading(true);
        getVendorsByCount(12).then(v => setVendors(v.data));
        setLoading(false);
    };

    const loadCategories = () => (fetchCategories().then(res => setCategories(res.data)));

    const loadSubcategories = () => (fetchSubcategories().then(res => setSubcategories(res.data)));

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
        }
        else {
            didMountRef.current = true;
        }
    }, [text]);

    const loadVendorsByFilter = (arg) => {
        getVendorsByFilter(arg)
            .then((res) => {
                setVendors(res.data)
            })
            .catch((res) => {
                console.log("filter catch : " + res)
            });
    }

    //load vendors based on price range selected
    useEffect(() => {
        if (didMountRef.current) {
            loadVendorsByFilter({ price })
        }
        else {
            didMountRef.current = true;
        }
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setCategory([]);
        setStar("");
        setSub("");
        setPrice(value);
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    //handle change for categories
    const handleCategoryChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setStar("");
        setSub("");
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
        loadVendorsByFilter({ category: catInState });
    }

    const handleStarClicked = (num) => {
        console.log(num);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategory([]);
        setSub("");
        setStar(num);
        loadVendorsByFilter({ stars: num });
    }

    //handle selection of star ratings
    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            <Star starClicked={handleStarClicked} numberOfStars={5} />
            <Star starClicked={handleStarClicked} numberOfStars={4} />
            <Star starClicked={handleStarClicked} numberOfStars={3} />
            <Star starClicked={handleStarClicked} numberOfStars={2} />
            <Star starClicked={handleStarClicked} numberOfStars={1} />
        </div>
    )

    const handleSubmit = (sub) => {
        console.log(sub);
        setSub(sub);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategory([]);
        setStar();
        loadVendorsByFilter({ sub: sub });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col col-md-3 mt-2">
                    <h4>Search/Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
                        <SubMenu key="1" title={<span className="h6">Area</span>}>
                            <div>
                                <h5>Area1</h5>
                            </div>
                        </SubMenu>
                        <SubMenu key="2" title={<span className="h6">
                            <PoundOutlined />Price
                                       </span>
                        }>
                            <div>
                                <Slider className="ml-4 mr-4 mt-2"
                                    tipFormatter={(v) => `£${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max="500"
                                />
                            </div>
                        </SubMenu>
                        <SubMenu key="3" title={<span className="h6">
                            <DownSquareOutlined /> Categories
                                      </span>
                        }>
                            <div style={{ marginTop: "-10px" }}>

                                {categories && categories.map((c) => (
                                    <div className="pt-2 fixedHeight overflowScroll" key={c._id}>
                                        <Checkbox className="pb-2 pl-4 pr-4"
                                            onChange={handleCategoryChange}
                                            value={c._id}
                                            name="category"
                                            checked={category.includes(c._id)}
                                        >{c.name}</Checkbox>
                                    </div>
                                ))}
                            </div>
                        </SubMenu>
                        <SubMenu key="4" title={<span className="h6 mt-2">
                            <StarOutlined style={{ marginTop: "-2px" }} /> Rating
                                      </span>
                        }>
                            <div style={{ marginTop: "-10px" }}>
                                {showStars()}
                            </div>
                        </SubMenu>
                        <SubMenu key="5" title={<span className="h6 mt-2">
                            <DownSquareOutlined /> Sub Category
                                    </span>
                        }>
                            <div className="pl-4 pr-4">
                                {subcategories && subcategories.map((s) => (
                                    <div onClick={() => handleSubmit(s)}
                                        className="p-1 m-1 badge badge-secondary"
                                        key={s._id}
                                        style={{ cursor: "pointer" }}
                                    > {s.name}
                                    </div>
                                ))
                                }
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="col col-md-9">
                    {loading ? <h4 className="text-danger">Loading...</h4>
                        : <h4>Vendors</h4>
                    }

                    {vendors.length < 1 && <p>No Vendors found !!!!</p>}

                    <div className="row pb-5">
                        {vendors.map((v) => (
                            <div className="col col-md-4 mt-2"
                                onClick={() => handleSubmit()}
                                key={v._id}
                                style={{ cursor: "pointer" }}
                            >
                                <VendorCard vendor={v} />
                            </div>

                        ))}
                    </div>
                    <div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Shop;