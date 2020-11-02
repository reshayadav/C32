class SlingShot{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
       
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
        this.sling3 = loadImage("sprites/sling3.png");
    }

    display(){
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.sling.pointB;
            push ();
            stroke(48,22,8);
            if(pointA.x<270){
            strokeWeight(7);
            line (pointA.x-15,pointA.y,pointB.x-20,pointB.y+15);
            line (pointA.x-15,pointA.y,pointB.x+20,pointB.y+15);
            image (this.sling3,pointA.x-30,pointA.y-15,15,30);
            }
            else if(pointA.x>275){
                strokeWeight(3);
                line (pointA.x+20,pointA.y+5,pointB.x-10,pointB.y+15);
            line (pointA.x+20,pointA.y+5,pointB.x+30,pointB.y+15);
            image (this.sling3,pointA.x+20,pointA.y-10,15,30);
            }
           
        }
           
    }

    fly(){
        this.sling.bodyA = null;
    }
    
    attach(body){
        this.sling.bodyA = body;
    }
}