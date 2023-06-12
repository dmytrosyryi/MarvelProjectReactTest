
import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import MarvelService from '../../services/MarvelService';

import './charList.scss';


class CharList extends Component {


    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onErrorMessages = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    itemsRef = []

    setRef = (ref) => {
        this.itemsRef.push(ref)
    }

    focusOnItem = (i) => {
        this.itemsRef.forEach(item => item.classList.remove('char__item_selected'))
        this.itemsRef[i].classList.add('char__item_selected')
        this.itemsRef[i].focus()
    }


    renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onSelectedChar(item.id)
                        this.focusOnItem(i)
                    }}
                    onKeyUp={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onSelectedChar(item.id)
                            this.focusOnItem(i)
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }

    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } = this.state

        const items = this.renderItems(charList)

        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(error || loading) ? items : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;