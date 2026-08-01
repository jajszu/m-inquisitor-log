let logs=[];


fetch("data/logs.json")
.then(r=>r.json())
.then(data=>{

logs=data;

renderFiles();

});



function renderFiles(){


let box=document.getElementById("files");

box.innerHTML="";


logs.forEach(log=>{


let btn=document.createElement("button");


btn.innerHTML=
`
[${log.id}]
${log.title}
`;



btn.onclick=()=>openLog(log);



box.appendChild(btn);


});


}



function openLog(log){


document.getElementById("file-tree")
.classList.add("hidden");


document.getElementById("content")
.classList.remove("hidden");


let doc=document.getElementById("document");



if(log.locked){


doc.innerHTML=
`
<p>

+++ RECORD ${log.id} +++

STATUS:
LOCKED

CLEARANCE REQUIRED


<input id="unlockCode">

<button onclick="checkCode('${log.code}')">
OVERRIDE
</button>


</p>
`;


return;

}



showDocument(log);


}




function checkCode(correct){


let input=document.getElementById("unlockCode").value;


if(input==correct){


let log=logs.find(x=>x.code==correct);


showDocument(log);


}
else{

alert("ACCESS DENIED");

}


}



function unlock(){


}



function showDocument(log){


document.getElementById("document").innerHTML=
`

<p>

+++ INQUISITORIAL RECORD ${log.id} +++


TITLE:

${log.title}


DATE:

${log.date}


LOCATION:

${log.location}



REPORT:

${log.content}



+++ END OF RECORD +++

</p>

`;

}



function back(){


document.getElementById("content")
.classList.add("hidden");


document.getElementById("file-tree")
.classList.remove("hidden");


}