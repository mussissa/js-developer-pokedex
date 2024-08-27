

export class Pokedetalhe{

    constructor(id){
        this.id = id;
    }
    
     
     hability = async() =>{
      
        const url = `https://pokeapi.co/api/v2/ability/${this.id} `

        const response = await fetch(url);
              if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
         if(this.id < 192)
                return data.effect_entries[1].effect
        if( this.id > 191 && this.id < 234)
            return data.effect_entries[0].effect
        
        if(this.id > 233)
            return 'pokemon especial com Efeitos indefinidos'

    }

}