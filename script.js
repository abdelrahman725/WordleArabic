ArabicWords = [
'أقداد',
'أبراج',
'ألفاظ',
'بوابل',
'باردة',
'باكرة',
'براقة',
'باهتة',
'بترول',
'بذرات',
'بطاطس',
'باهظة',
'بطلات',
'باقات',
'بربرة',
'بائعة',
'بوابة',
'برشام',
'بقاعة',
'بطاقة',
'برونز',
'بشائر',
'بورصة',
'برمجة',
'بعوضة',
'برهان',
'الفشن',
'تشابك',
'اباحي',
'الفطر',
'تنظيف',
'تحويل',
'رئاسة',
'تأييد',
'تنافس',
'أشبال',
'ترقيم',
'ألماس',
'روتين',
'تحريك',
'السجن',
'تاريخ',
'تشريع',
'تفاحة',
'تجاور',
'تجفيف',
'الفضي',
'تقييم',
'أطفال',
'ترفيه',
'الشجر',
'تراكب',
'تعبئة',
'الشحن',
'تمشيط',
'توصيل',
'أعضاء',
'رقيقة',
'تجانس',
'تلميذ',
'تطبيق',
'توظيف',
'توافق',
'تفخيم',
'تكاثف',
'الجهر',
'تدليك',
'تباهى',
'تراكم',
'تبخير',
'تخويف',
'تقسيم',
'تشابل',
'السحق',
'تلوين',
'ترسيم',
'الشحي',
'تعرية',
'الشحم',
'تبجيل',
'أفراد',
'رهينة',
'رامين',
'أسماك',
'توقيع',
'أعصاب',
'تسابق',
'تسويق',
'تحريم',
'الفصة',
'تجليد',
'تسهيل',
'أصالة',
'ترخيص',
'ترحيل',
'تراقب',
'تهديم',
'أفراح',
'توكيد',
'تشويق',
'تعافى',
'رائجة',
'الشبل',
'تخاطر',
'الجهد',
'الغرف',
'تلميح',
'رطوبة',
'الفصح',
'ترقية',
'الفضة',
'تكافؤ',
'أطعمة',
'أصابع',
'تناقش',
'تطبيع',
'تلويث',
'ترجمة',
'أحباء',
'ترقيع',
'توكيل',
'ركنية',
'تعاون',
'رقابة',
'تجاوب',
'راوية',
'تواكب',
'تباين',
'الفزع',
'تطاول',
'الغرض',
'تشويه',
'تجاوز',
'رايات',
'رئيسة',
'تهذيب',
'الفعل',
'الفصل',
'تقييم',
'الفضل',
'رياضة',
'السحب',
'تعايش',
'رائدة',
'تسوية',
'تقرير',
'راندا',
'أسماء',
'تخاطب',
'أبحاث',
'أحباب',
'تدليس',
'تدقيق',
'تساؤل',
'رقاقة',
'الفرو',
'تكاثر',
'الغزل',
'رئيسى',
'الغرق',
'تخمين',
'تحريف',
'تجاهل',
'الجنس',
'تقارب',
'رمضان',
'الجهة',
'تحقيق',
'تداعي',
'الغرس',
'رهيبة',
'تنظيم',
'السحر',
'الفشل',
'ترحيب',
'رضاعة',
'أراضي',
'تناقض',
'رائعة',
'رائدا',
'رائعا',
'أفخاذ',
'أطراف',
'ترقوة',
'رماية',
'تراني',
'الشبه',
'توطين',
'روائع',
'توقيف',
'رواجا',
'أجانب',
'ترانس',
'الشخص',
'تشريف',
'تشاؤم',
'أفران',
'أشباح',
'تعامل',
'توضيح',
'تحجيم',
'الشحر',
'السجق',
'السجل',
'تدافع',
'توعية',
'تسارع',
'أبريل',
'تعاود',
'تلفاز',
'تباعد',
'تشويش',
'تناقص',
'تقييد',
'أسلوب',
'رائحة',
'ترتيل'
]

document.addEventListener("DOMContentLoaded",()=>
{



if (localStorage.userwords === undefined )
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
  localStorage.setItem('playscount',0)
  localStorage.setItem('gamestatus',"playing")
  localStorage.setItem('row',0)
}


else
{

  let  TypedWords  = JSON.parse(localStorage.getItem('userwords'));
  let  Evaluations = JSON.parse(localStorage.getItem('evaluations'));
  for (let row =0; row<TypedWords.length; row++)
  {
    let Row = Object.values(document.querySelector(`.row${row}`).getElementsByTagName("input")).reverse()  
    for (let letter =0; letter<5; letter++)
    {
      Row[letter].value = TypedWords[row][letter]
      Row[letter].style.backgroundColor = Evaluations[row][letter]
    }
  }
 
}

  
  let current_row =  Number(localStorage.row) ;
  let current_position =0;
  const WordForToday = ArabicWords[80]
  
  AraicOnlyPattern=/^[\u0621-\u064A]+$/

  document.addEventListener("keypress",e=>{
    if (current_position <=4   && current_row <=5 && localStorage.gamestatus =="playing")
    {
      let CurrentLetter =  document.getElementById(`row${current_row}_letter${current_position}`); 
      if(AraicOnlyPattern.test(e.key))
      {
        if (CurrentLetter.value =="")
        { CurrentLetter.value= e.key}
          current_position++;
      }

  }

})
  

document.addEventListener("keydown",e=>{

  if(e.key=="Backspace" && current_position >0  && localStorage.gamestatus =="playing")
  {
    current_position--;  
    document.getElementById(`row${current_row}_letter${current_position}`).value="";
  }


  
  // checking the user's word after pressing Enter key
  if (e.key=="Enter" && current_position===5 && current_row <=5   && localStorage.gamestatus =="playing")
  {
    // TypedWords:["word1","wrod2",..]
    let current_evaluations = JSON.parse(localStorage.getItem('evaluations'));

    let TypedWord=""
    let correct_letters =0 
  
    const CurrentRowLetters = Object.values(document.querySelector(`.row${current_row}`).getElementsByTagName("input")).reverse()  
    let UserLetters=  []
    let ValidWord =  [...WordForToday]
  
    current_position=0;

 
    for (let i =0;i<5;i++)
    {
      UserLetters.push(CurrentRowLetters[i].value)
      TypedWord += CurrentRowLetters[i].value
      
      if (UserLetters[i] == ValidWord[i])
        {
          CurrentRowLetters[i].style.backgroundColor= "green"
          current_evaluations[current_row][i] = "green"
          UserLetters[i] = "-"
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
        }
        else
        {
          localStorage.setItem("gamestatus","LOSER")
        }
      }

 
        OuterLoop:
        for(let i = 0;i<5;i++)
        {
          if (UserLetters[i] =="-")
          continue
          
          for(let j = 0;j<5;j++)
          {
              if (UserLetters[i]==ValidWord[j])
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
      

      current_row ++;
      localStorage.row = Number(localStorage.row) + 1;
      userwords = JSON.parse(localStorage.getItem('userwords'));
      userwords.push(TypedWord);
      localStorage.setItem('userwords', JSON.stringify(userwords));
      localStorage.setItem('evaluations', JSON.stringify(current_evaluations));
  }




})



})
