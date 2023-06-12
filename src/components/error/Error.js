import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img src={img} style={{ alignSelf: 'center', justifySelf: 'center' }} alt='Error' />
    )
}

export default ErrorMessage