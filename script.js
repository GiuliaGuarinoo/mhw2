/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const image_checked = "images/checked.png";
const image_unchecked = "images/unchecked.png";
const text_restart = "RICOMINCIA QUIZ"
const num=3;
const checkboxes =[];
const result= {};
const allboxes = document.querySelectorAll('.choice-grid div');
const result_container = document.querySelector('#result');



for (const boxitem of allboxes){
  boxitem.addEventListener("click", change_to_checked);
}



function change_to_checked(event){

    const img_check = event.currentTarget.querySelector('.checkbox');
    const img_chosen = event.currentTarget;
    const bckground = event.currentTarget.parentNode.querySelectorAll('div')
    const unchecked = event.currentTarget.parentNode.querySelectorAll('.checkbox'); 
    
    for (const i of unchecked){
        
        i.src = image_unchecked;
    } 
    
    for (const bck of bckground) {

       bck.classList.add('no-chosen');
       bck.classList.remove('chosen');

    } 
     
     img_check.src = image_checked;
     img_chosen.classList.remove('no-chosen');
     img_chosen.classList.add('chosen');

    unchecked_ok(img_chosen);
    checkboxes.push(img_chosen);

    if (checkboxes.length===num){
      answer()
      for (const boxitem of allboxes){
      boxitem.removeEventListener("click", change_to_checked);
      }
    }
}

function unchecked_ok(div){
      for (let i=0; i<checkboxes.length; i++){
        if (checkboxes[i].dataset.questionId === div.dataset.questionId )
        checkboxes.splice (i,1) 
      }
    }

function answer(){
  let count = 1;
  for (let i=0; i < checkboxes.length; i++){
      for (let j= i+1; j<= checkboxes.length -1; j++){
          if (checkboxes[i].dataset.choiceId === checkboxes[j].dataset.choiceId)
            count = count +1;
      }
    if (count >= ((Math.floor((checkboxes.length)/2)+1))){
        result.title = RESULTS_MAP[checkboxes[i].dataset.choiceId].title
        result.text = RESULTS_MAP[checkboxes[i].dataset.choiceId].contents
        break;
        
    }
      
    else{
      result.title = RESULTS_MAP[checkboxes[0].dataset.choiceId].title
      result.text = RESULTS_MAP[checkboxes[0].dataset.choiceId].contents
    }
  }
show_result();
}

function show_result(){

  const title_result = document.createElement('h2');
  result_container.classList.add('padding');
  title_result.textContent = result.title;
  const text_result = document.createElement('p');
  text_result.textContent = result.text;
  const btn = document.createElement('button');
  btn.id = "restart";
  btn.textContent = text_restart;
  btn.addEventListener('click', restart);
  result_container.querySelector('#title').appendChild(title_result);
  result_container.querySelector('#description').appendChild(text_result);
  result_container.querySelector('#btn').appendChild(btn);

}

function restart(){

  const bckground_rest = document.querySelectorAll('.choice-grid div');
  const unchecked_rest = document.querySelectorAll('.checkbox'); 
  result_container.classList.remove('padding');
  
  for (const i of unchecked_rest){
      
      i.src = image_unchecked;
      } 
  
  for (const bck of bckground_rest) {
    
     bck.classList.remove('chosen');
     bck.classList.remove('no-chosen');
     checkboxes.splice(0,num);
    
   } 

  
  for (const boxitem of allboxes){
     boxitem.addEventListener("click", change_to_checked);
    }
  
    result_container.querySelector('#title').innerHTML = '';
    result_container.querySelector('#description').innerHTML = '';
    result_container.querySelector('#btn').innerHTML = ''; 

}







