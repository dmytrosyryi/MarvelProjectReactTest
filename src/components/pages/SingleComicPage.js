import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';

import './singleComicPage.scss';
import { useEffect, useState } from 'react';




const SingleComicPage = () => {
    const { comicId } = useParams()
    const [comic, setComics] = useState(null)
    const { error, loading, getSingleComic, clearError } = useMarvelService()

    useEffect(() => {
        updateComic(comicId)
    }, [comicId])

    const updateComic = (comicId) => {
        clearError()
        getSingleComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComics(comic)
    }



    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(error || loading || !comic) ? <View comic={comic} /> : null


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )


}
const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, language, price } = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage