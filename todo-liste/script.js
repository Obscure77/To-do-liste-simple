//bouton effacer
const clear = document.querySelector('.clear');
//liste
const list = document.getElementById('list');
//saisie
const input = document.getElementById('input');
//date
const date = document.getElementById('date');

//rond check
const CHECK = "fa-check-circle";
//rond
const UNCHECK = "fa-circle-thin";
//effet rayer
const LINE_THROUGH = "lineThrough";



let LIST, id;

let data = localStorage.getItem('TODO');

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;

    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


//efface la mémoire et on relance
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});


// la date du jour
const option = { weekday: 'long', day: 'numeric', month: 'short'};
const today = new Date();
date.innerHTML = today.toLocaleDateString('fr-FR', option);






//ajout todo, texte, poubelle, done
function addToDo(toDo, id, done, trash) {

    //si le liste est dans la poubelle on arrete
    // si non on continue
    if(trash){
        return;
    }
// condition ? siVraie : siFaux
const DONE = done ? CHECK : UNCHECK;//si done est vrai = Check sinon = Uncheck

//si done est vrai = Line_Through sinon = ""
const LINE = done ? LINE_THROUGH : "";


//texte html pour la tâche
const text = 
`<li class="item">
<i class="fa  ${DONE}  ci" job='complete' id="${id}"></i> 
<p class="text ${LINE}"> ${toDo} </p>
<i class="fa-solid fa-trash-can de" job='delete' id="${id}"></i>
</li>`;

const position = "beforeend"
//texte position "beforeend"
list.insertAdjacentHTML(position, text);
};



// ajout d'une tache à la liste
// on ecoute si la touche entrer est presser
document.addEventListener("keyup", function(event) {
    //keycode 13 = entrer
    if(event.keyCode == 13) {
          const toDo = input.value;

          if(toDo) {
            //la tâche
            //son id
            //si effectuer done
            //si poubelle trash
            addToDo(toDo, id, false, false);

            //ajout tâche avec push
            LIST.push( {
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //ajout de la toDo a la mémoire local
            localStorage.setItem('TODO', JSON.stringify(LIST));

            id++;

          }
          input.value = "";
    }
});


//tâche finie
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
};


//tâche effacer
function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
};


list.addEventListener('click', function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == 'complete') {
        completeToDo(element);
    } else if(elementJob == 'delete') {
        removeTodo(element);
    }

    localStorage.setItem('TODO', JSON.stringify(LIST));
});

