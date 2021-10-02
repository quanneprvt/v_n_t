const MTLLoader = require('./libs/MTLLoader');
const OBJLoader2 = (require('./libs/OBJLoader2')).OBJLoader2;
const MtlObjBridge = require('./libs/MtlObjBridge');
const OBJExporter = require('./libs/OBJExporter');

class Loader
{
    constructor()
    {

    }

    Load(file)
    {
        function callbackOnLoad(o)
        {
            o.children[0].material = new THREE.MeshPhongMaterial({color: 0xffffff});
            // o.children[0].position.x = -8;
            o.position.x = Utils.RandInt(-5, 5);
            o.position.y = Utils.RandInt(-5, 5);
            o.position.z = Utils.RandInt(-5, 0);
            o.scale.x = o.scale.y = o.scale.z = 1;
            APP.scene.add(o);
            // console.log(o);
            // let obj = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({color: 0xffffff}));
            // APP.scene.add(obj);
        }
        let objLoader2 = new OBJLoader2();
 
        // APP.scene.add(objLoader2.parse(file));
        // console.log(file);
        // let onLoadMtl = function ( mtlParseResult ) {
            // objLoader2.setModelName( 'testObj' );
            // objLoader2.setLogging( true, true );
            // objLoader2.addMaterials( MtlObjBridge.addMaterialsFromMtlLoader( mtlParseResult ), true );
            objLoader2.load(file, callbackOnLoad, null, function(e){console.log(e)}, null );
            // console.log('loaded');
        // };
        // let mtlLoader = new MTLLoader();
        // mtlLoader.load( 'models/obj/female02/female02.mtl', onLoadMtl );
    }

    Export()
    {
        const exp = new OBJExporter();
        // console.log(exp);
        let e = exp.parse(APP.scene);
        Utils.Download('test.obj', e);
        // console.log(APP.scene);
    }
}

module.exports = new Loader();