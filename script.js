let logs=[];

let unlockedFiles = JSON.parse(
    localStorage.getItem("unlockedFiles")
) || [];

fetch("data/logs.json")
.then(r=>r.json())
.then(data=>{
logs=data;


// przywracanie odblokowanych akt

logs.forEach(log=>{

    if(unlockedFiles.includes(log.id)){

        log.locked=false;

    }

});


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



if(log.locked){


    btn.disabled = true;

    btn.classList.add("locked-file");


}
else{


    btn.onclick=()=>openLog(log);

    btn.classList.add("unlocked-file");


}



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

+++ AKTA ${log.id} +++


STATUS:
ZABLOKOWANE


POZIOM DOSTĘPU:
WYMAGANA AUTORYZACJA


<input id="unlockCode" placeholder="KOD AUTORYZACYJNY">


<button onclick="checkCode('${log.code}')">
ODKRYJ AKTA
</button>


</p>
`;


return;

}



showDocument(log);


}


function checkCode(input){


let unlockedLogs = logs.filter(log => log.code == input);



if(unlockedLogs.length > 0){


    unlockedLogs.forEach(log=>{


        log.locked = false;


        if(!unlockedFiles.includes(log.id)){

            unlockedFiles.push(log.id);

        }


    });



    localStorage.setItem(
        "unlockedFiles",
        JSON.stringify(unlockedFiles)
    );


    renderFiles();



}
else{

 let input = document.getElementById("code");


    input.classList.remove("input-error");


    // wymusza ponowne odpalenie animacji
    void input.offsetWidth;


    input.classList.add("input-error");

}


}
function unlock(){

    let input = document.getElementById("code").value;
    checkCode(input);

}



function showDocument(log){


document.getElementById("document").innerHTML=
`
<p>

+++ AKTA INKWIZYCYJNE ${log.id} +++


TYTUŁ:

${log.title}


DATA:

${log.date}


LOKALIZACJA:

${log.location}


STATUS:

${log.status || "TAJNE"}



RAPORT:


${log.content}



+++ KONIEC AKT +++

</p>

`;
}



function back(){


document.getElementById("content")
.classList.add("hidden");


document.getElementById("file-tree")
.classList.remove("hidden");


}