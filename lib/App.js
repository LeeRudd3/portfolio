"use strict";

var _react = _interopRequireDefault(require("react"));
var _logo = _interopRequireDefault(require("./logo.svg"));
require("./App.css");
var _reactDom = require("react-dom");
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("./Home.js"));
var _Listing = _interopRequireDefault(require("./Listing.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
});
function Table(_ref) {
  var jsonData = _ref.jsonData;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      children: "Table Generated from JSON"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Name"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Summary"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Bedrooms"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Bathrooms"
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: jsonData.map(function (item, index) {
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: item.name
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: item.summary
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: item.bedrooms
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: item.bathrooms
            })]
          }, index);
        })
      })]
    })]
  });
}