"use client";
import { useEffect, useRef } from "react";

export default function Remote({ streams = [] }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    if (streams.length === 0) {
      const msg = document.createElement("div");
      msg.className =
        "flex items-center justify-center w-full h-full text-gray-500";
      msg.textContent = "No other user";
      container.current.appendChild(msg);
      return;
    }

    streams.forEach(({ id, stream }) => {
      const vid = document.createElement("video");
      vid.autoplay = true;
      vid.playsInline = true;

      vid.className = "absolute inset-0 w-full h-full object-cover"
      vid.srcObject = stream;
      vid.setAttribute("data-id", id);
      container.current.appendChild(vid);
    });
  }, [streams]);
  return (
    <div
      ref={container}
      className="absolute inset-0 flex flex-wrap items-center justify-center"
    />
  );
}