"use client";
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const Local = forwardRef((props, ref) => {
  const boxRef = useRef(null);
  const [pos, setPos] = useState({ x: 30, y: 30 });
  const [size, setSize] = useState({ w: 480, h: 270 });
  const [mode, setMode] = useState(null);
  const edges = useRef({ l: false, r: false, t: false, b: false });
  const init = useRef({ x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 });

  useImperativeHandle(ref, () => ({
    get srcObject() {
      return boxRef.current.querySelector('video').srcObject;
    },
    set srcObject(stream) {
      boxRef.current.querySelector('video').srcObject = stream;
    }
  }));


  useEffect(() => {
    setPos({
      x: window.innerWidth - 480 - 30,
      y: window.innerHeight - 270 - 80,
    });
  }, []);

  const setCursor = (e) => {
    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    const l = e.clientX - rect.left < 8;
    const r = rect.right - e.clientX < 8;
    const t = e.clientY - rect.top < 8;
    const b = rect.bottom - e.clientY < 8;

    if ((l && t) || (r && b)) boxRef.current.style.cursor = "nwse-resize";
    else if ((l && b) || (r && t)) boxRef.current.style.cursor = "nesw-resize";
    else if (l || r) boxRef.current.style.cursor = "ew-resize";
    else if (t || b) boxRef.current.style.cursor = "ns-resize";
    else boxRef.current.style.cursor = "grab";
  };

  const onMouseDown = (e) => {
    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    edges.current = {
      l: e.clientX - rect.left < 8,
      r: rect.right - e.clientX < 8,
      t: e.clientY - rect.top < 8,
      b: rect.bottom - e.clientY < 8
    };

    init.current = {
      x: pos.x,
      y: pos.y,
      w: size.w,
      h: size.h,
      px: e.clientX,
      py: e.clientY,
    };

    setMode(edges.current.l || edges.current.r || edges.current.t || edges.current.b ? "resize" : "drag");
    if (mode === "drag") boxRef.current.style.cursor = "grabbing";
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!mode) return setCursor(e);
    if (!boxRef.current) return;

    const { l, r, t, b } = edges.current;
    const dx = e.clientX - init.current.px;
    const dy = e.clientY - init.current.py;

    if (mode === "drag") {
      setPos({ x: init.current.x + dx, y: init.current.y + dy });
      return;
    }

    let newW = Math.max(160, l ? init.current.w - dx : r ? init.current.w + dx : init.current.w);
    let newH = Math.max(90, t ? init.current.h - dy : b ? init.current.h + dy : init.current.h);

    if (l || r) newH = (newW * 9) / 16;
    else if (t || b) newW = (newH * 16) / 9;

    setSize({ w: newW, h: newH });
    setPos({
      x: l ? init.current.x + (init.current.w - newW) : init.current.x,
      y: t ? init.current.y + (init.current.h - newH) : init.current.y
    });
  };

  const onMouseUp = () => {
    setMode(null);
    if (boxRef.current) boxRef.current.style.cursor = "grab";
  };

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mode, pos, size]);

  return (
    <div
      ref={boxRef} 
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${size.w}px`,
        height: `${size.h}px`,
      }}
      className="absolute rounded-lg border-2 border-gray-600 bg-gray-900 shadow-xl z-10 cursor-grab overflow-hidden"
    >
      <video ref={ref} autoPlay muted playsInline id='local-video' className='object-cover w-full h-full'></video>
    </div>
  );
});

export default Local;