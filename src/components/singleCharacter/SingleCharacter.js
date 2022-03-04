import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";

import './singleCharacter.scss';


const SingleCharacter = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();
        getCharacter(id)
            .then(onDataLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, data, View)}
        </>
    )
}

const View = ({data}) => {

    const {name, wholeDescription, thumbnail} = data;
    
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                name="description"
                content={`${name} character`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{wholeDescription}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main</Link>
        </div>
    )
}

export default SingleCharacter;