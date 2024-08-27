import { PoKeDataNext, proxima } from './poke-api.js'; // Ajuste o caminho do arquivo conforme necessário
import { ModalPokemon } from './modalDetalhe.js';


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

export function setupButtonEvent(bo, ol_principal, section, div) {
    const button = document.querySelector('.butao');
    const buttonA = document.createElement('button');
    buttonA.className = 'butao';
    
    let ativado = false;
    
    let novoVal = 10



   const atualizaoffset = async (url) =>{
        const pow = await PoKeDataNext(url);

        // Limpa a lista antes de adicionar novos itens
        ol_principal.innerHTML = '';

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
                ModalPokemon(bo, element.id, element.nome, imagPoke, element.types, typeClasses, section)
            })

        });


    }




    button.addEventListener('click', async () => {
        if (proxima) {
              buttonA.innerHTML = 'Anterior';
              div.appendChild(buttonA);

              await atualizaoffset(proxima)
 
        }
        else {
            console.log('Não há mais páginas para carregar.');
        }
    });



    buttonA.addEventListener('click', async () =>{
      
 
        // retira da string pedaço do trecho logo apos a ? nesse caso fico com a segunda parte
        const queryString = proxima.split('?')[1];
        
        // transfor em um objeto URLSearchParams serve para transformar string em key value 
        let params = new URLSearchParams(queryString);
        // pego o valor de offset e subtraio por 40.  lembrando paginação esta 20 itens por pagina 
        novoVal =( params.get('offset') - 40);

        console.log(novoVal)
        //seto novo valor atualizado para ser usado na nova string
        params.set('offset', novoVal);

         //juntando a nova string.  pego a primeira parte da divisao de proxima e junto com params 
        let nuevo = `${proxima.split('?')[0]}?${params.toString()}`;
        

        if (novoVal < 10) {
         //   buttonA.disabled = true;
         //   buttonA.innerHTML = '';
            buttonA.parentElement.removeChild(buttonA)
        }

        await atualizaoffset(nuevo)


    })
}
