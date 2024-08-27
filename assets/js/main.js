import { PoKeDataNext } from './poke-api.js'; 
import { setupButtonEvent } from './buttonEvents.js';
import { ModalPokemon } from './modalDetalhe.js';


let url = 'https://pokeapi.co/api/v2/pokemon/'; // URL inicial

const typeClasses = {
    'bug': 'bug-type',
    'dark': 'dark-type',
    'dragon': 'dragon-type',
    'electric': 'electric-type',
    'fairy': 'fairy-type',
    'fighting': 'fighting-type',
    'fire': 'fire-type',
    'flying': 'flying-type',
    'ghost': 'ghost-type',
    'grass': 'grass-type',
    'ground': 'ground-type',
    'ice': 'ice-type',
    'normal': 'normal-type',
    'poison': 'poison-type',
    'psychic': 'psychic-type',
    'rock': 'rock-type',
    'steel': 'steel-type',
    'water': 'water-type'
};



const upPagina = async () => {
    const body = document.body;

    const section = document.createElement('section');
    section.className = 'content';
    section.innerHTML = `<h1>POKETS</h1>`;
    
    body.appendChild(section);

    const ol_principal = document.createElement('ol');
    ol_principal.className = 'list';
    section.appendChild(ol_principal);

    const div = document.createElement('div');
    div.className = 'divbotoes'
    section.appendChild(div);


    const button = document.createElement('button');
    button.className = 'butao';
    button.innerHTML = 'próximo';
    div.appendChild(button);

    setupButtonEvent(body, ol_principal, section, div)


    // Inicialmente carrega a primeira página
    const pow = await PoKeDataNext(url);
    
    pow.forEach(element => {
        const li_principal = document.createElement('li');

        const tipo = element.types[0];
        if (typeClasses[tipo]) {
            li_principal.classList.add(typeClasses[tipo]);
        }

        ol_principal.appendChild(li_principal);

        const spanNUM = document.createElement('span');
        spanNUM.className = 'number';
        spanNUM.innerHTML = '#' + element.id;
        li_principal.appendChild(spanNUM);

        const spanNome = document.createElement('span');
        spanNome.innerHTML = element.nome;
        li_principal.appendChild(spanNome);

        const divDetalhe = document.createElement('div');
        divDetalhe.className = 'detalhe';
        li_principal.appendChild(divDetalhe);

        const ol_secundario = document.createElement('ol');
        ol_secundario.className = 'types';
        divDetalhe.appendChild(ol_secundario);

        element.types.forEach(tip => {
            const li_secundario = document.createElement('li');
            li_secundario.innerHTML = tip;
            ol_secundario.appendChild(li_secundario);
        });

        const imagPoke = document.createElement('img');
        imagPoke.src = element.foto;
        imagPoke.alt = element.nome;
        divDetalhe.appendChild(imagPoke);


        li_principal.addEventListener('click', ()=> {
            ModalPokemon(body, element.id, element.nome, imagPoke, element.types, typeClasses, section)
        })


        

    });



 
}

document.addEventListener('DOMContentLoaded', () => { upPagina(); });
