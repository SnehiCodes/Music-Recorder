const WHITE_KEYS=['a','s','q','w','e','r','t','y','u','i','o','p','k','l']
const BLACK_KEYS=['1','2','3','4','5','6','7','8','9','0']

const recordButton= document.querySelector('.record-button')
const playButton = document.querySelector('.play-button')
const saveButton = document.querySelector('.save-button')
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

const keyMap = [...keys].reduce((map,key)=>{
  map[key.dataset.note]= key
  return map
},{})



let recordingStartTime 
let songNotes

keys.forEach(key=>{
    key.addEventListener('click',()=>playNote(key))
}
 )



recordButton.addEventListener('click',toggleRecording) 
saveButton.addEventListener('click',saveSong)
playButton.addEventListener('click',playSong)

document.addEventListener('keydown',e=>{
  if(e.repeat) return
  const key = e.key
  const whiteKeyIndex= WHITE_KEYS.indexOf(key)
  const blackKeyIndex= BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
}) 

function toggleRecording(){
  recordButton.classList.toggle('active')
  if(isRecording()) {
    startRecording()
  }else{
    stopRecording()
  }
}

function isRecording(){
  return recordButton!= null && recordButton.classList.contains('active')
}
  
function startRecording(){
  recordingStartTime = Date.now()
  songNotes =[]
  playButton.classList.remove('show')
  saveButton.classList.remove('show')
}

function stopRecording(){
  playSong()
  playButton.classList.add('show')
  saveButton.classList.add('show')
}

function playSong(){
  if(songNotes ===0)return
  songNotes.forEach(note =>{
    setTimeout( ()=>{
        playNote(keyMap[note.key])
      },note.startTime)
  })
}


function playNote(key){

    if(isRecording()) recordNote(key.dataset.note)
    const noteAudio= document.getElementById(key.dataset.note)
    noteAudio.currentTime=0
    noteAudio.play()
    key.classList.add('active')
    //noteAudio.addEventListener('ended',()=>{
    //key.classList.remove('active')
//})  
  setTimeout(function () {key.classList.remove('active')}, 250);
   
} 

function recordNote(note){
  songNotes.push({
    key:note,
    startTime: Date.now()-recordingStartTime
  })
}

function saveSong (){
  
}



