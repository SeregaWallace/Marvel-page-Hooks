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
        clearError
    }
}

export default useMarvelService;