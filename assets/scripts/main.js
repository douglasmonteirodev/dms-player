let sound = document.querySelector("#sound");
let title = document.querySelector("#title");
let artist = document.querySelector("#artist");
let logo = document.querySelector("#logo");
let btn_play = document.querySelector("#btn-play");
let btn_pause = document.querySelector("#btn-pause");
let bar_progress = document.querySelector("#bar_progress");
let volume_bar = document.querySelector("#volume_bar");
let end_music = document.querySelector(".end");
let elapsed_time = document.querySelector(".start");
let vol = document.querySelector("#vol");
let muted = document.querySelector("#muted");
let player_music = document.querySelector(".player_music");
let playlist = document.querySelector(".playlist");
let list_music = document.querySelector("#list_music");
let repeat_click = false;
var i = 0;

document.addEventListener("DOMContentLoaded", () => {
  sound.src = list_songs[i].src_audio;
  list_songs.forEach((musica) => {
    list_music.innerHTML += `<div class="pl_music btn_tocar">
                            ${musica.name_music} - ${musica.artist}
                            </div> `;
    add_click_playlist();
  });
});

function add_click_playlist() {
  let botaoPlay = document.querySelectorAll(".btn_tocar");
  for (let index in botaoPlay) {
    botaoPlay[index].onclick = () => {
      i = Number(index);
      att_playlist();
      att_dados();
    };
  }
}

function att_playlist() {
  playlist.style.display = "none";
  player_music.style.display = "flex";
  btn_play.style.display = "none";
  btn_pause.style.display = "flex";
}

function show_playlist() {
  playlist.style.display = "flex";
  player_music.style.display = "none";
}

function close_playlist() {
  playlist.style.display = "none";
  player_music.style.display = "flex";
}

function play() {
  logo.src = list_songs[i].src_image;
  title.innerHTML = list_songs[i].name_music;
  artist.innerHTML = list_songs[i].artist;
  sound.play();
  setTimeout(duration_song, 100);
  btn_play.style.display = "none";
  btn_pause.style.display = "flex";
}

function pause() {
  sound.pause();
  btn_pause.style.display = "none";
  btn_play.style.display = "flex";
}

function next() {
  i += 1;
  if (i >= list_songs.length) {
    i = 0;
  }
  att_dados();
}

function back() {
  i -= 1;
  if (i < 0) {
    i = list_songs.length - 1;
  }
  att_dados();
}

function att_dados() {
  logo.src = list_songs[i].src_image;
  title.innerHTML = list_songs[i].name_music;
  sound.src = list_songs[i].src_audio;
  artist.innerHTML = list_songs[i].artist;
  btn_play.style.display = "none";
  btn_pause.style.display = "flex";
  sound.play();
  setTimeout(duration_song, 1000);
}

function duration_song() {
  end_music.innerHTML = format_timer(Math.floor(sound.duration));
}

function format_timer(time) {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

setInterval(() => {
  bar_progress.value = sound.currentTime;

  if (bar_progress.value <= 3) {
    bar_progress.setAttribute("max", sound.duration);
  }
  if (sound.currentTime == sound.duration && repeat_click == true) {
    sound.play();
  }
  if (sound.currentTime == sound.duration) {
    next();
  }
  elapsed_time.innerHTML = format_timer(sound.currentTime);
}, 1000);

bar_progress.addEventListener("input", () => {
  sound.currentTime = bar_progress.value;
});

vol.addEventListener("click", () => {
  sound.volume = 0;
  muted.style.display = "inline";
  vol.style.display = "none";
});

muted.addEventListener("click", () => {
  volume_bar.value = 100;
  sound.volume = 1;
  vol.style.display = "inline";
  muted.style.display = "none";
});

function volume() {
  sound.volume = volume_bar.value / 100;
  if (sound.volume == 0) {
    muted.style.display = "inline";
    vol.style.display = "none";
  } else {
    vol.style.display = "inline";
    muted.style.display = "none";
  }
}

function repeat() {
  let btn_repeat = document.querySelector("#btn_repeat");
  if (repeat_click == false) {
    repeat_click = true;
    btn_repeat.style.color = "gold";
  } else {
    repeat_click = false;
    btn_repeat.style.color = "white";
  }
}
