"use client";
import Controls from "@/app/components/Controls";
import Local from "@/app/components/Local";
import Remote from "@/app/components/Remote";
import useSocket from "@/app/hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function RoomPage() {
  const { id: roomId } = useParams();
  const localVideo = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideo.current) localVideo.current.srcObject = stream;
      } catch (e) {
        alert("Could not access camera: " + e.message);
      }
    })();
  }, []);
  const { remotes } = useSocket(roomId, localStream);

  return (
    <div className="h-screen w-screen p-4 flex flex-col gap-4">
      <Local ref={localVideo} />
      <Remote streams={remotes} />
      <Controls />
    </div>
  );
}