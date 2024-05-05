import { useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  PoseDetector,
  createDetector,
  SupportedModels,
} from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

export default function Home() {
  const webcamRef = useRef(null);
  const [pushupCounter, setPushupCounter] = useState(0);
  const [pushupStage, setPushupStage] = useState(null);
  const [message, setMessage] = useState("Prepare for push-up");

  // Load the pose detector
  const loadPoseDetector = async () => {
    const model = SupportedModels.MoveNet;
    const detectorConfig = { modelType: "SinglePose.Lightning" };
    return createDetector(model, detectorConfig);
  };

  // Function to detect pose and calculate angles
  const detectPose = async (detector) => {
    const video = webcamRef.current.video;
    const poses = await detector.estimatePoses(video);

    if (poses.length > 0) {
      const pose = poses[0];
      const elbowAngle = calculateAngle(
        pose.keypoints[11].position, // left shoulder
        pose.keypoints[13].position, // left elbow
        pose.keypoints[15].position, // left wrist
      );

      // Update message based on elbow angle
      if (elbowAngle > 160 && pushupStage === "down") {
        setPushupStage("up");
        setMessage("Extend more");
      } else if (elbowAngle < 60 && pushupStage === "up") {
        setPushupStage("down");
        setPushupCounter(pushupCounter + 1);
        setMessage("Go lower");
      } else {
        setMessage("Perfect! Hold position");
      }
    }
  };

  // Calculate angle between three points
  function calculateAngle(a, b, c) {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) {
      angle = 360 - angle;
    }
    return angle;
  }

  // Start pose detection when the component mounts
  useEffect(() => {
    const detectorPromise = loadPoseDetector();
    detectorPromise.then((detector) => {
      const interval = setInterval(() => {
        detectPose(detector);
      }, 100); // Update pose every 100ms
      return () => clearInterval(interval);
    });
  }, []);

  return (
    <div>
      <Webcam ref={webcamRef} style={{ width: "100%", height: "100%" }} />
      <p>Pushups: {pushupCounter}</p>
      <p>{message}</p>
    </div>
  );
}
