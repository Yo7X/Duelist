const {ipcRenderer, ipcMain} = require('electron')

window.addEventListener("load", () => {

  //General
  document.getElementById('build_overlay_window').addEventListener('click', () => {
    ipcRenderer.invoke("openWindow", 'overlay');
  })

  const change_screen = document.getElementById("change_screen")
  change_screen.addEventListener("change", () => {
    ipcRenderer.invoke("change_overlay_screen", change_screen.value);
    console.log("Screen has been changed to: " + change_screen.value);
  });


  //Intermission
  const trailerTog = document.getElementById("trailerTog");
  let trailerTogState = false;
  trailerTog.addEventListener("change", () => {
    if (trailerTogState) {trailerTogState = false} else {trailerTogState = true}
    ipcRenderer.invoke("change_trailerState", trailerTogState);
    console.log("Trailers set to: " + trailerTogState);
  })

  const change_timer = document.getElementById("change_timer");
  const change_timer_value = document.getElementById("change_timer_value");
  change_timer.addEventListener('click', () => {
    ipcRenderer.invoke("change_timer", change_timer_value.value);
    console.log("Timer has been changed to: " + change_timer_value.value)
  })

  const change_team_values = document.getElementById("change_team_values");
  change_team_values.addEventListener("click", () => {
    ipcRenderer.invoke(
      "change_team_values",
      document.getElementById("change_team_value_1").value,
      document.getElementById("change_team_value_2").value
    );
    console.log(
      "Timer has been changed to: " +
      document.getElementById("change_team_value_1").value,
      document.getElementById("change_team_value_2").value
    );
  });


  const change_logo_values = document.getElementById("change_logo_values");
  change_logo_values.addEventListener("click", () => {
    ipcRenderer.invoke(
      "change_logo_values",
      document.getElementById("change_logo_value_1").value,
      document.getElementById("change_logo_value_2").value
    );
    console.log(
      "Timer has been changed to: " +
        document.getElementById("change_logo_value_1").value,
      document.getElementById("change_logo_value_2").value
    );
  });


  //Commentary
  const guestTog = document.getElementById("guestTog");
  let guestTogState = false;
  guestTog.addEventListener("change", () => {
    if (guestTogState) {
      guestTogState = false;
    } else {
      guestTogState = true;
    }
    ipcRenderer.invoke("change_guestSlotState", guestTogState);
    console.log("Guest slot set to: " + guestTogState);
  });

  const change_caster_names = document.getElementById("change_caster_names");
  change_caster_names.addEventListener("click", () => {
    ipcRenderer.invoke(
      "change_caster_names",
      document.getElementById("caster_name_value_1").value,
      document.getElementById("guest_name_value").value,
      document.getElementById("caster_name_value_2").value
      
    );
    console.log(
      "Timer has been changed to: " +
      document.getElementById("caster_name_value_1").value,
      document.getElementById("caster_name_value_2").value,
      document.getElementById("guest_name_value").value
    );
  });

  const change_caster_ids = document.getElementById("change_caster_ids");
  change_caster_ids.addEventListener("click", () => {
    ipcRenderer.invoke(
      "change_caster_ids",
      document.getElementById("caster_id_value_1").value,
      document.getElementById("guest_id_value").value,
      document.getElementById("caster_id_value_2").value
    );
  });

  const change_caster_images = document.getElementById("change_caster_images");
  change_caster_images.addEventListener("click", () => {
    ipcRenderer.invoke(
      "change_caster_images",
      document.getElementById("c1_image1").value,
      document.getElementById("c1_image2").value,
      document.getElementById("c2_image1").value,
      document.getElementById("c2_image2").value,
      document.getElementById("g_image1").value,
      document.getElementById("g_image2").value,
    );
  });

  const botTog = document.getElementById("botTog");
  let botTogState = false;
  botTog.addEventListener("change", () => {
    if (botTogState) {
      botTogState = false;
    } else {
      botTogState = true;
    }
    ipcRenderer.invoke("change_botConnectionStatus", botTogState);
    console.log("Bot connection status set to: " + botTogState);
  });



  //Ban/Picks




  //Gameplay
  const setRoundTtitle = document.getElementById("setRoundTtitle");
  setRoundTtitle.addEventListener("click", () => {
    ipcRenderer.invoke("change_roundTitle", document.getElementById("roundTtitle").value);
    console.log("Round title status set to: " + document.getElementById("roundTtitle").value);
  });

  const setTeamPoints = document.getElementById("setTeamPoints");
  setTeamPoints.addEventListener("click", () => {
    ipcRenderer.invoke(
      "change_teamPoints",
      document.getElementById("team01Points").value,
      document.getElementById("team02Points").value
    );
    console.log(
      "Team points chaged to: " + document.getElementById("team01Points").value,
      document.getElementById("team02Points").value
    );
  });

  const changeRoundWins = document.getElementById("changeRoundWins");
  changeRoundWins.addEventListener("click", () => {
    ipcRenderer.invoke("change_roundWins", document.getElementById("teamWinAwarder").value);
    console.log("Round wins changed: " + document.getElementById("teamWinAwarder").value);
  });

  const resetRoundWins = document.getElementById("resetRoundWins");
  resetRoundWins.addEventListener("click", () => {
    ipcRenderer.invoke("reset_roundWins");
    console.log("Reset rounds");
  });


  const character = [
    ["Doctor", "https://static.wikia.nocookie.net/id5/images/6/6c/Doctor.png/revision/latest/scale-to-width-down/86?cb=20240215003319"],
    ["Lawyer", "https://static.wikia.nocookie.net/id5/images/1/1a/Lawyer.png/revision/latest/scale-to-width-down/104?cb=20241025155024"],
    ["Thief", "https://static.wikia.nocookie.net/id5/images/f/fc/Thief.png/revision/latest/scale-to-width-down/80?cb=20240214213341"],
    ["Gardener", "https://static.wikia.nocookie.net/id5/images/1/19/Gardener.png/revision/latest/scale-to-width-down/83?cb=20251019193733"],
    ["Lucky Guy", "https://static.wikia.nocookie.net/id5/images/9/92/LuckyGuy.png/revision/latest/scale-to-width-down/92?cb=20241025161533"],
    ["Magician", "https://static.wikia.nocookie.net/id5/images/c/ca/Magician.png/revision/latest/scale-to-width-down/87?cb=20240214212356"],
    ["Explorer", "https://static.wikia.nocookie.net/id5/images/c/ca/Explorer.png/revision/latest/scale-to-width-down/86?cb=20241025155747"],
    ["Mercenary", "https://static.wikia.nocookie.net/id5/images/0/00/Mercenary.png/revision/latest/scale-to-width-down/116?cb=20241025160217"],
    ["Coordinator", "https://static.wikia.nocookie.net/id5/images/b/b1/Coordinator.png/revision/latest/scale-to-width-down/92?cb=20241025160508"],
    ["Mechanic", "https://static.wikia.nocookie.net/id5/images/5/55/Mechanic.png/revision/latest/scale-to-width-down/145?cb=20241025160856"],
    ["Forward", "https://static.wikia.nocookie.net/id5/images/0/0e/Forward.png/revision/latest/scale-to-width-down/112?cb=20241025161326"],
    ["The Minds Eye", "https://static.wikia.nocookie.net/id5/images/0/0d/TheMindsEye.png/revision/latest/scale-to-width-down/129?cb=20241025161825"],
    ["Priestess", "https://static.wikia.nocookie.net/id5/images/b/bc/Priestess.png/revision/latest/scale-to-width-down/84?cb=20241025162446"],
    ["Perfumer", "https://static.wikia.nocookie.net/id5/images/3/31/Perfumer.png/revision/latest/scale-to-width-down/94?cb=20220806210828"],
    ["Cowboy", "https://static.wikia.nocookie.net/id5/images/8/89/Cowboy.png/revision/latest/scale-to-width-down/125?cb=20241025163703"],
    ["Dancer", "https://static.wikia.nocookie.net/id5/images/1/1d/FemaleDancer.png/revision/latest/scale-to-width-down/104?cb=20241025163833"],
    ["Seer", "https://static.wikia.nocookie.net/id5/images/e/ee/Seer.png/revision/latest/scale-to-width-down/111?cb=20241025164141"],
    ["Embalmer", "https://static.wikia.nocookie.net/id5/images/c/cf/Embalmer.png/revision/latest/scale-to-width-down/76?cb=20241025164354"],
    ["Prospector", "https://static.wikia.nocookie.net/id5/images/a/ae/Prospector.png/revision/latest/scale-to-width-down/102?cb=20241025165255"],
    ["Enchantress", "https://static.wikia.nocookie.net/id5/images/9/99/Enchantress.png/revision/latest/scale-to-width-down/100?cb=20241025165454"],
    ["Wildling", "https://static.wikia.nocookie.net/id5/images/b/bb/Wildling.png/revision/latest/scale-to-width-down/191?cb=20241025170327"],
    ["Acrobat", "https://static.wikia.nocookie.net/id5/images/8/8f/Acrobat.png/revision/latest/scale-to-width-down/107?cb=20241025210745"],
    ["First Officer", "https://static.wikia.nocookie.net/id5/images/a/a3/FirstOfficer.png/revision/latest/scale-to-width-down/115?cb=20241025210950"],
    ["Barmaid", "https://static.wikia.nocookie.net/id5/images/c/cd/Barmaid.png/revision/latest/scale-to-width-down/87?cb=20241025211122"],
    ["Postman", "https://static.wikia.nocookie.net/id5/images/1/16/Postman.png/revision/latest/scale-to-width-down/89?cb=20241025211335"],
    ["Grave Keeper", "https://static.wikia.nocookie.net/id5/images/e/e9/GraveKeeper.png/revision/latest/scale-to-width-down/119?cb=20241025212512"],
    ["Prisoner", "https://static.wikia.nocookie.net/id5/images/7/71/Prisoner.png/revision/latest/scale-to-width-down/95?cb=20241025212839"],
    ["Entomologist", "https://static.wikia.nocookie.net/id5/images/5/53/Entomologist.png/revision/latest/scale-to-width-down/125?cb=20241025213941"],
    ["Painter", "https://static.wikia.nocookie.net/id5/images/2/24/Painter.png/revision/latest/scale-to-width-down/127?cb=20241025214941"],
    ["Batter", "https://static.wikia.nocookie.net/id5/images/7/7c/Batter.png/revision/latest/scale-to-width-down/139?cb=20241025215824"],
    ["Toy Merchant", "https://static.wikia.nocookie.net/id5/images/a/a2/ToyMerchant.png/revision/latest/scale-to-width-down/72?cb=20210730023931"],
    ["Patient", "https://static.wikia.nocookie.net/id5/images/e/e6/Patient.png/revision/latest/scale-to-width-down/108?cb=20211118005351"],
    ["Psychologist", "https://static.wikia.nocookie.net/id5/images/b/b1/Psychologist.png/revision/latest/scale-to-width-down/122?cb=20211111122243"],
    ["Novelist", "https://static.wikia.nocookie.net/id5/images/1/16/Novelist.png/revision/latest/scale-to-width-down/68?cb=20220106030950"],
    ["Little Girl", "https://static.wikia.nocookie.net/id5/images/0/0f/LittleGirl.png/revision/latest/scale-to-width-down/117?cb=20220106030820"],
    ["Weeping Clown", "https://static.wikia.nocookie.net/id5/images/9/9e/WeepingClown.png/revision/latest/scale-to-width-down/88?cb=20220907172352"],
    ["Professor", "https://static.wikia.nocookie.net/id5/images/b/b1/Professor.png/revision/latest/scale-to-width-down/102?cb=20220904011941"],
    ["Antiquarian", "https://static.wikia.nocookie.net/id5/images/2/23/Antiquarian.png/revision/latest/scale-to-width-down/116?cb=20230424214939"],
    ["Composer", "https://static.wikia.nocookie.net/id5/images/6/60/Composer.png/revision/latest/scale-to-width-down/103?cb=20221211080027"],
    ["Journalist", "https://static.wikia.nocookie.net/id5/images/1/1e/Journalist.png/revision/latest/scale-to-width-down/112?cb=20230623151032"],
    ["Aeroplanist", "https://static.wikia.nocookie.net/id5/images/b/b0/Aeroplanist.png/revision/latest/scale-to-width-down/119?cb=20230718144728"],
    ["Cheerleader", "https://static.wikia.nocookie.net/id5/images/b/b7/Cheerleader.png/revision/latest/scale-to-width-down/118?cb=20230831053233"],
    ["Puppeteer", "https://static.wikia.nocookie.net/id5/images/7/7a/Puppeteer.png/revision/latest/scale-to-width-down/171?cb=20240121234914"],
    ["Fire Investigator", "https://static.wikia.nocookie.net/id5/images/4/43/FireInvestigator.png/revision/latest/scale-to-width-down/135?cb=20240414222906"],
    ["Faro Lady", "https://static.wikia.nocookie.net/id5/images/3/37/FaroLady.png/revision/latest/scale-to-width-down/113?cb=20240603224114"],
    ["Knight", "https://static.wikia.nocookie.net/id5/images/6/6b/Knight.png/revision/latest/scale-to-width-down/137?cb=20241017090809"],
    ["Meteorologist", "https://static.wikia.nocookie.net/id5/images/8/8e/Meteorologist.png/revision/latest/scale-to-width-down/94?cb=20250116002312"],
    ["Archer", "https://static.wikia.nocookie.net/id5/images/2/29/Archer.png/revision/latest/scale-to-width-down/108?cb=20250219192533"],
    ["Escapologist", "https://static.wikia.nocookie.net/id5/images/0/07/Escapologist.png/revision/latest/scale-to-width-down/84?cb=20250522134737"],
    ["Lanternist", "https://static.wikia.nocookie.net/id5/images/a/ab/Lanternist.png/revision/latest/scale-to-width-down/105?cb=20250922163711"],

    ["Hell Ember", "https://static.wikia.nocookie.net/id5/images/e/eb/HellEmber.png/revision/latest/scale-to-width-down/142?cb=20210515113318"],
    ["Smiley Face", "https://static.wikia.nocookie.net/id5/images/6/66/SmileyFace.png/revision/latest/scale-to-width-down/169?cb=20251019185813"],
    ["Gamekeeper", "https://static.wikia.nocookie.net/id5/images/b/b3/Gamekeeper.png/revision/latest/scale-to-width-down/171?cb=20240121133845"],
    ["Ripper", "https://static.wikia.nocookie.net/id5/images/8/82/TheRipper.png/revision/latest/scale-to-width-down/149?cb=20180725225333"],
    ["Soul Weaver", "https://static.wikia.nocookie.net/id5/images/b/b2/SoulWeaver.png/revision/latest/scale-to-width-down/250?cb=20251019190224"],
    ["Geisha", "https://static.wikia.nocookie.net/id5/images/a/ab/Geisha.png/revision/latest/scale-to-width-down/214?cb=20210510045511"],
    ["The Feaster", "https://static.wikia.nocookie.net/id5/images/4/4d/TheFeaster.png/revision/latest/scale-to-width-down/179?cb=20210213182300"],
    ["Wu Chang", "https://static.wikia.nocookie.net/id5/images/4/4c/WuChang.png/revision/latest/scale-to-width-down/165?cb=20251019190610"],
    ["Photographer", "https://static.wikia.nocookie.net/id5/images/2/2f/Photographer.png/revision/latest/scale-to-width-down/149?cb=20181212105257"],
    ["Mad Eyes", "https://static.wikia.nocookie.net/id5/images/0/0e/MadEyes.png/revision/latest/scale-to-width-down/162?cb=20210516050012"],
    ["Dream Witch", "https://static.wikia.nocookie.net/id5/images/8/89/DreamWitch.png/revision/latest/scale-to-width-down/161?cb=20210516051547"],
    ["Axe Boy", "https://static.wikia.nocookie.net/id5/images/3/32/AxeBoy.png/revision/latest/scale-to-width-down/238?cb=20210226051311"],
    ["Evil Reptilian", "https://static.wikia.nocookie.net/id5/images/2/24/EvilReptilian.png/revision/latest/scale-to-width-down/190?cb=20191106131938"],
    ["Bloody Queen", "https://static.wikia.nocookie.net/id5/images/c/c3/BloodyQueen.png/revision/latest/scale-to-width-down/154?cb=20210501005713"],
    ["Guard 26", "https://static.wikia.nocookie.net/id5/images/8/89/Guard26.png/revision/latest/scale-to-width-down/165?cb=20210518132317"],
    ["Disciple", "https://static.wikia.nocookie.net/id5/images/b/bd/Disciple.png/revision/latest/scale-to-width-down/126?cb=20210424125335"],
    ["Violinist", "https://static.wikia.nocookie.net/id5/images/f/f1/Violinist.png/revision/latest/scale-to-width-down/172?cb=20231028103747"],
    ["Sculptor", "https://static.wikia.nocookie.net/id5/images/5/53/Sculptor.png/revision/latest/scale-to-width-down/147?cb=20230803012730"],
    ["Undead", "https://static.wikia.nocookie.net/id5/images/b/bf/Undead.png/revision/latest/scale-to-width-down/189?cb=20210131045455"],
    ["The Breaking Wheel", "https://static.wikia.nocookie.net/id5/images/b/b1/TheBreakingWheel.png/revision/latest/scale-to-width-down/167?cb=20210422024953"],
    ["Naiad", "https://static.wikia.nocookie.net/id5/images/f/fd/Naiad.png/revision/latest/scale-to-width-down/199?cb=20210730023355"],
    ["Wax Artist", "https://static.wikia.nocookie.net/id5/images/e/ec/WaxArtist.png/revision/latest/scale-to-width-down/176?cb=20210813021517"],
    ["Nightmare", "https://static.wikia.nocookie.net/id5/images/8/89/%22Nightmare%22.png/revision/latest/scale-to-width-down/217?cb=20220106031159"],
    ["Clerk", "https://static.wikia.nocookie.net/id5/images/4/48/Clerk.png/revision/latest/scale-to-width-down/169?cb=20220321184401"],
    ["Hermit", "https://static.wikia.nocookie.net/id5/images/1/1e/Hermit.png/revision/latest/scale-to-width-down/151?cb=20230221143134"],
    ["Night Watch", "https://static.wikia.nocookie.net/id5/images/2/24/NightWatch.png/revision/latest/scale-to-width-down/174?cb=20230623145451"],
    ["Opera Singer", "https://static.wikia.nocookie.net/id5/images/8/83/OperaSinger.png/revision/latest/scale-to-width-down/173?cb=20230623150736"],
    ["Fools Gold", "https://static.wikia.nocookie.net/id5/images/6/6b/FoolsGold.png/revision/latest/scale-to-width-down/181?cb=20231017031013"],
    ["Shadow", "https://static.wikia.nocookie.net/id5/images/b/ba/TheShadow.png/revision/latest/scale-to-width-down/174?cb=20240301181607"],
    ["Goatman", "https://static.wikia.nocookie.net/id5/images/4/49/Goatman.png/revision/latest/scale-to-width-down/197?cb=20240806192556"],
    ["Hullabaloo", "https://static.wikia.nocookie.net/id5/images/5/5a/Hullabaloo.png/revision/latest/scale-to-width-down/169?cb=20241205192823"],
    ["Peddler", "https://static.wikia.nocookie.net/id5/images/e/e5/Peddler.png/revision/latest/scale-to-width-down/203?cb=20250408053921"],
    ["Cueist", "https://static.wikia.nocookie.net/id5/images/7/76/Cueist.png/revision/latest/scale-to-width-down/118?cb=20250812170114"]
  ];

  let globalSet1 = {
    hunters: [],
    survivors: [],
  }
    let globalSet2 = {
    hunters: [],
    survivors: [],
  }

  let roundTemplate = {
    survivorBans: [],
    hunterBans: [],
    survivorPicks: [],
    hunterPick: []
  }

  const pbRoundSteps = [
    '1_surv_ban',
    '1_surv_ban',
    '1_hunt_ban',
    '1_hunt_ban',
    '1_surv_pick',
    '1_surv_pick',
    '1_surv_ban',
    '1_surv_pick',
    '1_surv_ban',
    '1_surv_pick',
    '1_hunt_pick',
  ]

  let curentStep = 0;

  document.getElementById('addCharcters').addEventListener('click', () => {
    document.querySelectorAll('.clicked').forEach((thing) => {
      switch (pbRoundSteps[curentStep]) {
        case "1_surv_ban":
          roundTemplate.survivorBans.push(thing.src)
          curentStep++

          console.log(curentStep, roundNumber)

          if (curentStep === 2 && roundNumber === 1) {
            curentStep = 4
            console.log('r1 detect')
          } else if (curentStep === 2 && roundNumber === 2) {
            curentStep = 3
            console.log('r2 detect')
          }
        break;
        case "1_surv_pick":
          roundTemplate.survivorPicks.push(thing.src)
          curentStep++
        break;
        case "1_hunt_ban":
          roundTemplate.hunterBans.push(thing.src)
          curentStep++
        break;
        case "1_hunt_pick":
          roundTemplate.hunterPick.push(thing.src)
          curentStep++
        break;
      }
    })

    ipcRenderer.invoke("update_pick/bans", roundTemplate);

    if (curentStep > pbRoundSteps.length - 1) {
      console.log('end of cycle')
      curentStep = 0
      switch (document.getElementById('globalSets').value) {
        case '1':
          globalSet1.hunters.push(roundTemplate.hunterPick[0])
          console.log(roundTemplate.survivorPicks.length)

          for (let i = 0; i < roundTemplate.survivorPicks.length; i++) {
            globalSet1.survivors.push(roundTemplate.survivorPicks[i])
            console.log(roundTemplate.survivorPicks[i])
          }
        break;
        case '2':
          globalSet2.hunters.push(roundTemplate.hunterPick[0])
          console.log(roundTemplate.survivorPicks.length)

          for (let i = 0; i < roundTemplate.survivorPicks.length; i++) {
            globalSet2.survivors.push(roundTemplate.survivorPicks[i])
            console.log(roundTemplate.survivorPicks[i])
          }
        break;
      }
      roundTemplate = {
        survivorBans: [],
        hunterBans: [],
        survivorPicks: [],
        hunterPick: []
      }

      //ipcRenderer.invoke("update_globalBans", globalSet1);

      document.getElementById('set1Dis').innerHTML = `<summary>Show set 1</summary> ${globalSet1.survivors} <br><br>  ${globalSet1.hunters}`
      document.getElementById('set2Dis').innerHTML = `<summary>Show set 2</summary> ${globalSet2.survivors} <br><br>  ${globalSet2.hunters}`
    }

    document.getElementById('cycleStep').innerHTML = pbRoundSteps[curentStep]
    //console.log(roundTemplate)
  })

  document.getElementById('resetGlobals').addEventListener('click', () => {
    globalSet1 = {
      hunters: [],
      survivors: [],
    }
      globalSet2 = {
      hunters: [],
      survivors: [],
    }

    document.getElementById('set1Dis').innerHTML = `<summary>Show set 1</summary> ${globalSet1.survivors} <br><br>  ${globalSet1.hunters}`
    document.getElementById('set2Dis').innerHTML = `<summary>Show set 2</summary> ${globalSet2.survivors} <br><br>  ${globalSet2.hunters}`
  })

  document.getElementById('globalSets').addEventListener('change', () => {
    if (document.getElementById('globalSets').value === '1') {
      ipcRenderer.invoke("update_globalBans", globalSet1);
    } else {
      ipcRenderer.invoke("update_globalBans", globalSet2);
    }
  })

  

  const cSearch = document.getElementById('characterLooking')
  cSearch.addEventListener("input", () => {
    const query = cSearch.value.toLowerCase();

    // Make an array of [item, score]
    const scored = character.map(item => {
      const name = item[0].toLowerCase();
      const score = levenshtein(query, name);
      return { item, score };
    });

    // Sort by best score
    scored.sort((a, b) => a.score - b.score);

    // Take top 5
    const top5 = scored.slice(0, 5);

    // Clear old images
    const holder = document.getElementById("characterFrameHolder");
    holder.innerHTML = "";

    // Create images for each of the top 5
    for (const match of top5) {
      const newEl = document.createElement("img");
      newEl.src = match.item[1]; // second value = image src

      newEl.addEventListener("click", () => {
        newEl.classList.toggle("clicked");
      });

      holder.appendChild(newEl);
    }

    console.log("Top 5:", top5.map(x => x.item[0]));
  });

  function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
}


let roundNumber = 1

  document.getElementById('roundAdvance').addEventListener('click', () => {
    if (roundNumber < 3) {
      roundNumber++
      document.getElementById('roundNumberDisplay').innerText = roundNumber
    }
    
  })

  document.getElementById('roundBack').addEventListener('click', () => {
    if (roundNumber > 1) {
      roundNumber--
      document.getElementById('roundNumberDisplay').innerText = roundNumber
    }
  })

});


  