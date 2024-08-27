export let proxima = '';

export async function PoKeDataNext(val) {
    try {
        const response = await fetch(`${val}`);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();

        proxima = data.next; // Atualiza o link da próxima página

        const promises = data.results.map(async (elem) => {
            const fotoPoke = await fetch(elem.url);
            if (!fotoPoke.ok) {
                throw new Error('API request failed');
            }
            const fotoPokeDados = await fotoPoke.json();

            if (fotoPokeDados.sprites.other.dream_world.front_default) {
                return {
                    id: fotoPokeDados.id,
                    nome: fotoPokeDados.name,
                    foto: fotoPokeDados.sprites.other.dream_world.front_default,
                    types: fotoPokeDados.types.map(typeInfo => typeInfo.type.name)
                };
            }
        });

        const pokemons = await Promise.all(promises);
        return pokemons

    } catch (error) {
        console.error('Erro:', error);
    }
}
