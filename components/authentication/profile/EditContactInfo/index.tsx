import EditEmailForm from "./EditEmailForm";
import EditPhoneNumberForm from "./EditPhoneNumberForm";

const EditContactInfo = () => {
    return (
        <div className="pt-5 ">
            <EditPhoneNumberForm />

            <div className="p-5" >
                <hr className="border-white/75" />
            </div>

            <EditEmailForm />

        </div>
    )
}

export default EditContactInfo;