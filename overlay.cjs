const { ipcRenderer, desktopCapturer, screen} = require("electron");

window.addEventListener(('load'), () => {
  
  

  let guestShown = false;

  ipcRenderer.on("changeScreen", async (event, chosenScreen) => {

    //clearInterval(bannerClock);

    switch (chosenScreen) {
      case "ss":
        showSSIcons();
        switchScreen(
          1,
          900,
          "startingSoon",
          "C:Users/User/Desktop/Frostbite res/animadedImage01Shake.mp4",
          musicEpic
        );
      break;

      case "casters":
        hideSSIcons();
        switchScreen(
          0,
          300,
          "casters",
          "C:\\Users\\User\\Downloads\\ANIMATION 4K.mp4",
          musicChill
        );
        console.log('212')
        //createBannerInterval();
      break;

      case "b/p":
        switchScreen(
          0,
          300,
          "banPicks",
          "C:Users/User/Desktop/Frostbite res/animadedImage01Shake.mp4",
          "continue"
        );
      break;

      case "gameplay":
        switchScreen(
          0,
          300,
          "gameplay",
          "",
          "cut"
        );
      break;

      default:
        console.log('change screen default case')
      break;
    }
  });

  ipcRenderer.on("toggleTrailers", (event, chosenState) => {
    if (chosenState == true) {
      hideSSIcons();
      playTransition(0);
      setTimeout(() => {
        playTrailers();
      }, 300);
    } else {
      endAfterThisTrailer = true;
    }
  });

  const timer = document.getElementById("timer");
  const timer2 = document.getElementById("timer02");
  let intermisionClock;;
  ipcRenderer.on("changeTimer", (event, chosenTime) => {
    let timeUntil = chosenTime * 60;
    clearInterval(intermisionClock);

    intermisionClock = setInterval(() => {
      if (timeUntil < 0) {
        clearInterval(intermisionClock);
        timer.innerText = `SOON`;
        return;
      }

      const minutes = Math.floor(timeUntil / 60);
      const seconds = timeUntil % 60;

      timer.innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      timer2.innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      timeUntil--;
    }, 1000)
  });

  let teamName1 = ''
  let teamName2 = "";
  ipcRenderer.on("changeTeamNames", (event, team1, team2) => {
    document.getElementById("ss01").innerHTML = `${team1} VS ${team2}`;
    teamName1 = team1;
    teamName2 = team2;
    updateTeamCards()
  });

  ipcRenderer.on("changeTeamLogos", (event, team1, team2) => {
    document.getElementById("ss03").src = `${team1}`;
    document.getElementById("ss02").src = `${team2}`;
  });

  ipcRenderer.on("toggleGuestSlot", (event, chosenState) => {
    if (chosenState == true) {
      document.getElementById("guestSlot").classList.add("guestSlotShown");
    } else {
      document.getElementById("guestSlot").classList.remove("guestSlotShown");
    }
  });

  ipcRenderer.on("changeCasterNames", (event, caster1, guest, caster2) => {
    document.getElementById("namePlate01").innerHTML = `${caster1}`;
    document.getElementById("namePlate02").innerHTML = `${caster2}`;
    document.getElementById("namePlate03").innerHTML = `${guest}`;
  });

  let caster1_poses = {
    state: false,
    idle: "img/yo71.webp",
    talking: "img/yo72.webp",
  };

  let caster2_poses = {
    state: false,
    idle: "img/yo71.webp",
    talking: "img/yo72.webp",
  };

  let guest_poses = {
    state: false,
    idle: "img/yo71.webp",
    talking: "img/yo72.webp",
  };

  ipcRenderer.on("changeCasterImages", (event, c1_i1, c1_i2, c2_i1, c2_i2, g_i1, g_i2) => {
    caster1_poses.idle = c1_i1;
    caster1_poses.talking = c1_i2;

    caster2_poses.idle = c2_i1;
    caster2_poses.talking = c2_i2;

    guest_poses.idle = g_i1;
    guest_poses.talking = g_i2;
  });

  ipcRenderer.on("changeCasterImageState", (event, change) => {
    switch (change) {
      case "c1Change":
        caster1_poses.state = !caster1_poses.state;
        document.getElementById("c1Image").src = 
        caster1_poses.state ? caster1_poses.talking : caster1_poses.idle;
        break;
      case "c2Change":
        caster2_poses.state = !caster2_poses.state;
        document.getElementById("c2Image").src = caster2_poses.state
          ? caster2_poses.talking
          : caster2_poses.idle;
        break;
      case "guestChange":
        guest_poses.state = !guest_poses.state;
        document.getElementById("gImage").src = guest_poses.state
          ? guest_poses.talking
          : guest_poses.idle;
        break;
    }
  });



  ipcRenderer.on("changeRoundTitle", (event, title) => {
    document.getElementById("roundCard").innerHTML = `${title}`;
  });

  let t1Points = 0
  let t2Points = 0
  let t1Wins = 0
  let t1Draws = 0
  let t2Wins = 0
  let t2Draws = 0

  ipcRenderer.on("changeTeamPoints", (event, t1, t2) => {
    document.getElementById("tcpoints1").innerHTML = `${t1}`;
    document.getElementById("tcpoints2").innerHTML = `${t2}`;
  });

  ipcRenderer.on("changeRoundWins", (event, t1, t2) => {
    t1Wins = t1.roundWins
    t1Draws = t1.draws
    t2Wins = t2.roundWins
    t2Draws = t2.draws

    updateTeamCards()
  });

  ipcRenderer.on("resetRoundWins", (event) => {
      t1Wins = 0;
      t1Draws = 0;
      t2Wins = 0;
      t2Draws = 0;
      updateTeamCards()
  });

  ipcRenderer.on('updateMapPick', (event, src) => {
    console.log(src)
    document.getElementById('mapBox').style.backgroundImage = `url("${src}")`
  })

  ipcRenderer.on('updateMapBans', (event, bannedList) => {

    mapBanBox.replaceChildren()

    bannedList.forEach((listItem) => {
      const newElement = document.createElement('div')
      newElement.style.backgroundImage = `url("${listItem}")`
      document.getElementById('mapBanBox').appendChild(newElement)
    })
  })

  ipcRenderer.on("updateP/b", (event, t1, t2, whoIs) => {
    console.log(whoIs)

    let survivorSide
    let hunterSide

    if (whoIs == '1') {
      hunterSide = t1
      survivorSide = t2
    } else {
      hunterSide = t2
      survivorSide = t1
    }

    for (let i = 0; i < 4; i++) {
      if (hunterSide.currentBans[i]) {
        document.getElementById(`srvBan${i}`).style.backgroundImage = `url(${hunterSide.currentBans[i]})`
        document.getElementById(`srvBan${i}`).classList.add('fadeIn')
      } else {
        document.getElementById(`srvBan${i}`).style.backgroundImage = `url(img/waiting.webp)`
      }

      if (survivorSide.currentBans[i]) {
        document.getElementById(`huntBan${i}`).style.backgroundImage = `url(${survivorSide.currentBans[i]})`
      } else {
        if ( document.getElementById(`huntBan${i}`)) {
           document.getElementById(`huntBan${i}`).style.backgroundImage = `url(img/lock.png)`
        }
      }

      if (survivorSide.currentComp[i]) {
        document.getElementById(`survPick${i}`).style.backgroundImage = `url(${survivorSide.currentComp[i]})`
      } else {
        document.getElementById(`survPick${i}`).style.backgroundImage = `url(img/waiting.webp)`
      }
    }

    for (let i = 0; i < survivorSide.survivorGlobals.length; i++) {
      document.getElementById(`sgb${i}`).style.backgroundImage = `url(${survivorSide.survivorGlobals[i]})`
    }

    for (let i = 0 + survivorSide.survivorGlobals.length; i < 12; i++) {
      document.getElementById(`sgb${i}`).style.backgroundImage = `url(img/lock.png)`
    }

    for (let i = 0; i < hunterSide.hunterGlobals.length; i++) {
      document.getElementById(`hgb${i}`).style.backgroundImage = `url(${hunterSide.hunterGlobals[i]})`
    }

    for (let i = 0 + hunterSide.survivorGlobals.length; i < 3; i++) {
      document.getElementById(`hgb${i}`).style.backgroundImage = `url(img/lock.png)`
    }

    // for (let i = 0 + hunterSide.hunterGlobals.length; i < hunterSide.hunterGlobals.length; i++) {
    //   document.getElementById(`hgb${i}`).style.backgroundImage = `url(${template.hunters[i]})`
    // }

    if (hunterSide.currentComp[0]) {
      document.getElementById(`hunterPickBox`).style.backgroundImage = `url(${hunterSide.currentComp[0]})`
    } else {
      document.getElementById(`hunterPickBox`).style.backgroundImage = `url(img/waiting.webp)`
    }
  });

  function updateTeamCards() {
    document.getElementById("tcStats1").innerHTML = `${teamName1} <br> W${t1Wins} &nbsp; D${t1Draws}`;
    document.getElementById("tcStats2").innerHTML = `${teamName2} <br> W${t2Wins} &nbsp; D${t2Draws}`;
  }

  ipcRenderer.on("updateGlobalBans", (even, template) => {
    console.log('this shouldnt be running')
  })

  document.addEventListener("keydown", async (e) => {
    if (e.key == "i") {
      hideSSIcons();
    }

    if (e.key == "u") {
      showSSIcons();
    }
  });

  //getLiveVideo
async function switchScreen(transition, timeout, screen, background, music) {

  let stream = null;

  if (screen === "gameplay") {
    const state = await ipcRenderer.invoke("test");

    stream = await navigator.mediaDevices.getUserMedia({
      audio: { mandatory: { chromeMediaSource: "desktop" } },
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: state.videoId,
        },
      },
    });
  }

  playTransition(transition);

  setTimeout(() => {

    document.querySelectorAll(".screenContainer").forEach((c) => {
      c.style.display = "none";
    });

    if (screen !== "gameplay") {
      backgroundVideo.srcObject = null;
      backgroundVideo.src = background;
    } else {
      backgroundVideo.srcObject = stream;
    }

    if (screen == '') {
      document.querySelectorAll('.pbBox').forEach((box) => {
        box.style.backgroundImage = 'casters'
      })
    }

    document.getElementById(screen).style.display = "block";

    if (music == "cut") {
      CurrentMusic.pause();
    } else if (music !== "continue") {
      CurrentMusic.pause();
      playBGM(music);
    }

  }, timeout);
}

  const backgroundVideo = document.getElementById("ssVideoElement");

  let bannerClock;
  const addBanner = document.getElementById("adBanner");
  const numberOfBanners = 2;
  let currentBanner = 2;

  function createBannerInterval() {
    bannerClock = setInterval(() => {
      const nextBannerSrc = addBanner.classList.remove("adBannerShow");
      void addBanner.offsetWidth;
      addBanner.classList.add("adBannerShow");

      setTimeout(() => {
        document.getElementById(
          "addBannerImg"
        ).src = `banners/banner${currentBanner}.jpg`;
        currentBanner++;
        if (currentBanner > numberOfBanners) {
          currentBanner = 1;
        }
      }, 1000);
    }, 60000);
  }
  createBannerInterval();

  const transitions = [
    {
      name: "frost.mkv",
      volume: 1,
    },
    {
      name: "ice.mkv",
      volume: 1,
    },
  ];

  const transition = document.getElementById("transition");

  function playTransition(position) {
    try {
      transition.pause();
    } catch {}
    transition.src = `transitions/${transitions[position].name}`;
    transition.volume = transitions[position].volume;
  }

  const trailers = [
    {
      name: "filler/filler01.mp4",
      volume: 1,
    },
    {
      name: "filler/filler02.mp4",
      volume: 1,
    },
    {
      name: "filler/filler03.mp4",
      volume: 1,
    },
    {
      name: "filler/filler04.mp4",
      volume: 1,
    },
    {
      name: "filler/filler05.mp4",
      volume: 1,
    },
    {
      name: "filler/filler06.mp4",
      volume: 1,
    },
    // {
    //   name: "C:\\tmp\\0001-0599.mp4",
    //   volume: 1,
    // },
    // {
    //   name: "C:\\Users\\User\\Videos\\2025-09-09 23-20-34.mkv",
    //   volume: 1,
    // },
  ];

  let endAfterThisTrailer = false;
  let trailerPosition;

  function playTrailers(startingFrom) {
    backgroundVideo.loop = false;
    muteMusic = true;
    CurrentMusic.pause();

    if (startingFrom) {
      trailerPosition = Number(startingFrom);
    } else {
      trailerPosition = 0;
    }

    backgroundVideo.muted = false
    timer2.style.display = 'block'
    backgroundVideo.src = trailers[trailerPosition].name;
    backgroundVideo.volume = trailers[trailerPosition].volume;

    trailerPosition++;
  }

  backgroundVideo.addEventListener("ended", () => {
    if (trailerPosition >= trailers.length) {
      trailerPosition = 0;
    }

    if (endAfterThisTrailer === true) {
      returnSSToDefaultState();
      endAfterThisTrailer = false;
    } else {
      playTransition(0);
      setTimeout(() => {
        playTrailers(trailerPosition);
      }, 300);
    }
  });

  const musicEpic = [
    {
      name: "aud/Clocks.mp3",
      volume: 1,
    },
    {
      name: "aud/Ice Hammer.mp3",
      volume: 1,
    },
    {
      name: "aud/The Tread Of Heros.mp3",
      volume: 1,
    },
    {
      name: "aud/Power Of Epic.mp3",
      volume: 1,
    },
    {
      name: "aud/Road To Adventure.mp3",
      volume: 1,
    },
    {
      name: "aud/Epic drama power trailer music video game rock.mp3",
      volume: 1,
    },
    {
      name: "aud/Impregnable bastion.mp3",
      volume: 1,
    },
    {
      name: "aud/Inspiring epic electronic orchestra.mp3",
      volume: 1,
    },
    {
      name: "aud/Inspiring epic orchestral trailer version 4 bed.mp3",
      volume: 1,
    },
  ];

  const musicChill = [
    {
      name: "aud/Ice Waterfall.mp3",
      volume: 0.5,
    },
    {
      name: "aud/Wonderful Christmas Everyone.mp3",
      volume: 0.5,
    },
  ];

  let muteMusic = false;
  let CurrentMusic;
  function playBGM(mood) {
    let RNG = Math.floor(Math.random() * mood.length);
    CurrentMusic = new Audio(mood[RNG].name);
    CurrentMusic.volume = mood[RNG].volume;
    CurrentMusic.play();

    CurrentMusic.addEventListener("ended", () => {
      if (muteMusic === false) {
        playBGM(mood);
      }
    });
  }
  playBGM(musicEpic);

  function returnSSToDefaultState() {
    playTransition(1);
    muteMusic = false;
    backgroundVideo.muted = true
    timer2.style.display = "none";
    playBGM(musicEpic);
    setTimeout(() => {
      backgroundVideo.src =
        "C:Users/User/Desktop/Frostbite res/animadedImage01Shake.mp4";
      backgroundVideo.loop = true;
      showSSIcons();
    }, 900);
  }

  function hideSSIcons() {
    document.getElementById("ss01").classList.remove("ss01Shown");
    document.getElementById("ss01").classList.add("ss01Hidden");

    document.getElementById("ss02").classList.remove("ss02Shown");
    document.getElementById("ss02").classList.add("ss02Hidden");

    document.getElementById("ss03").classList.remove("ss03Shown");
    document.getElementById("ss03").classList.add("ss03Hidden");

    document.getElementById("timer").classList.remove("ss04Shown");
    document.getElementById("timer").classList.add("ss04Hidden");
  }

  function showSSIcons() {
    document.getElementById("ss01").classList.remove("ss01Hidden");
    document.getElementById("ss01").classList.add("ss01Shown");

    document.getElementById("ss02").classList.add("ss02Shown");
    document.getElementById("ss02").classList.remove("ss02Hidden");

    document.getElementById("ss03").classList.add("ss03Shown");
    document.getElementById("ss03").classList.remove("ss03Hidden");

    document.getElementById("timer").classList.add("ss04Shown");
    document.getElementById("timer").classList.remove("ss04Hidden");
  }
})





