const OrbitControls = (require('./libs/OrbitControls')).OrbitControls;

class APP
{
    constructor()
    {
        this.renderer;
        this.scene;
        this.camera;
        this.controls;
        this.width = 800;
        this.height = 600;
        this.light;
        this.test = new THREE.Vector3();
        this.raycaster;
        this.mouse = {};
        this.INTERSECTED;
        this.currentTarget;
        this.isMouseDown = false;
        this.mOrigin = null;
        // this.Init();
    }

    Init()
    {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75,this.width / this.height, 0.1, 1000 );
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.width, this.height );
        document.body.appendChild( this.renderer.domElement );

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.raycaster = new THREE.Raycaster();

        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        this.light = new THREE.DirectionalLight( 0xffffff, 1 );
        this.light.position.z = 5
        // directionalLight.position.x = -2;
        // directionalLight.position.y = 5;
        // this.light.target = cube;

        this.scene.add(this.light);
        // this.camera.add(directionalLight);
        // this.scene.add( cube);

        this.camera.position.z = 10;

        this.Update();
        document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false );
        document.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        document.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        // this.controls.enabled = false;
    }

    onKeyDown(event)
    {
        if (event.keyCode == 69)
            this.controls.enabled = !this.controls.enabled;
    }

    onMouseDown(event)
    {
        event.preventDefault();
        console.log('mouse down');
        if (this.INTERSECTED)
        {
            this.currentTarget = this.INTERSECTED;
            this.isMouseDown = true;
            // this.controls.enabled = false;
            // this.controls.rotate = false;
            // this.controls.dispose();
        }
        else
        {
            // this.controls.enabled = true;
            // this.controls.rotate = true;
        }
    }

    onMouseUp(event)
    {
        event.preventDefault();
        {
            this.currentTarget = null;
            this.isMouseDown = false;
            this.mOrigin = null;
            // this.controls.rotate = true;
            // this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        }
    }

    onDocumentMouseMove(event)
    {
        event.preventDefault();
        // var mouse = {};
        // console.log('mouse move');
        this.mouse.x = ( event.clientX / this.width ) * 2 - 1;
        this.mouse.y = - ( (event.clientY - 50) / this.height ) * 2 + 1;
        if (this.isMouseDown)
        {
            var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
            vector.unproject( this.camera );
            var dir = vector.sub( this.camera.position ).normalize();
            var distance = - this.camera.position.z / dir.z;
            var pos = this.camera.position.clone().add( dir.multiplyScalar( distance ) );

            if (!this.mOrigin)
            {
                this.mOrigin = {};
                this.mOrigin.x = pos.x;
                this.mOrigin.y = pos.y;
            }
            else
            {

                // console.log(this.currentTarget.position, pos);
                // this.currentTarget.position.x = pos.x;
                // this.currentTarget.position.y = pos.y;
                // console.log(event.clientX - this.mOrigin.x);
                this.currentTarget.position.x += (pos.x - this.mOrigin.x);
                this.currentTarget.position.y += (pos.y - this.mOrigin.y);
                this.mOrigin.x = pos.x;
                this.mOrigin.y = pos.y;
            }
        }
    }

    Update()
    {
        requestAnimationFrame( this.Update.bind(this) );
        // if (this.INTERSECTED)
            this.controls.update();
        this.raycaster.setFromCamera( this.mouse, this.camera );

        var intersects = this.raycaster.intersectObjects( this.scene.children,true );
        // console.log(intersects);
        if ( intersects.length > 0 ) {

            if ( this.INTERSECTED != intersects[ 0 ].object ) {

                this.INTERSECTED = intersects[ 0 ].object;

            }

        } else {

            this.INTERSECTED = null;
            // this.controls.enabled = true;

        }
        // if (this.INTERSECTED)
        //     console.log(this.INTERSECTED);
        this.light.position.copy( this.camera.getWorldPosition(this.test) );
        this.renderer.render( this.scene, this.camera );
    }
}

module.exports = new APP();