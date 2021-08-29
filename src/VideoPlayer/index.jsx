import React, { useEffect, useRef } from 'react';
import useDomSize from '../hooks/useDomSize';
import './index.css';

function VideoPlayer(props) {
  const { url, duration, progress } = props;
  const canvasRef = useRef();
  const size = useDomSize(canvasRef);
  const videoRef = useRef();
  const durationRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    
    const video = document.createElement('video');
    video.src = url;
    // video.autoplay = true;
    video.muted = true;
    // video.loop = true;
    // document.body.appendChild(video);
    videoRef.current = video;
    // video.play();

    video.addEventListener('play', () => {
      console.log('play duration', video.duration);
      if (video.duration) {
        durationRef.current = video.duration;
      }
    });

    // let isPlay = false // 视频播放状态
    // canvasRef.current.addEventListener('click',function(e) {
      // video.play();
		// 	if(!isPlay) { // 暂停 
		// 		// 解决 由于iOS上视频不能自动播放，导致第一次需要点击两次才能播放视频的问题
		// 		if (video.paused) {
		// 			isPlay = false
		// 			video.play()
		// 		} else {
		// 			isPlay = true
		// 			video.pause()
		// 		}
		// 	} else { // 开始播放
		// 			video.play()
		// 			isPlay=false
		// 	}
	  // });
  }, [url]);

  useEffect(() => {
    // console.log(duration, progress);
    const target = duration * progress / 100;
    // console.log(target);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
      const ctx = canvasRef.current.getContext('2d');
      console.log(videoRef.current);
      ctx.drawImage(videoRef.current, 0, 0, 1280, 720);  //绘制视频
    }
  }, [duration, progress]);

  return (
    <canvas className="video-player" ref={canvasRef} width={size.width || 1280} height={size.height || 720} />
  );
}

export default VideoPlayer;
