import _ from "lodash";
import "./style.css";
require.context("./assets/", true, /\.(png|svg|jpg|gif)$/);
import * as THREE from "three";
global.THREE = THREE;
// const exporter = require('./libs/OBJExporter');
// THREE.OBJExporter = exporter.OBJExporter;
// console.log(THREE);
//
if (process.env.NODE_ENV !== "production") {
  console.warn("Looks like we are in development mode!");
} else {
  console.warn("Now we're in production mode ");
  console.log = function () {};
}

global.APP = require("./app");
global.Utils = require("./utils");
const loader = require("./loader");

function component() {
  const element = document.createElement("div");

  return element;
}
//
document.body.appendChild(component());
//
(function () {
  APP.Init();
})();
