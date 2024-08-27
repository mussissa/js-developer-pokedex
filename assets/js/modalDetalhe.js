
import { Pokedetalhe } from "./pokeDetalhe.js";

export async function ModalPokemon(body, id, nome, imagem, tipos, coresBackground, section) 
{

  const about = new Pokedetalhe(id)
  let effect ='';
  try{
     effect =  await about.hability();
   
  }catch(error){
    throw new Error('API request failed');
  }

  console.log(nome)



  const upModal = ()=>{
      
        const div_modal = document.createElement('div');
        div_modal.className = 'modal'
        div_modal.setAttribute('id','myModal');
        div_modal.classList.add(coresBackground[tipos[0]]);


        const span =  document.createElement('span');
        span.className='close'
        span.innerHTML = '&times;'
        div_modal.appendChild(span)

        const div_imagem = document.createElement('div');
        div_imagem.className = 'divImag'
        div_modal.appendChild(div_imagem)

        const nomePoke = document.createElement('p');
        nomePoke.innerHTML = nome;
        div_imagem.appendChild(nomePoke);


        const div_Imagepoke = document.createElement('div');
        div_Imagepoke.className = 'divImagemPoke';
        div_imagem.appendChild(div_Imagepoke);


        const ol_modal = document.createElement('ol');
        ol_modal.className = 'tip_modal';
        div_Imagepoke.appendChild(ol_modal);


        tipos.forEach(tipo => {
          const tip_modal = document.createElement('li');
          tip_modal.innerHTML = tipo;
          ol_modal.appendChild(tip_modal);
        });

        const imagemdet  = document.createElement('img');
        imagemdet.className = 'imgDet'
        imagemdet.src = imagem.src
        imagemdet.alt = imagem.alt

        imagemdet.onload = () => {
          div_Imagepoke.appendChild(imagemdet);
        };

         section.appendChild(div_modal);
       section.classList.add("modal-open");

        const div_modal_aux = document.createElement('div');
        div_modal_aux.className = 'content-modal'
        div_modal.appendChild(div_modal_aux);



        const divdet = document.createElement('div');
        divdet.className='carateristica'
        div_modal_aux.appendChild(divdet)


        const lm = document.createElement('p');
        lm.innerHTML = effect.split('.')[0]
        divdet.appendChild(lm);

        

        const ln = document.createElement('p');
        ln.classList.add('negrito')
        ln.innerHTML = 'ATK : ' + Math.floor((Math.random()  * (50 - 1)) + 1);
        divdet.appendChild(ln);

        const ls = document.createElement('p');
        ls.classList.add('negrito')
        ls.innerHTML = 'DEF : '+ Math.floor((Math.random()  * (50 - 1)) + 1);
        divdet.appendChild(ls);

        const lp = document.createElement('p');
        lp.classList.add('negrito')
        lp.innerHTML = 'HP : ' + Math.floor((Math.random()  * (50 - 1)) + 1);
        divdet.appendChild(lp);



        div_modal.style.display = "block";
    


        span.addEventListener('click', ()=>{
           section.classList.remove("modal-open")
           div_modal.parentElement.removeChild(div_modal)
        })





       

    
  }



    document.addEventListener('DOMContentLoaded', upModal());

}


