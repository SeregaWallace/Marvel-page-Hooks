import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import setContent from "../../utils/setContent";

import AppBanner from "../appBanner/AppBanner";


import './singleComic.scss';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {clearError, getComicItem, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComicnfo();
        // eslint-disable-next-line
    }, [comicId])

    const updateComicnfo = () => {
        clearError();
        getComicItem(comicId)
            .then(comicLoaded)
            .then(() => setProcess('confirmed'))
    }

    const comicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
        <AppBanner/>
        {setContent(process, comic, View)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, price, thumbnail, language} = data;

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