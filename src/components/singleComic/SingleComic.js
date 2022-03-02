import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './singleComic.scss';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {error, clearError, loading, getComicItem} = useMarvelService();

    useEffect(() => {
        updateComicnfo();
    }, [comicId])

    const updateComicnfo = () => {
        clearError();
        getComicItem(comicId)
            .then(comicLoaded)
    }

    const comicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, price, thumbnail, language} = comic;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                name="description"
                content={`${title} Comic-book`}
                    />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;