class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    Matter.Body.setMass(this.body,this.body.mass*6);
    this.body.frictionAir = 0.001;
    this.image = loadImage("sprites/bird.png");
    this.smoke = loadImage("sprites/smoke.png");
    this.trajectory = [];
  }

  display(){
    super.display();
    if(this.body.velocity.x>10 && this.body.position.x>270){
    var position= [this.body.position.x,this.body.position.y];
    this.trajectory.push(position);
  }
    for(var i=0; i<this.trajectory.length; i= i+1){
    image (this.smoke,this.trajectory[i][0],this.trajectory[i][1]);
    
    }
  }
  

}