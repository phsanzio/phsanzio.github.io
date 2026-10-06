const CONFIG = {
  eventDate:"2026-12-05T21:00:00",
  transitionVideoDurationFallback:6500,
  transitionDuration:1000
};

const sceneLanterns=document.getElementById("scene-lanterns");
const sceneTransition=document.getElementById("scene-transition");
const sceneInvite=document.getElementById("scene-invite");

const lanternVideo=document.getElementById("lanternVideo");
const transitionVideo=document.getElementById("transitionVideo");

const enterButton=document.getElementById("enterButton");
const rsvpButton=document.getElementById("rsvpButton");

let transitionStarted=false;
let inviteShown=false;
let touchStartY=null;
let transitionFallbackTimer=null;

function lockScroll(){
  document.documentElement.classList.add("scroll-locked");
  document.body.classList.add("scroll-locked");
}

function unlockScroll(){
  document.documentElement.classList.remove("scroll-locked");
  document.body.classList.remove("scroll-locked");
}

lockScroll();

function startInvitation(){
  if(transitionStarted||inviteShown)return;

  transitionStarted=true;
  lockScroll();
  window.scrollTo(0,0);

  sceneTransition.classList.add("is-active");
  sceneLanterns.classList.add("is-hidden");

  transitionVideo.currentTime=0;

  const playPromise=transitionVideo.play();

  if(playPromise!==undefined){
    playPromise.catch(()=>{});
  }

  transitionFallbackTimer=setTimeout(showInvite,CONFIG.transitionVideoDurationFallback);
}

function showInvite(){
  if(inviteShown)return;

  inviteShown=true;

  if(transitionFallbackTimer){
    clearTimeout(transitionFallbackTimer);
    transitionFallbackTimer=null;
  }

  transitionVideo.pause();

  sceneInvite.classList.add("is-ready");
  sceneTransition.classList.add("is-fading");

  setTimeout(()=>{
    sceneLanterns.remove();
    sceneTransition.remove();

    window.scrollTo(0,0);
    unlockScroll();
  },CONFIG.transitionDuration);
}

transitionVideo.addEventListener("ended",showInvite);

enterButton.addEventListener("click",startInvitation);

window.addEventListener("wheel",event=>{
  if(inviteShown)return;

  event.preventDefault();

  if(!transitionStarted&&event.deltaY>8){
    startInvitation();
  }
},{passive:false});

window.addEventListener("touchstart",event=>{
  if(inviteShown)return;

  if(event.touches.length===1){
    touchStartY=event.touches[0].clientY;
  }
},{passive:true});

window.addEventListener("touchmove",event=>{
  if(!inviteShown){
    event.preventDefault();
  }
},{passive:false});

window.addEventListener("touchend",event=>{
  if(inviteShown||transitionStarted||touchStartY===null){
    touchStartY=null;
    return;
  }

  const distance=touchStartY-event.changedTouches[0].clientY;
  touchStartY=null;

  if(distance>45){
    startInvitation();
  }
},{passive:true});

function openModal(modal){
  if(!modal)return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}

function closeModal(modal){
  if(!modal)return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-modal]").forEach(button=>{
  button.addEventListener("click",()=>{
    openModal(document.getElementById(button.dataset.modal));
  });
});

document.querySelectorAll("[data-close-modal]").forEach(element=>{
  element.addEventListener("click",()=>{
    closeModal(element.closest(".modal"));
  });
});

document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    document.querySelectorAll(".modal.is-open").forEach(closeModal);
  }
});

if(rsvpButton){
  rsvpButton.addEventListener("click",()=>{
    openModal(document.getElementById("rsvpModal"));
  });
}

const copyPixButton=document.getElementById("copyPix");
const pixKeyElement=document.getElementById("pixKey");
const copyFeedback=document.getElementById("copyFeedback");

if(copyPixButton&&pixKeyElement){
  copyPixButton.addEventListener("click",async()=>{
    const pix=pixKeyElement.textContent.trim();

    try{
      await navigator.clipboard.writeText(pix);
      copyFeedback.textContent="Chave PIX copiada!";
    }catch{
      const textarea=document.createElement("textarea");

      textarea.value=pix;
      textarea.style.cssText="position:fixed;opacity:0;pointer-events:none";

      document.body.appendChild(textarea);
      textarea.select();

      try{
        document.execCommand("copy");
        copyFeedback.textContent="Chave PIX copiada!";
      }catch{
        copyFeedback.textContent="Copie a chave manualmente.";
      }

      textarea.remove();
    }

    setTimeout(()=>{
      copyFeedback.textContent="";
    },2500);
  });
}

const countdownElements={
  days:document.getElementById("days"),
  hours:document.getElementById("hours"),
  minutes:document.getElementById("minutes"),
  seconds:document.getElementById("seconds")
};

function pad(value){
  return String(Math.max(0,value)).padStart(2,"0");
}

function updateCountdown(){
  const difference=new Date(CONFIG.eventDate).getTime()-Date.now();

  if(difference<=0){
    Object.values(countdownElements).forEach(element=>{
      element.textContent="00";
    });

    return;
  }

  const totalSeconds=Math.floor(difference/1000);

  countdownElements.days.textContent=pad(
    Math.floor(totalSeconds/86400)
  );

  countdownElements.hours.textContent=pad(
    Math.floor((totalSeconds%86400)/3600)
  );

  countdownElements.minutes.textContent=pad(
    Math.floor((totalSeconds%3600)/60)
  );

  countdownElements.seconds.textContent=pad(
    totalSeconds%60
  );
}

updateCountdown();
setInterval(updateCountdown,1000);

window.addEventListener("load",()=>{
  lanternVideo.play().catch(()=>{});
});