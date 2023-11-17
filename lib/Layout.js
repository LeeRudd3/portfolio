"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRouterDom = require("react-router-dom");
var _jsxRuntime = require("react/jsx-runtime");
var Layout = function Layout() {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("nav", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
            to: "/",
            children: "Home"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
            to: "/listing/6515af6e06454f70b41123f7",
            children: "Listings"
          })
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Outlet, {})]
  });
};
var _default = exports.default = Layout;