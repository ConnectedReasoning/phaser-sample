var score = 0;
var scoreText;
var eyewheels = [];
var eyebases = [];
var buildings = [];
var sceneWidth = null;
var game = null;
var height = window.innerHeight * .75;
var screenWidth = window.innerWidth * window.devicePixelRatio;
var date_as_int = null;
var date_as_day = null;
var starsOverlay;
console.log('game is ', game);

game = new Phaser.Game(
  window.innerWidth,  //width
  height, //height
  Phaser.CANVAS, //renderer
  'gamepo', //parent or DOM element id
  { preload: preload, create: create, update: update }, //state object
  false, //transparent
  false, //antialias
  { enableDebug: false } //physics config object
);

game.config = { 
  antialias: false, 
  enableDebug: false, 
  scaleMode: 3 //https://photonstorm.github.io/phaser-ce/Phaser.ScaleManager.html#scaleMode
};

function preload() {
    game.kineticScrolling = game.plugins.add(Phaser.Plugin.KineticScrolling);
    loadImages();
}

function create() {
  console.log('in create');
  sceneWidth = 150000;
  scrollFrameCount = 0;
  //Options to customize Kinet Scrolling default options
  game.kineticScrolling.configure({
    kineticMovement: true,
    timevarantScroll: 325, //really mimic iOS
    horizontalScroll: true,
    verticalScroll: false,
    horizontalWheel: true,
    verticalWheel: false,
    deltaWheel: 40,
  });

  date_as_int =   new Date(moment().toISOString()).getTime();
  date_as_day =  date_as_int - date_as_int % (3600000 * 24);

  //Enable Arcade Physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //Set the games background colour
  game.stage.backgroundColor = '#ffffff';

  //************************London Graphics Start 
  inititalizeElements();  
  //************************London Graphics End 
  //Changing the world width
  game.world.setBounds(0, 0, sceneWidth, game.height);

  // Create scrollbar
  if (game.world.bounds.width > game.width) {
    scroll = createRectangle(0, 0, 50, 10, '#62a1d6');
    scroll.fixedToCamera = true;
    // Remember the value of the position of the camera
    scroll.cameraX = game.camera.x;
  }
  
  game.kineticScrolling.start();
  game.camera.setPosition(Math.floor(sceneWidth * 0.5), 0);

  var tomorrowString =  moment(new Date()).add(1,'days').format("MM/DD/YYYY")
  var tomorrowNum =new Date(tomorrowString).getTime();
}

function update() {
  let absolutePosition = 0;

  //starsOverlay.width = window.innerWidth;;
  
  for(let i = 0; i < eyewheels.length;i++){
    eyewheels[i].angle += 1;
  }
  if(balloon1RotateForward){
    balloon1.angle += .06;
  } else {
    balloon1.angle -= .06;
  }
  if(balloon1.rotation < -.25){
    balloon1RotateForward = true;
  }
  if(balloon1.rotation > .25){
    balloon1RotateForward = false;
  } 

  if (typeof scroll !== "undefined") {
    /////////////////////////////////////////////////
    /////////////////////////////////////////////////
    //Moving forward

    if(game.camera.x > 25 && game.camera.x < 30){
      console.log('setting scrollNext to true');
      scrollNext = true;
    }

    if( (game.camera.x > sceneWidth - screenWidth ) && 
        (game.camera.x < sceneWidth - screenWidth - 10)
    ){
      console.log('setting scrollLast to true');
      scrollLast = true;
    }    
    ///////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    absolutePosition = game.camera.x + (scrollFrameCount * screenWidth);
    var scrollTimesScene = scrollFrameCount * sceneWidth
    absolutePosition = game.camera.x + scrollTimesScene;
    
    day.text = moment(date_as_int + ((absolutePosition + Math.floor(game.camera.x)-Math.floor(sceneWidth)) * 18000) ).format('MMM-DD');
    date.text =  moment(date_as_int  + ((absolutePosition + Math.floor(game.camera.x)-Math.floor(sceneWidth)) * 18000)).format('ddd');
    time.text = moment(date_as_int + ((absolutePosition + Math.floor(game.camera.x)-Math.floor(sceneWidth)) * 18000) ).format('HH:mm A');


    //console.log('calcPosition is '  + calcPosition);
    var currentHour = moment(date_as_int + ((absolutePosition + Math.floor(game.camera.x)-Math.floor(sceneWidth)) * 18000) ).format('H'); 
    
  
    hourDisplay.text =  currentHour;
    position.text = Math.floor(absolutePosition);
    cameraPosition.text = Math.floor(game.camera.x);

    var cityDark_parallax = 0;
    var cityLight_parallax = 2;      
    var building_parallax = 4;
    var back_tree_parallax = 4;
    var cloud1_parallax = 5;
    var front_tree_parallax = 6;
    var cloud2_parallax = 10;

    if (scroll.cameraX < game.camera.x) {
      clouds1.position.x -= cloud1_parallax;
      clouds2.position.x -= cloud2_parallax;
      cityLight.tilePosition.x -= cityLight_parallax;
      cityDark.tilePosition.x -= cityDark_parallax;
      for(let i=0; i<eyewheels.length;i++){
        eyewheels[i].position.x -= building_parallax;
        eyebases[i].position.x -= building_parallax;
      }
      _.each(buildings, (b)=> b.position.x -=building_parallax);

      busF1.position.x -= front_tree_parallax;
      busB1.position.x -= front_tree_parallax;
      cabF1.position.x -= front_tree_parallax;
      cabB1.position.x -= front_tree_parallax;
      
      cityFrontTrees.position.x -= front_tree_parallax;
      cityBackTrees.position.x -= back_tree_parallax;



    } else if (scroll.cameraX > game.camera.x) {
      clouds1.position.x += cloud1_parallax;
      clouds2.position.x += cloud2_parallax;
      cityLight.tilePosition.x += cityLight_parallax;
      cityDark.tilePosition.x += cityDark_parallax;
      for(let i=0; i < eyewheels.length; i++){
        eyewheels[i].position.x += building_parallax;
        eyebases[i].position.x += building_parallax;
      }
      _.each(buildings, (b)=> b.position.x +=building_parallax);

      busF1.position.x += front_tree_parallax;
      busB1.position.x += front_tree_parallax;
      cabF1.position.x += front_tree_parallax;
      cabB1.position.x += front_tree_parallax;

      cityFrontTrees.position.x += front_tree_parallax;
      cityBackTrees.position.x += back_tree_parallax;


    }
    scroll.fixedToCamera = false;
    scroll.x = (game.camera.x / (game.world.bounds.width - game.width)) * (game.width - 50);
    scroll.cameraX = game.camera.x;
    scroll.fixedToCamera = true;

    switch (currentHour) {
      case '0':
        sky.sprite.tint = Phaser.Color.hexToRGB('#4E367D');
        nightOverlay.sprite.alpha =0.4;
        starsOverlay.alpha = 1.0;
        break;
      case '1':
        sky.sprite.tint = Phaser.Color.hexToRGB('#524388');
        nightOverlay.sprite.alpha =0.4;
        starsOverlay.alpha = 1.0;
        break;
      case '2':
        sky.sprite.tint = Phaser.Color.hexToRGB('#565193');
        nightOverlay.sprite.alpha =0.3;
        starsOverlay.alpha = 0.9;
        break;
      case '3':
        sky.sprite.tint = Phaser.Color.hexToRGB('#5B5E9F');
        nightOverlay.sprite.alpha =0.3;
        starsOverlay.alpha = 0.8;
        break;
      case '4':
        sky.sprite.tint = Phaser.Color.hexToRGB('#5F6CAA');
        nightOverlay.sprite.alpha =0.3;
        starsOverlay.alpha = 0.6;
        break;
      case '5':
        sky.sprite.tint = Phaser.Color.hexToRGB('#647AB5');
        nightOverlay.sprite.alpha =0.2;
        starsOverlay.alpha = 0.2;
        break;
      case '6':
        sky.sprite.tint = Phaser.Color.hexToRGB('#6887C1');
        nightOverlay.sprite.alpha =0.1;
        starsOverlay.alpha = 0.0;
        break;
      case '7':
        sky.sprite.tint = Phaser.Color.hexToRGB('#6D95CC');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '8':
        sky.sprite.tint = Phaser.Color.hexToRGB('#71A3D7');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '9':
        sky.sprite.tint = Phaser.Color.hexToRGB('#76B0E3');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '10':
        sky.sprite.tint = Phaser.Color.hexToRGB('#7ABEEE');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '11':
        sky.sprite.tint = Phaser.Color.hexToRGB('#7FCCFA');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '12':
        sky.sprite.tint = Phaser.Color.hexToRGB('#7FCCFA');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '13':
        sky.sprite.tint = Phaser.Color.hexToRGB('#7ABEEE');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '14':
        sky.sprite.tint = Phaser.Color.hexToRGB('#76B0E3');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '15':
        sky.sprite.tint = Phaser.Color.hexToRGB('#71A3D7');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.0;
        break;
      case '16':
        sky.sprite.tint = Phaser.Color.hexToRGB('#6D95CC');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.1;
        break;
      case '17':
        sky.sprite.tint = Phaser.Color.hexToRGB('#6887C1');
        nightOverlay.sprite.alpha =0.0;
        starsOverlay.alpha = 0.1;
        break;
      case '18':
        sky.sprite.tint = Phaser.Color.hexToRGB('#647AB5');
        nightOverlay.sprite.alpha =0.1;
        starsOverlay.alpha = 0.2;
        break;
      case '19':
        sky.sprite.tint = Phaser.Color.hexToRGB('#5F6CAA');
        nightOverlay.sprite.alpha =0.1;
        starsOverlay.alpha = 0.3;
        break;
      case '20':
        sky.sprite.tint = Phaser.Color.hexToRGB('#5B5E9F');
        nightOverlay.sprite.alpha =0.2;
        starsOverlay.alpha = 0.4;
        break;
      case '21':
        sky.sprite.tint = Phaser.Color.hexToRGB('#565193');
        nightOverlay.sprite.alpha =0.2;
        starsOverlay.alpha = 0.4;
        break;
      case '22':
        sky.sprite.tint = Phaser.Color.hexToRGB('#524388');
        nightOverlay.sprite.alpha =0.3;
        starsOverlay.alpha = 0.6;
        break;					
      case '23':
        sky.sprite.tint = Phaser.Color.hexToRGB('#4E367D');
        nightOverlay.sprite.alpha =0.4;
        starsOverlay.alpha = 0.8;
        break;
    } 
  }
}

function loadImages(){
  console.log('in loadImages');
  game.load.image('stars', 'http://localhost:3002/assets/stars22.png');
  
  game.load.spritesheet('london-citylight',  'assets/cityscape-back_sprite.png', 518, 198);
  game.load.spritesheet('london-citydark', 'assets/cityscape-front_sprite.png', 512, 256);

  game.load.image('london-cloud1', 'assets/cloud_b.png');
  game.load.image('london-cloud2', 'assets/cloud_c.png');
  game.load.image('london-cloud3', 'assets/cloud_h.png');
  game.load.image('london-cloud4', 'assets/cloud_i.png');

  game.load.image('london-tree1', 'assets/tree1.png');
  game.load.image('london-tree2', 'assets/tree2.png');

  game.load.image('london-airplane-backward', 'assets/airplane-backward.png');
  game.load.image('london-airplane-forward', 'assets/Airplane-forward.png');

  game.load.image('london-balloon', 'assets/balloon.png');
  game.load.image('london-bus-backward', 'assets/bus-backward.png');
  game.load.image('london-bus-forward', 'assets/bus-forward.png');
  game.load.image('london-cab-backward', 'assets/cab-backward.png');
  game.load.image('london-cab-forward', 'assets/cab-forward.png');

  game.load.image('london-tree3', 'assets/tree3.png');
  game.load.image('london-tree4', 'assets/tree4.png');

  game.load.image('london-londoncityhall', 'assets/londoncityhall.png');
  game.load.image('london-eye-wheel', 'assets/londoneye-wheel2.png');
  game.load.image('london-eye-base', 'assets/londoneye-base.png');
  game.load.image('london-shard', 'assets/theshard.png');
  game.load.image('london-alberthall', 'assets/royalalberthall.png');
  game.load.image('london-royalexchange', 'assets/royalexchange.png');
  game.load.image('london-bigben', 'assets/bigben.png');
  game.load.image('london-londonbridge', 'assets/londonbridge.png');
  game.load.image('london-buckinghampalace', 'assets/buckinghampalace.png');
  game.load.image('london-stpaulscathedral', 'assets/stpaulscathedral.png');
  game.load.image('london-gherkin', 'assets/thegherkin.png');
  game.load.image('london-toweroflondon', 'assets/toweroflondon.png');
  game.load.image('london-westminsterabbey', 'assets/westminsterabbey.png');
  game.load.image('london-apartments1', 'assets/apartments1.png');
  game.load.image('london-apartments2', 'assets/apartments2.png');
  game.load.image('london-apartments3', 'assets/apartments3.png');
  game.load.image('london-apartments4', 'assets/apartments4.png');

}

function inititalizeElements(){
    console.log('at initialize elements');
    
    var building_offset = 400;
    var forwardAirplaneElevation = 425;
    var backwardAirplaneElevation = 400;
    var cloudElevation = game.height * .85;

    var buildingElevation = 100;
    var backTreeElevation = 100; 

    var backwardBusElevation = 80;
    var backwardCabElevation = 80;
    var forwardCabElevation = 67;
    var forwardBusElevation = 67;
    

    var frontTreeElevation = 50;

    var initSkyX = 0;
    var initCityscapeShim = 0;
    var initSidewalk = 0;
    var initStreetX = 0;
    var initGrassX = 0;
    var score = 100;
    var sceneStart = 0;
    var treegroups = 95;
    var cloudgroups = 95;
    var clouddistance = 500;
    var treedistance = 1200;
    startPos = 500;
    rectangles = [];
    
    //sky
    sky = createRectangle(sceneStart, 0, sceneWidth, game.height - 125, '#62a1d6');//'#62a1d6');//blue
    console.log('sky items are', sky);

    starsOverlay = game.add.sprite(0, 0,'stars');
    starsOverlay.width = window.innerWidth;;
    starsOverlay.height = game.height;

    starsOverlay.fixedToCamera = true;
    //starsOverlay.sprite.alpha = 0.99;

    clouds1 = game.add.group();

    for (let i = 0; i < cloudgroups; i++){
      let cloud = clouds1.create((   i * getRandom(clouddistance,clouddistance + 1500)), game.height - game.cache.getImage('london-cloud1').height - cloudElevation + getRandom(0,200), 'london-cloud1');
      cloud.scale.setTo(1.5,1.5);
    }
    for (let i = 0; i < cloudgroups; i++){
      let cloud = clouds1.create((   i * getRandom(clouddistance,clouddistance + 1500)), game.height - game.cache.getImage('london-cloud2').height - cloudElevation + getRandom(0,200), 'london-cloud2');
      cloud.scale.setTo(1.5,1.5);
    }
    
    clouds2 = game.add.group();
    for (let i = 0; i < cloudgroups; i++){
      let cloud = clouds2.create((   i * getRandom(clouddistance,clouddistance + 1500)), game.height - game.cache.getImage('london-cloud3').height - cloudElevation + getRandom(0,100), 'london-cloud3');
      cloud.scale.setTo(1.5,1.5);
    }
    for (let i = 0; i < cloudgroups; i++){
      let cloud = clouds2.create((   i * getRandom(clouddistance,clouddistance + 1500)), game.height - game.cache.getImage('london-cloud4').height - cloudElevation + getRandom(0,100), 'london-cloud4');
      cloud.scale.setTo(1.5,1.5);
    }

    cityDark = game.add.tileSprite(sceneStart,
      game.height - game.cache.getImage('london-citydark').height - 230,
      sceneWidth * 2,
      game.cache.getImage('london-citydark').height,
      'london-citydark'
    );
    cityDark.scale.y = 1.5;
    cityDark.scale.x = 1.5;

    cityLight = game.add.tileSprite(sceneStart,
      game.height - game.cache.getImage('london-citylight').height - 180,
      sceneWidth * 2,
      game.cache.getImage('london-citylight').height,
      'london-citylight'
    );
    cityLight.scale.y = 1.5;
    cityLight.scale.x = 1.5;


    //sidewalk 
    createRectangle(sceneStart, game.height - 140, sceneWidth, 50, '#d4d2ce');//sidewalk
    //grass
    createRectangle(sceneStart, game.height - 65, sceneWidth, 65, '#599e66');//green
    
    for(let i = 0; i < 20; i++){
      var gherkin = game.add.sprite((building_offset * 0) + (i * 8000),
        game.height - game.cache.getImage('london-gherkin').height - buildingElevation,
        'london-gherkin'
      );
      buildings.push(gherkin);
      var eyewheel = game.add.sprite(((building_offset * 1) + 60) + (i * 8000),
        game.height - game.cache.getImage('london-eye-wheel').height - buildingElevation + 120,
        'london-eye-wheel'
      );
      eyewheel.anchor.setTo(0.5, 0.5);
      eyewheels.push(eyewheel);
      var eyebase = game.add.sprite((building_offset * 1) + (i * 8000),
        game.height - game.cache.getImage('london-eye-base').height - buildingElevation,
        'london-eye-base'
      ); 
      eyebases.push(eyebase);
      var toweroflondon = game.add.sprite((building_offset * 2) + (i * 8000),
        game.height - game.cache.getImage('london-toweroflondon').height - buildingElevation,
        'london-toweroflondon'
      );
      buildings.push(toweroflondon);
      var westminsterabbey = game.add.sprite((building_offset * 3) + (i * 8000),
        game.height - game.cache.getImage('london-westminsterabbey').height - buildingElevation,
        'london-westminsterabbey'
      );
      buildings.push(westminsterabbey);
      var apartments3 = game.add.sprite((building_offset * 4) + (i * 8000),
        game.height - game.cache.getImage('london-apartments3').height - buildingElevation,
        'london-apartments3'
      );
      buildings.push(apartments3);
      var royalexchange = game.add.sprite((building_offset * 5) + (i * 8000),
        game.height - game.cache.getImage('london-royalexchange').height - buildingElevation,
        'london-royalexchange'
      );
      buildings.push(royalexchange);
      var buckinghampalace = game.add.sprite((building_offset * 6) + (i * 8000),
        game.height - game.cache.getImage('london-buckinghampalace').height - buildingElevation,
        'london-buckinghampalace'
      );
      buildings.push(buckinghampalace);
      var stpaulscathedral = game.add.sprite((building_offset * 7) + (i * 8000),
        game.height - game.cache.getImage('london-stpaulscathedral').height - buildingElevation,
        'london-stpaulscathedral'
      );
      buildings.push(stpaulscathedral);
      var apartments4 = game.add.sprite((building_offset * 8) + (i * 8000),
        game.height - game.cache.getImage('london-apartments4').height - buildingElevation,
        'london-apartments4'
      );
      buildings.push(apartments4);
      var londoncityhall = game.add.sprite((building_offset * 9) + (i * 8000),
        game.height - game.cache.getImage('london-londoncityhall').height - buildingElevation,
        'london-londoncityhall'
      );
      buildings.push(londoncityhall);
      var shard = game.add.sprite((building_offset * 10) + (i * 8000),
        game.height - game.cache.getImage('london-shard').height - buildingElevation,
        'london-shard'
      );
      buildings.push(shard);
      var apartments1 = game.add.sprite((building_offset * 11) + (i * 8000),
        game.height - game.cache.getImage('london-apartments1').height - buildingElevation,
        'london-apartments1'
      );
      buildings.push(apartments1);
      var bigben = game.add.sprite((building_offset * 13) + (i * 8000),
        game.height - game.cache.getImage('london-bigben').height - buildingElevation,
        'london-bigben'
      );
      buildings.push(bigben);
      var alberthall = game.add.sprite((building_offset * 14) + (i * 8000),
        game.height - game.cache.getImage('london-alberthall').height - buildingElevation,
        'london-alberthall'
      );
      buildings.push(alberthall);
      var apartments2 = game.add.sprite((building_offset * 15) + (i * 8000),
        game.height - game.cache.getImage('london-apartments2').height - buildingElevation,
        'london-apartments2'
      );
      buildings.push(apartments2);
    }
    
    //cityStreet
    createRectangle(sceneStart, game.height - 90, sceneWidth, 25, '#444444');//grey

    //center divider
    for(let i = 0; i < 6000; i++){
      //createRectangle(sceneStart, game.height - 78, sceneWidth, 1, '#ffd700');//gold
      createRectangle(i * 30 , game.height - 78, 20, 1, '#ffd700');//gold
    }

    cityBackTrees = game.add.group();
   
    for (let i = 0; i < treegroups; i++){let backtree = cityBackTrees.create( (  i * getRandom(treedistance,treedistance+600)), game.height - game.cache.getImage('london-tree1').height - backTreeElevation, 'london-tree1');}
    for (let i = 0; i < treegroups; i++){let backtree = cityBackTrees.create( (  i * getRandom(treedistance+300,treedistance+900)), game.height - game.cache.getImage('london-tree2').height - backTreeElevation, 'london-tree2');}
    for (let i = 0; i < treegroups; i++){let backtree = cityBackTrees.create( (  i * getRandom(treedistance+600,treedistance+1200)), game.height - game.cache.getImage('london-tree3').height - backTreeElevation, 'london-tree3');}
    for (let i = 0; i < treegroups; i++){let backtree = cityBackTrees.create( (  i * getRandom(treedistance+900,treedistance+1500)), game.height - game.cache.getImage('london-tree4').height - backTreeElevation, 'london-tree4');}
    

    airplaneF1 = game.add.sprite(-500, 100, 'london-airplane-forward');
    game.physics.enable(airplaneF1, Phaser.Physics.ARCADE);
    airplaneF1.fixedToCamera = true; 
    game.add.tween(airplaneF1.cameraOffset).to({x:game.width, y:100},15000, null, false, 15000).loop().start()

    airplaneB1 = game.add.sprite(game.width+ 500, 30, 'london-airplane-backward');
    game.physics.enable(airplaneB1, Phaser.Physics.ARCADE);
    airplaneB1.fixedToCamera = true; 
    game.add.tween(airplaneB1.cameraOffset).to({x:-500, y:30},15000, null, false, 12000).loop().start()

    var busB1_y = game.height - game.cache.getImage('london-bus-backward').height - backwardBusElevation;
    busB1 = game.add.sprite(game.width + 100, busB1_y,'london-bus-backward');
    game.physics.enable(busB1, Phaser.Physics.ARCADE);
    busB1.fixedToCamera = true; 
    game.add.tween(busB1.cameraOffset).to({x:-300, y: busB1_y }, 18000, null, false, 20000).loop().start()

    var cabB1_y = game.height - game.cache.getImage('london-cab-backward').height - backwardCabElevation;
    cabB1 = game.add.sprite(game.width + 200, cabB1_y, 'london-cab-backward');
    game.physics.enable(cabB1, Phaser.Physics.ARCADE);
    cabB1.fixedToCamera = true; 
    game.add.tween(cabB1.cameraOffset).to({x:-300, y: cabB1_y }, 16000, null, false, 15000).loop().start()

    var busF1_y =  game.height - game.cache.getImage('london-bus-forward').height - forwardBusElevation;
    busF1 = game.add.sprite(-100, busF1_y, 'london-bus-forward');
    game.physics.enable(busF1, Phaser.Physics.ARCADE);
    busF1.fixedToCamera = true; 
    game.add.tween(busF1.cameraOffset).to({x:game.width + 100, y:busF1_y }, 14000, null, false, 10000).loop().start()

    var cabF1_y = game.height - game.cache.getImage('london-cab-forward').height - forwardCabElevation;
    cabF1 = game.add.sprite(-100, cabF1_y,'london-cab-forward');
    game.physics.enable(cabF1, Phaser.Physics.ARCADE);
    cabF1.fixedToCamera = true; 
    game.add.tween(cabF1.cameraOffset).to({x:game.width + 100, y: cabF1_y }, 12000, null, false, 5000).loop().start()

    
    balloon1 = game.add.sprite(screen.width * .85, game.height * .20, 'london-balloon');
    game.physics.enable(balloon1, Phaser.Physics.ARCADE);
    balloon1.anchor.setTo(0.25, 0.0);
    balloon1.fixedToCamera = true; 
    balloon1RotateForward = false;
    game.add.tween(balloon1.cameraOffset).to(
      { x: screen.width * .15,  y: game.height * .20 },15000,Phaser.Easing.Sinusoidal.InOut).to(
      { x: screen.width * .5, y: game.height * .40 },15000,Phaser.Easing.Sinusoidal.InOut).to(
      { x: screen.width * .85, y: game.height * .20 },15000,Phaser.Easing.Sinusoidal.InOut).loop().start();
  

    var londonbridge = game.add.sprite(building_offset * 12,
      game.height - game.cache.getImage('london-londonbridge').height - buildingElevation + 55,
      'london-londonbridge'
    );
    buildings.push(londonbridge);
   
    cityFrontTrees = game.add.group();
    for (let i = 0; i < treegroups; i++){let fronttree = cityFrontTrees.create( i * getRandom(treedistance + 100,treedistance + 600), game.height - game.cache.getImage('london-tree1').height - frontTreeElevation, 'london-tree1');}
    for (let i = 0; i < treegroups; i++){let fronttree = cityFrontTrees.create( i * getRandom(treedistance + 400,treedistance + 900), game.height - game.cache.getImage('london-tree2').height - frontTreeElevation, 'london-tree2');}
    for (let i = 0; i < treegroups; i++){let fronttree = cityFrontTrees.create( i * getRandom(treedistance + 700,treedistance + 1200), game.height - game.cache.getImage('london-tree3').height - frontTreeElevation, 'london-tree3');}
    for (let i = 0; i < treegroups; i++){let fronttree = cityFrontTrees.create( i * getRandom(treedistance + 1000,treedistance + 1600), game.height - game.cache.getImage('london-tree4').height - frontTreeElevation, 'london-tree4');}

    scrollTimesScene = Math.floor(sceneWidth/2);
    calcPosition = 1;
    date = game.add.text(16, 100, "0", { fontSize: '30px', fill: '#ffffff' });
    date.fixedToCamera = true;

    day = game.add.text(16, 50, "0", { fontSize: '30px', fill: '#ffffff' });
    day.fixedToCamera = true;

    time = game.add.text(game.world.centerX - 50, game.height-30, "0", { fontSize: '24px', fontWeight:400, fill: '#ffffff' });
    time.fixedToCamera = true;  

    nightOverlay = createRectangle(sceneStart, 0, sceneWidth, game.height, '#000000');//'#62a1d6');//blue
    nightOverlay.sprite.alpha = 0.0;

    scrollFrame = game.add.text(10,200,scrollFrameCount, {fontSize:'30px', fill:'#5555ff'});
    scrollFrame.fixedToCamera = true;
    scrollFrame.alpha = 0;

    hourDisplay = game.add.text(75,200,'0', {fontSize:'30px', fill:'#88ff88'});
    hourDisplay.fixedToCamera = true;
    hourDisplay.alpha = 0;

    position = game.add.text(10,200, "0", {fontSize:'30px', fill: '#ff8888'});
    position.fixedToCamera = true;
    position.alpha = 1;

    cameraPosition = game.add.text(225,200, "0", {fontSize:'30px', fill: '#8888ff'});
    cameraPosition.fixedToCamera = true;
    cameraPosition.alpha = 0;


}

function getRandom(start, top) {
  return Math.floor(Math.random() * (start)) + top;
}

function createRectangle(x, y, w, h, c) {
  var rectangle = {};
  rectangle.sprite = game.add.graphics(x, y);
  rectangle.sprite.beginFill(Phaser.Color.hexToRGB(c), 1);
  rectangle.sprite.bounds = new PIXI.Rectangle(0, 0, w, h);
  rectangle.sprite.drawRect(0, 0, w, h);
  return rectangle;
}
