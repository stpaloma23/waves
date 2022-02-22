import * as PIXI from 'pixi.js';
import gsap from "gsap";


let graphics: PIXI.Graphics;


const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true, backgroundColor: 0x553D36});

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    let gap = 30; 
    let lineWidth = 20;
    let yPos = screen.height;
    let xPos = 5;
    let i = 4;
    while(xPos<screen.width){
        let rect = new PIXI.Graphics();
        rect.beginFill(0xBBD8B3);
        rect.drawRect(xPos,0,lineWidth,screen.height);
        xPos+= gap;
        let tween = gsap.to(rect, {
            y: window.innerHeight,
            duration: 0.93,
            repeat: -1,
            yoyo: true,
            lazy: false,
            delay: i*0.01,
          })
        i+=3;
        tween.then(() => {console.log("animating")});
        app.stage.addChild(rect);
    }
    while(yPos>0){
        let rect = new PIXI.Graphics();
        rect.beginFill(0x2589BD);
        rect.drawRect(0,yPos,screen.width,15);
        let tween = gsap.to(rect, {
            x: window.innerWidth,
            duration: 0.95,
            repeat: -1,
            yoyo: true,
            delay: i*0.01,
          })
        i+=3;
        tween.then(() => {console.log("animating")});
        app.stage.addChild(rect);
        yPos -=22;
    }


    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        // sprite.x = window.innerWidth / 2 - sprite.width / 2;
        // sprite.y = window.innerHeight / 2 - sprite.height / 2;
    });

    document.body.appendChild(app.view);

};

main();

