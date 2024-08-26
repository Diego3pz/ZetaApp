import BackIcon from "../icons/Back"
import ForwardIcon from "../icons/Forward"


const BackForward = () => {
    return (
        <div className='absolute gap-4'>
            <button className="">
                <BackIcon />
            </button>

            <button className="">
                <ForwardIcon />
            </button>

        </div>
    )
}

export default BackForward