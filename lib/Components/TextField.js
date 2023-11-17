"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextField;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function TextField(_ref) {
  var title = _ref.title,
    placeHolder = _ref.placeHolder,
    name = _ref.name,
    inputValue = _ref.inputValue,
    handleInputChange = _ref.handleInputChange,
    validate = _ref.validate,
    error = _ref.error;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("table", {
      className: "add",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tbody", {
        className: "add",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
          className: "add",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            className: "add",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: title
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            className: "add",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
              type: "text",
              className: "textbox",
              value: inputValue,
              onChange: handleInputChange,
              placeholder: placeHolder,
              name: name
            })
          })]
        }), validate && /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
          className: "add",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
            className: "add",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              className: "validationText",
              children: error
            })
          })
        })]
      })
    })
  });
}
;