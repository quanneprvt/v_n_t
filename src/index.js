import _ from 'lodash';
import './style.css';
require.context('./assets/', true, /\.(png|svg|jpg|gif)$/);
import * as THREE from 'three';
global.THREE = THREE;
// const exporter = require('./libs/OBJExporter');
// THREE.OBJExporter = exporter.OBJExporter;
// console.log(THREE);
//
if (process.env.NODE_ENV !== 'production') 
{
    console.warn('Looks like we are in development mode!');
}
else
{
    console.warn("Now we're in production mode ");
    console.log = function(){};
}

global.APP = require('./app');
global.Utils = require('./utils');
const loader = require('./loader');

function component() 
{
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = "<input type='file' id='input-obj' accept='.obj' /><br /><button id='export-btn'>export</button>";

    return element;
}

function loadObj(file)
{
    var reader = new FileReader();
    var f = document.getElementById("input-obj").files;
    console.log(f);

    reader.onloadend = function () {
        // console.log(reader.result);
        loader.Load(reader.result);
    }
    reader.readAsDataURL(f[0]);
    // loader.Load(file);
}
//
document.body.appendChild(component());
//
var elm = document.getElementById('input-obj');
elm.addEventListener('change', (event) => {
    loadObj();
});
var exp = document.getElementById('export-btn');
exp.onclick = function(){
    loader.Export();
};
//
(function() {
    APP.Init();
}());