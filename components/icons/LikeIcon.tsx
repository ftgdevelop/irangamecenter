type Props = {
    className: string;
}

const LikeIcon : React.FC<Props>= props => {

    return(
        <svg 
            className={props.className}
            viewBox="0 0 32 32" 
        >
            <path d="M16.86,28.88c-0.47,0.17-1.25,0.17-1.72,0c-4.02-1.37-13-7.1-13-16.8c0-4.28,3.45-7.75,7.71-7.75  c2.52,0,4.75,1.22,6.15,3.1c0.71-0.96,1.64-1.74,2.71-2.28c1.07-0.54,2.25-0.82,3.45-0.82c4.25,0,7.71,3.46,7.71,7.75  C29.86,21.78,20.88,27.5,16.86,28.88z"/>
        </svg>
    )
}

export default LikeIcon;