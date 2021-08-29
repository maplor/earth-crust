import React, { useEffect, useRef } from 'react';
import useDomSize from '../hooks/useDomSize';
import './index.css';

function VideoPlayer(props) {
  const { url } = props;
  const canvasRef = useRef();
  const size = useDomSize(canvasRef);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext('2d');
    const video = document.createElement('video');
    video.src = url;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    document.body.appendChild(video);

    let timer;
    function render() {
      timer = requestAnimationFrame(render);
      ctx.clearRect(0, 0, size.width, size.height)
      ctx.drawImage(video, 0, 0, 1280, 720);
    }
    render();
    return () => cancelAnimationFrame(timer);
  }, [url]);
  return (
    <canvas className="video-player" ref={canvasRef} />
  );
}

export default VideoPlayer;
