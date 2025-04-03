<template>
  <div class="course-player-container">
    <div class="video-player">
      <video ref="videoPlayer" controls>
        <source :src="course.videoUrl" type="video/mp4" />
        <track v-if="course.subtitles" :src="course.subtitles" kind="subtitles" srclang="zh" label="中文" default />
        您的浏览器不支持 HTML5 视频标签。
      </video>
      <div class="controls">
        <button @click="playPause">{{ isPlaying ? '暂停' : '播放' }}</button>
        <button @click="fastForward">快进</button>
        <button @click="rewind">后退</button>
        <button @click="toggleFullscreen">全屏</button>
        <select v-model="playbackRate">
          <option value="0.5">0.5x</option>
          <option value="1.0" selected>1.0x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2.0x</option>
        </select>
      </div>
    </div>
    <div class="notes-section">
      <h3>笔记</h3>
      <textarea v-model="notes" placeholder="添加笔记..."></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const videoPlayer = ref(null);
const isPlaying = ref(false);
const playbackRate = ref(1.0);
const notes = ref('');

const course = ref({
  id: 1,
  title: 'Vue3 入门实战',
  videoUrl: 'https://fd.aigei.com/src/vdo/mp4/18/18d3f9f706ef44e0a5925575b73306ee.mp4?e=1743567480&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:Ss1gy8Nh8YV1DuyC0SSSvargR0k=', // 替换为实际视频URL
  subtitles: 'https://example.com/subtitles.vtt', // 替换为实际字幕URL
});

onMounted(() => {
  const savedNotes = localStorage.getItem(`notes-${course.value.id}`);
  if (savedNotes) {
    notes.value = savedNotes;
  }

  const savedTime = localStorage.getItem(`time-${course.value.id}`);
  if (savedTime) {
    videoPlayer.value.currentTime = parseFloat(savedTime);
  }

  videoPlayer.value.addEventListener('play', () => {
    isPlaying.value = true;
  });

  videoPlayer.value.addEventListener('pause', () => {
    isPlaying.value = false;
  });

  videoPlayer.value.addEventListener('timeupdate', () => {
    localStorage.setItem(`time-${course.value.id}`, videoPlayer.value.currentTime);
  });
});

watch(notes, (newNotes) => {
  localStorage.setItem(`notes-${course.value.id}`, newNotes);
});

watch(playbackRate, (newRate) => {
  videoPlayer.value.playbackRate = newRate;
});

const playPause = () => {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play();
  } else {
    videoPlayer.value.pause();
  }
};

const fastForward = () => {
  videoPlayer.value.currentTime += 10;
};

const rewind = () => {
  videoPlayer.value.currentTime -= 10;
};

const toggleFullscreen = () => {
  if (videoPlayer.value.requestFullscreen) {
    videoPlayer.value.requestFullscreen();
  } else if (videoPlayer.value.mozRequestFullScreen) { // Firefox
    videoPlayer.value.mozRequestFullScreen();
  } else if (videoPlayer.value.webkitRequestFullscreen) { // Chrome, Safari and Opera
    videoPlayer.value.webkitRequestFullscreen();
  } else if (videoPlayer.value.msRequestFullscreen) { // IE/Edge
    videoPlayer.value.msRequestFullscreen();
  }
};
</script>

<style scoped>
.course-player-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
}

.video-player {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.video-player video {
  width: 100%;
  border-radius: 8px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.controls button:hover {
  background-color: #36a77a;
}

.controls select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.controls select:focus {
  border-color: #42b983;
  outline: none;
}

.notes-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notes-section h3 {
  margin-bottom: 10px;
  color: #333;
}

.notes-section textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.notes-section textarea:focus {
  border-color: #42b983;
  outline: none;
}
</style>