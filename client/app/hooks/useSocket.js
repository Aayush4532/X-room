"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";


const ICE_CONFIG = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};


export default function useSocket(roomId, localStream) {
    const socketRef = useRef(null);
    const peersRef = useRef({});
    const sendersRef = useRef({});
    const [remotes, setRemotes] = useState([]);
    const addRemoteStream = useCallback((id, stream) => {
        setRemotes(prev => (prev.find(r => r.id === id) ? prev : [...prev, { id, stream }]))
    }, []);

    const removeRemoteStream = useCallback((id) => {
        setRemotes(prev => prev.filter(r => r.id !== id));
    }, []);
    const createPeer = useCallback(async (remoteId, initiator) => {
        if (peersRef.current[remoteId] || !localStream) return;

        const pc = new RTCPeerConnection(ICE_CONFIG);
        peersRef.current[remoteId] = pc;
        localStream.getTracks().forEach(track => {
            const sender = pc.addTrack(track, localStream);
            if (!sendersRef.current[remoteId]) sendersRef.current[remoteId] = [];
            sendersRef.current[remoteId].push(sender);
        });
        pc.onicecandidate = ({ candidate }) => {
            if (candidate) {
                socketRef.current.emit("send-ice", { targetId: remoteId, candidate });
            }
        };

        pc.ontrack = ({ streams }) => {
            addRemoteStream(remoteId, streams[0]);
        };

        if (initiator) {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socketRef.current.emit("send-offer", { targetId: remoteId, offer });
        }
    }, [localStream, addRemoteStream]);

    useEffect(() => {
        if (!localStream) return;
        if (!socketRef.current) {
            socketRef.current = io(process.env.NEXT_PUBLIC_SIGNAL_URL, {
                transports: ["websocket"]
            });
        }

        const s = socketRef.current;

        const handleConnect = () => s.emit("join-room", roomId);
        s.on("connect", handleConnect);

        s.on("all-users", ids => {
            ids.forEach(id => createPeer(id, true));
        });
        s.on("user-connected", id => {
            createPeer(id, false);
        });
        s.on("receive-offer", async ({ from, offer }) => {
            await createPeer(from, false);
            const pc = peersRef.current[from];
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            s.emit("send-answer", { targetId: from, answer });
        });

        s.on("receive-answer", async ({ from, answer }) => {
            const pc = peersRef.current[from];
            pc && !pc.currentRemoteDescription && pc.setRemoteDescription(new RTCSessionDescription(answer));
        });

        s.on("receive-ice", ({ from, candidate }) => {
            const pc = peersRef.current[from];
            pc && pc.addIceCandidate(new RTCIceCandidate(candidate));
        });
        s.on("user-disconnected", id => {
            peersRef.current[id]?.close();
            delete peersRef.current[id];
            delete sendersRef.current[id];
            removeRemoteStream(id);
        });

        return () => {
            s.off("connect", handleConnect);
            s.off("all-users");
            s.off("user-connected");
            s.off("receive-offer");
            s.off("receive-answer");
            s.off("receive-ice");
            s.off("user-disconnected");
            s.disconnect();
            Object.values(peersRef.current).forEach(pc => pc.close());
            peersRef.current = {};
            sendersRef.current = {};
            setRemotes([]);
        };
    }, [roomId, localStream, createPeer, removeRemoteStream]);
    const turnCameraOn = () => {
        localStream?.getVideoTracks().forEach(t => (t.enabled = true));
    };
    const turnCameraOff = () => {
        localStream?.getVideoTracks().forEach(t => (t.enabled = false));
    };
    const toggleMic = () => {
        localStream?.getAudioTracks().forEach(t => (t.enabled = !t.enabled));
    };

    return { remotes, socket: socketRef.current, turnCameraOn, turnCameraOff, toggleMic };
}