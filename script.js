
import GetWords from "./Dictionary.js"

const ArabicWords = GetWords() 

const messages = [
  "هل لديك قدرة خارقة؟",
  "مستحيل انت عبقرى",
  "عظيم",
  "عمل جيد",
  "لست سيئا",
  "أوه، كان هذا وشيكا"
]

function Alerting(msg)
{
  let AlertBox = document.getElementById("alerting")
 
  
  if ( Number.isInteger(msg))
  {
    AlertBox.innerHTML = messages[msg]
  }

  else
  {
    AlertBox.innerHTML = msg
  }

  AlertBox.style.visibility="visible"
  
  setTimeout(()=>{
   AlertBox.style.visibility="hidden"
  },3000)

}

function TimeLeft()
{

  let timer = document.getElementById("timer");
  const Intervalfunction = setInterval(Countdown, 1000);
  
  function Countdown()
  {
    
  let CurenTime = new Date();
  let  EndTime = new Date(CurenTime.getFullYear(),CurenTime.getMonth(), CurenTime.getDate(),24); 
  const hours = (EndTime-CurenTime)/1000/60/60
  const minutes = (hours- Math.floor(hours)) * 60
  const seconds = (minutes-Math.floor(minutes))*60
  let h=""
  let m=""
  let s=""
  if (hours<10)
  {
    h="0"
  }
  if (minutes <10)
  {
    m="0"
  }
  if (seconds < 10)
  {
    s="0"
  }
  timer.innerHTML = `${h}${Math.trunc(hours)}:${m}${Math.trunc(minutes)}:${s}${Math.trunc(seconds)}`;
  if (hours/1000 ==0)
  {
    clearInterval(Intervalfunction)
  }
 
}

}

function NumberOfDays()
{ 
  let StartedDate = new Date(2022,1,4)
  let CurrentTime = new Date()
  let diff = Math.abs(CurrentTime-StartedDate)
  let dayscount = Math.floor(diff/ (1000 * 60 * 60 * 24))
  return dayscount;
}

function GetTodayWord()
{
  let key = Object.keys(ArabicWords)[NumberOfDays()%28]
  let letter = NumberOfDays()%(ArabicWords[key].length)
  return ArabicWords[key][letter]
}

function SearchDict(word)
{
  let key = word[0]
  for (let i=0; i<ArabicWords[key].length; i++)
  {
    if (ArabicWords[key][i]==word)
      return true
  }
  return false
}

function BackgroundOpacity(state)
{
  if (state=="fade")
  {
    document.querySelector(".GameBoard").style.opacity = "60%"
    document.querySelector(".title").style.opacity = "60%"
  }
  if (state=="reset")
  {
    document.querySelector(".GameBoard").style.opacity = "100%"
    document.querySelector(".title").style.opacity = "100%"
  }

}

function ShowPanel(state)
{
  
  if (state=="WINNER")
  {

    document.getElementById("status").innerHTML = "أحسنت"
  }
  if (state=="LOSER")
  {
    document.getElementById("status").innerHTML = "حاول المرة القادمة"
    document.getElementById("answer").style.display="block"
    document.querySelector("strong").innerHTML = localStorage.word
  }
  if (state !="playing")
  {
    setTimeout(()=>{
      document.querySelector(".panel").style.display = "block"
      BackgroundOpacity("fade")
    },1000)
    TimeLeft()
  }

}

function RestartGame()
{
  let initial_evaluations =[[],[],[],[],[],[]]
  for (let row =0; row<6; row++)
  {
    for (let column=0; column<5; column++)
    {
      initial_evaluations[row][column] = null
    }
  }

  localStorage.setItem('evaluations',JSON.stringify(initial_evaluations))
  localStorage.setItem('userwords',JSON.stringify([]))
  localStorage.setItem('gamestatus',"playing")
  localStorage.setItem('row',0)
  localStorage.setItem('word',GetTodayWord())
}


document.addEventListener("DOMContentLoaded",()=>
{

// first visit from the user
if (localStorage.userwords === undefined )
{
  localStorage.setItem('playscount',0)
  RestartGame()
}


// subsequential visits
else
{

  // check first if it is  the same day
  if (localStorage.word === GetTodayWord())
  {
    // filling previous played positions whether user still playing or has finished
    let  TypedWords  = JSON.parse(localStorage.getItem('userwords'));
    let  Evaluations = JSON.parse(localStorage.getItem('evaluations'));
    for (let row =0; row < TypedWords.length; row++)
    {
      let Row = document.querySelector(`.row${row}`).getElementsByTagName("input")
      let letter = 0
      for (let column =4; column>=0; column--)
      {
        Row[column].value = TypedWords[row][letter]
        Row[column].style.backgroundColor = Evaluations[row][letter]
        letter++
      }
    }
    ShowPanel(localStorage.getItem('gamestatus'))

  }
  // it is  a new day (a new wordle)
  else
  {
    RestartGame()
  } 
}

let Info=document.getElementById("info")
let Panel = document.querySelector(".panel")
let InfoPanel = document.querySelector(".info_panel")

// show information panel when user clicks on info icon
Info.addEventListener("click",()=>{
  BackgroundOpacity("fade")
  Panel.style.display = "none"
  InfoPanel.style.display = "block"
})

// closing panels when user explicitly clicks on close icon
document.getElementById("close_panel").addEventListener("click",()=>{
  BackgroundOpacity("reset")
  Panel.style.display = "none"

})

document.getElementById("close_info").addEventListener("click",()=>{
  BackgroundOpacity("reset")
  InfoPanel.style.display = "none"
})

// close any opened window when user clicks anywhere outside it 
document.addEventListener("click",(e)=>{
  if(!Info.contains(e.target) && !Panel.contains(e.target) && !InfoPanel.contains(e.target))
  {
    BackgroundOpacity("reset")
    InfoPanel.style.display = "none"
    Panel.style.display = "none"
  }
})


  const WordForToday = localStorage.getItem('word')
  let RowWord = []
  let current_row =  Number(localStorage.row) ;
  let current_position = 0;
  let  AraicOnlyPattern=/^[\u0621-\u064A]+$/

  document.addEventListener("keypress",e=>{
    if (current_position <=4   && current_row <=5 && localStorage.gamestatus =="playing")
    {
 
      let CurrentLetter =  document.getElementById(`row${current_row}_letter${current_position}`); 
      if(AraicOnlyPattern.test(e.key))
      {
        if (CurrentLetter.value =="")
        {
          RowWord.push(e.key)
          CurrentLetter.value= e.key
          CurrentLetter.style.borderColor = "white";
        }
          current_position++;
      }
  }

 })


document.addEventListener("keydown",e=>{

  if(e.key=="Backspace" && current_position >0  && localStorage.gamestatus =="playing")
  {
    current_position--;  
    let CurrentLetter = document.getElementById(`row${current_row}_letter${current_position}`);
    CurrentLetter.value="";
    CurrentLetter.style.borderColor = "#434343"
    RowWord.pop()
  }

  
  // check the word after pressing Enter
  if (e.key=="Enter" && current_position===5 && current_row <=5   && localStorage.gamestatus =="playing")
  {

    const RowWordString = RowWord.join('')
    let ValidWord = [...WordForToday]
    
    const CurrentRowLetters = Object.values(document.querySelector(`.row${current_row}`).getElementsByTagName("input")).reverse()  

    if (SearchDict(RowWordString))
    {
      
      let current_evaluations = JSON.parse(localStorage.getItem('evaluations'));
      let correct_letters =0      
      current_position=0;

      for (let i =0;i<5;i++)
      {
        CurrentRowLetters[i].style.borderColor = "#434343"
        if (RowWord[i] == ValidWord[i])
          {
            CurrentRowLetters[i].style.backgroundColor= "green"
            current_evaluations[current_row][i] = "green"
            RowWord[i] = "-"
            ValidWord[i] ="_"
            correct_letters++
          }
      }

        if (correct_letters==5 || current_row==5)
        {    
          
          localStorage.playscount = Number(localStorage.playscount) + 1;
        
          if (correct_letters==5)
          {
            localStorage.setItem("gamestatus","WINNER")
            Alerting(current_row)
            ShowPanel("WINNER")
          }
          else
          {
            localStorage.setItem("gamestatus","LOSER")
            ShowPanel("LOSER")
          }
        }
        if (correct_letters!=5)
        {
          OuterLoop:
          for(let i = 0;i<5;i++)
          {
            if (RowWord[i] =="-")
            continue
            
            for(let j = 0;j<5;j++)
            {
                if (RowWord[i]==ValidWord[j])
                {
                  CurrentRowLetters[i].style.backgroundColor = "#C9B558"
                  current_evaluations[current_row][i] = "#C9B558"
                  ValidWord[j] = "_"
                  continue OuterLoop
                }
            }
            CurrentRowLetters[i].style.backgroundColor = "#3A3A3C"
            current_evaluations[current_row][i] = "#3A3A3C"
          }
        }
        
        RowWord=[]
        ValidWord = []
        current_row ++;
        localStorage.row = Number(localStorage.row) + 1;
        let userwords = JSON.parse(localStorage.getItem('userwords'));
        userwords.push(RowWordString);
        localStorage.setItem('userwords', JSON.stringify(userwords));
        localStorage.setItem('evaluations', JSON.stringify(current_evaluations));
    }
    else
    {
      Alerting("كلمة ليست فى القاموس ")
    }
  
  
  }

})


})
