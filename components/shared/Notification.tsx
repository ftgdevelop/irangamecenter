import { useState, useEffect } from 'react';

import ModalPortal from './layout/ModalPortal';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { setReduxNotification } from '@/redux/notificationSlice';
import ErrorCircle from '../icons/ErrorCircle';
import CheckCircle from '../icons/CheckCircle';


const Notification: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const storedNotification = useAppSelector(state => state.notification);

    const dispatch = useAppDispatch();

    let icon: React.ReactNode = "";

    if (storedNotification.status === "error") {
        icon = <ErrorCircle className="fill-red-500 w-6 h-6" />;
    } else if (storedNotification.status === "success") {
        icon = <CheckCircle className="fill-green-500 w-6 h-6" />;
    }

    useEffect(() => {
        if (storedNotification.isVisible) {
            setOpen(true)
        }
    }, [storedNotification.isVisible]);

    useEffect(() => {
        if (open) {
            setTimeout(() => { setOpen(false) }, 4000)
        } else {
            setTimeout(() => {
                dispatch(setReduxNotification({
                    status: "",
                    message: "",
                    isVisible: false
                }));
            }, 500)
        }
    }, [open]);

    return (
        <ModalPortal
            show={storedNotification.isVisible}
            selector='notification_modal_portal'
        >
            <div className={`fixed text-sm transition-all translate-x-1/2 max-w-4/5 ${open ? "right-1/2 opacity-100" : "-right-1/2 opacity-0"} bottom-8 z-10 bg-black/90 text-white shadow-normal rounded w-60 p-3 sm:p-5 sm:w-96 max-w-md flex justify-between`}>
                {storedNotification.message }
                {icon}
            </div>
        </ModalPortal>
    )
}

export default Notification;