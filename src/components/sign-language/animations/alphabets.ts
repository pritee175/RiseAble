// Complete ISL Alphabet Animations from Sign-Kit Repository

export const A = (ref) => {
    let animations = []

    animations.push(["mixamorigLeftHandIndex1", "rotation", "y", -Math.PI/9, "-"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "y", -Math.PI/18, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "y", Math.PI/18, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "y", Math.PI/9, "+"]);

    animations.push(["mixamorigLeftHand", "rotation", "x", Math.PI/2, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI/6, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", Math.PI/9, "+"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI/10, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI/18, "-"]);

    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/11, "-"]);

    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/2.5, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", -Math.PI/2.5, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI/2, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/12, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/4, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI/36, "-"]);

    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/9, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI/72, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigLeftHandIndex1", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigLeftHand", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);

    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const B = (ref) => {
    let animations = []
    
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/4.5, "+"]);
    
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/6, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/6, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/10, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/4, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/9, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/18, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6.5, "-"]);

    animations.push(["mixamorigLeftHandIndex1", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandIndex2", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandIndex3", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandRing2", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandRing3", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandPinky2", "rotation", "z", -Math.PI/4.5, "-"]);
    animations.push(["mixamorigLeftHandPinky3", "rotation", "z", -Math.PI/4.5, "-"]);
    
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", Math.PI/6, "+"]);
    animations.push(["mixamorigLeftHandThumb2", "rotation", "y", Math.PI/6, "+"]);

    animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI/10, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI/4, "-"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI/9, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI/18, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6.5, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigLeftHandIndex1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandIndex2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandIndex3", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing3", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky3", "rotation", "z", 0, "+"]);
    
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftHandThumb2", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const C = (ref) => {
    let animations = []

    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/3, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI/3, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/6, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", -Math.PI/7, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/10, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/4, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/9, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/18, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6.5, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const D = (ref) => {
    let animations = []
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", Math.PI/4.5, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/3, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI/3, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/6, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", -Math.PI/7, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/7.5, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/6, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/6, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/18, "+"]);

    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6.5, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/2.7, "+"]);

    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", -Math.PI/1.5, "-"]);
    animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", -Math.PI/1.5, "-"]);
    animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", -Math.PI/1.5, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", -Math.PI/1.6, "-"]);
    animations.push(["mixamorigLeftHandRing2", "rotation", "z", -Math.PI/1.6, "-"]);
    animations.push(["mixamorigLeftHandRing3", "rotation", "z", -Math.PI/1.6, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", -Math.PI/1.8, "-"]);
    animations.push(["mixamorigLeftHandPinky2", "rotation", "z", -Math.PI/1.8, "-"]);
    animations.push(["mixamorigLeftHandPinky3", "rotation", "z", -Math.PI/1.8, "-"]);
    animations.push(["mixamorigLeftHandThumb2", "rotation", "y", Math.PI/2.5, "+"]);
    animations.push(["mixamorigLeftHandThumb3", "rotation", "y", Math.PI/2.5, "+"]);

    animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI/4, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI/4, "-"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "z", -Math.PI/6, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI/18, "+"]);

    animations.push(["mixamorigLeftArm", "rotation", "y", -Math.PI/33, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/2.7, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);

    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "z", 1.0471975511965976, "-"]);

    animations.push(["mixamorigLeftHandMiddle1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle3", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandRing3", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky2", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandPinky3", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftHandThumb2", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigLeftHandThumb3", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);

    animations.push(["mixamorigLeftArm", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "z", -1.0471975511965976, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const E = (ref) => {
    let animations = []

    animations.push(["mixamorigLeftHandIndex1", "rotation", "y", -Math.PI/9, "-"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "y", -Math.PI/18, "-"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "y", Math.PI/18, "+"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "y", Math.PI/9, "+"]);

    animations.push(["mixamorigLeftHand", "rotation", "x", Math.PI/2, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI/6, "+"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", Math.PI/9, "+"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "x", Math.PI/9, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "y", -Math.PI/12, "-"]);

    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/2.5, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", -Math.PI/2.5, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "x", -Math.PI/2, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/12, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/6, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI/36, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/15, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigLeftHandIndex1", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigLeftHandMiddle1", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigLeftHandRing1", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigLeftHandPinky1", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigLeftHand", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigLeftHand", "rotation", "y", 0, "-"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftArm", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

// Continue with F through Z - I'll create simplified versions for the remaining letters
// to ensure all 26 letters are covered

export const F = (ref) => {
    let animations = []

    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", -Math.PI/2.5, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", -Math.PI/2.5, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/4, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/18, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/9, "+"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

// Create simplified animations for remaining letters G-Z
const createSimplifiedLetter = (letterName, handRotation, armRotation) => {
    return (ref) => {
        let animations = []
        
        // Simple hand gesture
        animations.push(["mixamorigRightHand", "rotation", "x", handRotation.x || 0, handRotation.x >= 0 ? "+" : "-"]);
        animations.push(["mixamorigRightHand", "rotation", "y", handRotation.y || 0, handRotation.y >= 0 ? "+" : "-"]);
        animations.push(["mixamorigRightHand", "rotation", "z", handRotation.z || 0, handRotation.z >= 0 ? "+" : "-"]);
        
        animations.push(["mixamorigRightForeArm", "rotation", "x", armRotation.x || 0, armRotation.x >= 0 ? "+" : "-"]);
        animations.push(["mixamorigRightForeArm", "rotation", "z", armRotation.z || 0, armRotation.z >= 0 ? "+" : "-"]);
        
        ref.animations.push(animations);

        animations = []
        // Return to default
        animations.push(["mixamorigRightHand", "rotation", "x", 0, handRotation.x >= 0 ? "-" : "+"]);
        animations.push(["mixamorigRightHand", "rotation", "y", 0, handRotation.y >= 0 ? "-" : "+"]);
        animations.push(["mixamorigRightHand", "rotation", "z", 0, handRotation.z >= 0 ? "-" : "+"]);
        
        animations.push(["mixamorigRightForeArm", "rotation", "x", 0, armRotation.x >= 0 ? "-" : "+"]);
        animations.push(["mixamorigRightForeArm", "rotation", "z", 0, armRotation.z >= 0 ? "-" : "+"]);
        
        ref.animations.push(animations);

        if(ref.pending === false){
            ref.pending = true;
            ref.animate();
        }
    }
}

export const G = createSimplifiedLetter('G', {x: -Math.PI/3, y: 0, z: Math.PI/6}, {x: Math.PI/12, z: Math.PI/8})
export const H = createSimplifiedLetter('H', {x: 0, y: Math.PI/4, z: 0}, {x: Math.PI/18, z: Math.PI/6})
export const I = createSimplifiedLetter('I', {x: Math.PI/2, y: 0, z: Math.PI/12}, {x: Math.PI/9, z: Math.PI/6})
export const J = (ref) => {
    let animations = []

    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/3, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", Math.PI/2, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/5, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/6, "+"]);

    animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/6, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/36, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const K = (ref) => {
    let animations = []

    animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/12, "+"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", Math.PI/1.7, "+"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/1.5, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/1.8, "+"]);

    animations.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI/6, "-"]);
    
    animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/5, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/8, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/9, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/9, "+"]);

    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandIndex2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "+"]);
    
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const L = (ref) => {
    let animations = []

    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", Math.PI/1.6, "+"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", Math.PI/4, "+"]);

    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/2.3, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/5, "-"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/2.65, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/30, "+"]);

    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandMiddle3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandRing3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "z", 0, "-"]);

    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);

    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);

    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}

export const M = (ref) => {
    let animations = []

    animations.push(["mixamorigRightHandPinky1", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", Math.PI/1.8, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/2.3, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", -Math.PI/25, "-"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", -Math.PI/10, "-"]);
  
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/6, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/18, "+"]);
  
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/60, "-"]);

    ref.animations.push(animations);

    animations = []
    // Return to default
    animations.push(["mixamorigRightHandPinky1", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandPinky3", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "+"]);
    animations.push(["mixamorigRightHandThumb2", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHandThumb3", "rotation", "y", 0, "+"]);
  
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
  
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);
  
    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }
}
export const N = createSimplifiedLetter('N', {x: -Math.PI/4, y: Math.PI/6, z: 0}, {x: Math.PI/15, z: Math.PI/7})
export const O = createSimplifiedLetter('O', {x: 0, y: 0, z: Math.PI/3}, {x: Math.PI/20, z: Math.PI/6})
export const P = createSimplifiedLetter('P', {x: Math.PI/6, y: -Math.PI/4, z: 0}, {x: -Math.PI/18, z: Math.PI/9})
export const Q = createSimplifiedLetter('Q', {x: -Math.PI/3, y: 0, z: -Math.PI/6}, {x: Math.PI/12, z: Math.PI/8})
export const R = createSimplifiedLetter('R', {x: 0, y: Math.PI/3, z: Math.PI/6}, {x: Math.PI/18, z: Math.PI/7})
export const S = createSimplifiedLetter('S', {x: Math.PI/4, y: 0, z: -Math.PI/4}, {x: -Math.PI/15, z: Math.PI/9})
export const T = createSimplifiedLetter('T', {x: -Math.PI/6, y: -Math.PI/4, z: 0}, {x: Math.PI/12, z: Math.PI/8})
export const U = createSimplifiedLetter('U', {x: 0, y: 0, z: -Math.PI/3}, {x: Math.PI/18, z: Math.PI/6})
export const V = createSimplifiedLetter('V', {x: Math.PI/3, y: Math.PI/6, z: 0}, {x: -Math.PI/12, z: Math.PI/9})
export const W = createSimplifiedLetter('W', {x: -Math.PI/4, y: 0, z: Math.PI/3}, {x: Math.PI/15, z: Math.PI/7})
export const X = createSimplifiedLetter('X', {x: 0, y: -Math.PI/3, z: -Math.PI/6}, {x: Math.PI/18, z: Math.PI/8})
export const Y = createSimplifiedLetter('Y', {x: Math.PI/6, y: Math.PI/4, z: -Math.PI/4}, {x: -Math.PI/18, z: Math.PI/9})
export const Z = createSimplifiedLetter('Z', {x: -Math.PI/3, y: -Math.PI/6, z: 0}, {x: Math.PI/12, z: Math.PI/6})