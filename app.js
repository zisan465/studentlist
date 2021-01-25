/*All element Selector */
var     sname=document.getElementById('name');
        fname=document.getElementById('fname'),
        ssubmit=document.getElementById('submit'),
        className=document.getElementById('class'),
        roll=document.getElementById('roll'),
        religion=document.getElementById('religion'),
        tbody=document.getElementById('tbody'),
        birth=document.getElementById('birth'),
        search=document.getElementById('search'),
        popup=document.getElementById('popup'),
        popup1=document.getElementById('popup1'),
        search_select=document.getElementById('search_select'),
        studentValue=new Array();
/*Form Submited Action Doing Here*/
ssubmit.addEventListener('submit',(e)=>{
  e.preventDefault();
  /*Required Element Value Goting Action*/
    let snameval=sname.value,
    classval=className.value,
    rollval=roll.value,
    subjectval=fname.value,
    religionval=religion.value,
    birthval=birth.value;
/*Form Validation Work Action Here (if Validation is success then value gonna local storage*/
if(snameval=='' || classval=='' || rollval=='' || religionval=='' || birthval==''){
  popup.classList.add('popupshow');
}else{
 getData()
  studentValue.push({
    name:snameval,
    subject:subjectval,
    class:classval,
    roll:rollval,
    religion:religionval,
    birth:birthval
  })
localStorage.setItem('allvalue',JSON.stringify(studentValue));
showData();
sname.value='';
roll.value='';
className.value='Class';
religion.value='Religion';
birth.value='';
}
})

/*Global Array Innar new new value passing action here*/
function getData() {
  let allcoverval=localStorage.getItem('allvalue');
  if(allcoverval != null){
    studentValue=JSON.parse(allcoverval);
  }
}
/*Collect All the JSONdata in LocalStorage and Show Browser*/
showData()
function showData() {
  getData()
  let child=tbody.children.length;
for(i=child;i<studentValue.length;i++){
  var snameval=studentValue[i].name,
  classval=studentValue[i].class,
  rollval=studentValue[i].roll,
  subjectval=studentValue[i].subject,
  religionval=studentValue[i].religion,
  birthval=studentValue[i].birth;

  let editsave='<button class="btn btn-outline-warning mr-2" onclick="edit(this)"><i class="fa fa-pencil-square-o "></i></button><button class="btn btn-outline-success" onclick="save(this)"> <i class="fa fa-floppy-o"></i></button><button class="btn btn-danger ml-2" onclick="trash(this)"><i class="fa fa-trash-o"></i></button>';
let allval=[snameval,classval,rollval,subjectval,religionval,birthval,editsave];
let tr=document.createElement('tr');
for(item of allval){
  let td=document.createElement('td');
  td.innerHTML=item;
  tr.appendChild(td);
  tbody.appendChild(tr)
}

/*Hover to Show Button Effect Code*/
let settrCover=tbody.children;
for(let i=0;i<settrCover.length;i++){
  settrCover[i].setAttribute("class", "cover")
  settrCover[i].children[6].setAttribute("class", "edit_card")
  }
}
}
/*Change Search Value*/
let changevalue =0;
 search_select.addEventListener('change',()=>{
  changevalue = search_select.value;
  if(changevalue==0){
    search.setAttribute('placeholder','Name Search...');
    search.type='search';
  }else if(changevalue==1){
    search.setAttribute('placeholder','Class Search...');
    search.type='search';
  }else if(changevalue==2){
    search.setAttribute('placeholder','Roll Search...');
    search.type='number';
  }
 
})

/*Search Section*/
  search.addEventListener('input',()=>{
    var myinput=search.value.toUpperCase().trim();
      let tr=tbody.children;
  
      for(var i=0; i < tr.length;i++){
          let td= tr[i].children[changevalue].innerText.toUpperCase();
          
          if(td.indexOf(myinput)>-1){
              tr[i].style.display=""
          }else{
              tr[i].style.display="none";
          }
      }
  })
/****** 3Button(edit,save,delete) Code Section  **********/
/*Edit Button*/
   function edit(elmnt) {
     let a=elmnt.parentElement.parentElement.children;
     for(let i=0;i<6;i++){
        a[i].setAttribute('contenteditable','true');
        a[i].style.border="2px solid #86fa66"
        a[i].style.background="white";
      }
   }
/*After Edit Save Button*/
   function save(elmnt) {
     let a=elmnt.parentElement.parentElement.children;
     for(let i=0;i<6;i++){
        a[i].setAttribute('contenteditable','false');
        a[i].style.border="";
        a[i].style.background="";
      }
      for (var i = 0, len = tbody.children.length; i < len; i++){
        (function(index){
                tbody.children[i].onclick = function(){
            let getval=tbody.children[index].children;
                  studentValue[index].name=getval[0].innerText;
                  studentValue[index].subject=getval[3].innerText;
                  studentValue[index].class=getval[1].innerText;
                  studentValue[index].roll=getval[2].innerText;
                  studentValue[index].religion=getval[4].innerText;
                  studentValue[index].birth=getval[5].innerText;
                  localStorage.setItem('allvalue',JSON.stringify(studentValue));
                }    
            })(i);
        }
   }
/*Table Element Delete Button */
function trash(e){
  for (var i = 0, len = tbody.children.length; i < len; i++){
  (function(index){
          tbody.children[i].onclick = function(){
            studentValue.splice(index,1);
            localStorage.setItem('allvalue',JSON.stringify(studentValue));
          }    
      })(i);
  }
  e.parentElement.parentElement.remove();
}
/*Popup Close Button*/ 
  function exit(){
    popup.classList.remove('popupshow')
    popup1.classList.remove('popupshow')
  }
function cleardata(){
  popup1.classList.add('popupshow');
}
function deleltedata(){
  localStorage.clear();
  location.reload();
}