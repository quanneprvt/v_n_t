const MTLLoader = require("./libs/MTLLoader");
const OBJLoader2 = require("./libs/OBJLoader2").OBJLoader2;
const MtlObjBridge = require("./libs/MtlObjBridge");
const OBJExporter = require("./libs/OBJExporter");

class Loader {
  constructor() {}

  Load(file) {
    function callbackOnLoad(o) {
      o.children[0].material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      o.position.x = Utils.RandInt(-5, 5);
      o.position.y = Utils.RandInt(-5, 5);
      o.position.z = Utils.RandInt(-5, 0);
      o.scale.x = o.scale.y = o.scale.z = 1;
      APP.scene.add(o);
    }
    let objLoader2 = new OBJLoader2();
    objLoader2.load(
      file,
      callbackOnLoad,
      null,
      function (e) {
        console.log(e);
      },
      null
    );
  }

  Export() {
    const exp = new OBJExporter();
    let e = exp.parse(APP.scene);
    Utils.Download("test.obj", e);
  }
}

module.exports = new Loader();
