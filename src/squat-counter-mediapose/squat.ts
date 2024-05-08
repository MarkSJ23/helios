import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks, NormalizedLandmarkList } from '@mediapipe/drawing_utils';

interface Landmark {
    x: number;
    y: number;
    visibility?: number;
    z?: number;
}

const PoseComponent = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [squatCounter, setSquatCounter] = useState(0);
    const [squatStage, setSquatStage] = useState<string | null>(null);

    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        if (webcamRef.current && webcamRef.current.video) {
            await pose.send({ image: webcamRef.current.video });
        }
    }, []);

    const calculateAngle = (a: Landmark, b: Landmark, c: Landmark): number => {
        const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
        let angle = Math.abs(radians * 180.0 / Math.PI);
        return angle > 180 ? 360 - angle : angle;
    };

    const onResults = (results: any) => {
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement?.getContext("2d");
        if (canvasCtx && results.image) {
            if (canvasElement) {
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
            }

            if (results.poseLandmarks) {
                drawConnectors(canvasCtx, results.poseLandmarks as NormalizedLandmarkList, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
                drawLandmarks(canvasCtx, results.poseLandmarks as NormalizedLandmarkList, { color: '#FF0000', lineWidth: 2 });

                const leftHip = results.poseLandmarks[23] as Landmark;
                const leftKnee = results.poseLandmarks[25] as Landmark;
                const leftAnkle = results.poseLandmarks[27] as Landmark;
                const kneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

                if (kneeAngle < 90 && squatStage !== 'down') {
                    setSquatStage("down");
                } else if (kneeAngle > 160 && squatStage === "down") {
                    setSquatStage("up");
                    setSquatCounter(count => count + 1);
                }
            }
            canvasCtx.restore();
        }
    };

    return (
       <div style={{ position: 'relative' }}>
            <Webcam ref={webcamRef} style={{ width: '100%', height: 'auto' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
                Squats: {count}
            </div>
        </div>
    );
};

export default PoseComponent;
