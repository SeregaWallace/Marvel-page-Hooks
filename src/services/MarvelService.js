import useHttp from "../hooks/http.hook";


const useMarvelService = () => {
    const _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=f5ef98936d09d264d711a9dc8f5d103d';
    const _baseOffset = 210;

    const {loading, error, request, clearError} = useHttp();
    
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBaseUrl}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_getCharacterData);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBaseUrl}characters/${id}?${_apiKey}`);
        return _getCharacterData(res.data.results[0]);
    }

    const getComicsList = async (offset = 0) => {
        const res = await request(`${_apiBaseUrl}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComicItem = async (id) => {
        const res = await request(`${_apiBaseUrl}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    const _getCharacterData = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Sorry, description is not found.',
            thumbnail: char.thumbnail.path + '.' +
                        char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }

    return {
        error,
        loading,
        getCharacter,
        getAllCharacters,
        clearError,
        getComicsList,
        getComicItem
    }
}

export default useMarvelService;