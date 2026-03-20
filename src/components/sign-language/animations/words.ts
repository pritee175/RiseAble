// Basic word animations for common words
export const HOME = (ref) => {
    let animations = []

    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", -Math.PI/3, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI/70, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI/7, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);

    animations.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI/3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/70, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/7, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);

    ref.animations.push(animations);

    animations = []
    animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI/2.5, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/2.5, "-"]);

    ref.animations.push(animations);
    
    animations = []
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI/1.5, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/1.5, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const HELLO = (ref) => {
    let animations = []
    
    // Simple wave gesture for HELLO
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/4, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/6, "+"]);
    
    ref.animations.push(animations);
    
    // Wave motion
    animations = []
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/6, "-"]);
    ref.animations.push(animations);
    
    animations = []
    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/6, "+"]);
    ref.animations.push(animations);
    
    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/1.5, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
    
    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const THANK = (ref) => {
    let animations = []
    
    // Bring hand to chin for THANK
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI/3, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/6, "+"]);
    
    ref.animations.push(animations);
    
    // Move forward (thank you gesture)
    animations = []
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/6, "+"]);
    ref.animations.push(animations);
    
    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
    
    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const YOU = (ref) => {
    let animations = []
    
    // Point forward for YOU
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI/4, "-"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", -Math.PI/2, "-"]);
    
    ref.animations.push(animations);
    
    // Return to default
    animations = []
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "+"]);
    
    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

// Export word list for easy checking
export const wordList = ['HOME', 'HELLO', 'THANK', 'YOU']