/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import LoadingFull from '../LoadingFull';

type Props = {
    active: boolean;
}

const PageLoadingBar: React.FC<Props> = props => {

    const { active } = props;

    const [percentage, setPercentage] = useState(0);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (active) {
            setPercentage(0);
            setOpen(true);
        } else {
            setTimeout(() => { setOpen(false) }, 500);
            setTimeout(() => { setPercentage(0)}, 600);
        }
    }, [active]);

    useEffect(() => {

        let timeOut: any;

        if (!active && open) {
            setPercentage(100);
            setTimeout(() => { setOpen(false) }, 1500);
        } else if (percentage < 30) {
            timeOut = setTimeout(() => { setPercentage(prevState => prevState + 8) }, 500);
        } else if (percentage < 50) {
            timeOut = setTimeout(() => { setPercentage(prevState => prevState + 4) }, 500);
        } else if (percentage < 85) {
            timeOut = setTimeout(() => { setPercentage(prevState => prevState + 1) }, 500);
        } else if (percentage < 95) {
            timeOut = setTimeout(() => { setPercentage(prevState => prevState + .2) }, 500);
        }

        return (() => { clearTimeout(timeOut) })

    }, [percentage, active, open]);


    if (!open) return null;

    return (
        <>
        <div className='fixed z-50 top-0 left-0 h-2 w-full'>
            <div className='md:max-w-lg md:mx-auto'>
                <div
                    className="h-2 bg-gradient-to-r from-[#fe6475] to-[#ff9a8f] transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
        <LoadingFull />
        </>
    )
}

export default PageLoadingBar;