const baseURL = 'https://api.themoviedb.org/3/';
export const api_key = 'f91aada4d1ee567f301885f614e26e94';

// Função para puxar a lista de filmes de acordo com o endpoint 
// e retorna a resposta json
export const pullData = async (endpoint) => {
    const request = await fetch(`${baseURL}${endpoint}`);
    const response = await request.json();
    return {response, request};
}

export const movieList = {
  // Retorna objetos dentro de uma array
  // com o titulo da lista e uma lista de filmes ou series
  api: async () => (
    [
      {
        type: 'all',
        slug: 'trending',
        title: 'Trending',
        items: await pullData(`trending/all/day?api_key=${api_key}`)
      },
      {
        type: 'tv',
        slug: 'tv series',
        title: 'TV Series',
        items: await pullData(`tv/popular?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'action',
        title: 'Action',
        items: await pullData(`genre/${28}/movies?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'adventure',
        title: 'Adventure',
        items: await pullData(`genre/${12}/movies?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'horror',
        title: 'Horror',
        items: await pullData(`genre/${27}/movies?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'comedy',
        title: 'Comedy',
        items: await pullData(`genre/${35}/movies?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'documentary',
        title: 'Documentary',
        items: await pullData(`genre/${99}/movies?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'war',
        title: 'War',
        items: await pullData(`genre/${10752}/movies?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'drama',
        title: 'Drama',
        items: await pullData(`genre/${18}/movies?api_key=${api_key}&language=en-US`)
      },
      {
        type: 'movie',
        slug: 'science fiction',
        title: 'Science Fiction',
        items: await pullData(`genre/${12}/movies?api_key=${api_key}&language=en-US`)
      }
    ]
  )
}