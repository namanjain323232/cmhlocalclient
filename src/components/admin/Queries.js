import React, { useState, useEffect, Fragment } from "react";
import AdminMenu from "./AdminMenu";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchQueries, markAsRead } from "./../../actions/user";
import AdminNav from "./../navigation/AdminNav";
// import categoryReducer from "../../../reducers/categoryReducer";
import { CheckOutlined } from "@ant-design/icons";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQueries();
  }, []);

  const getQueries = () => {
    setLoading(true);
    fetchQueries().then((res) => setQueries(res.data));
    setLoading(false);
  };

  const renderList = () => {
    return (
      queries &&
      queries.map((query) => {
        return (
          <div
            className="row mt-1"
            style={{ marginBottom: "3rem" }}
            key={query._id}
          >
            <div className="col col-md-7 question">
              <p> {query.query}</p>
            </div>
            <div className="col col-md-4 question">
              {query.name}
              <br />
              {query.email}
            </div>
            <div className=" col col-md-1 float-right ">
              <button
                className="btn btn-primary mr-1"
                onClick={(e) => {
                  e.preventDefault();
                  markAsRead(query._id).then((res) => {
                    setQueries(res.data);
                  });
                }}
              >
                <CheckOutlined />
              </button>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col col-md-2">
          <AdminNav />
        </div>
        <div className="col col-md-9">
          {loading ? (
            <h2>Loading....</h2>
          ) : (
            <h2 className="font-weight-bold">Queries</h2>
          )}
          <div className="container mt-2">
            <div className="row p-3 bg-light ">
              <div className="col col-md-7 ">
                <h5 className="font-weight-bold text-left">Query</h5>
              </div>
              <div className="col col-md-5">
                <h5 className="font-weight-bold text-left">User</h5>
              </div>
            </div>
            <div className="card">
              <form>{renderList()}</form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queries;
