import CheckboxGroup from "@/components/shared/CheckboxGroup";
import DatePickerMobiscroll from "@/components/shared/DatePickerMobiscroll";
//import DatePickerMulti from "@/components/shared/DatePickerMulti";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

type Props = {
    wrapperClassName?: string;
    onFilter: (values: {
        types: string[];
        startDate: string;
        endDate: string;
    }) => void;
    close: () => void
}

const TransactionsFilter: React.FC<Props> = props => {

    const formInitialValue = {
        startDate: "",
        endDate: "",
    }
    const [filteredTypes, setFilteredTypes] = useState<string[]>([]);

    const availableTransactionTypes = ["IncreaseDepositByPaymentGateway", "DecreaseDepositBySale", "IncreaseDepositByRefund", "IncreaseDepositByReverse", "DecreaseDepositByWithdraw", "IncreaseDeposit", "DecreaseDeposit", "ManualIncreaseDeposit", "ManualDecreaseDeposit", "ManualIncreaseDepositByRefund"];

    return (
        <div className={`px-4 ${props.wrapperClassName || ""}`}>

            <Formik
                validate={() => { return {} }}
                initialValues={formInitialValue}
                onSubmit={values => {
                    props.onFilter({
                        startDate: values.startDate,
                        endDate: values.endDate,
                        types: filteredTypes
                    })
                }}
            >
                {({setFieldValue, values, isValid, isSubmitting }) => {

                    if (isSubmitting && !isValid) {
                        setTimeout(() => {
                            const formFirstError = document.querySelector(".has-validation-error");
                            if (formFirstError) {
                                formFirstError.scrollIntoView({ behavior: "smooth" });
                            }
                        }, 100)
                    }

                    return (

                        <Form autoComplete='off' className="py-5" >
                            <div className="overflow-auto max-h-[70vh]">
                                <label className="mb-2 block text-sm">
                                    بازه زمانی
                                </label>
                                <div className="grid grid-cols-2 gap-3 mb-7">

                                    <div>
                                        <DatePickerMobiscroll
                                            onChange={a => { setFieldValue("startDate", a.value, true) }}
                                            rtl
                                            value={values.startDate}
                                            placeholder="از تاریخ"
                                        />
                                        <Field
                                            type='hidden'
                                            name="startDate"
                                            value={values.startDate}
                                        />
                                    </div>

                                    <div>
                                        <DatePickerMobiscroll
                                            onChange={a => { setFieldValue("endDate", a.value, true) }}
                                            rtl
                                            value={values.endDate}
                                            placeholder="تا تاریخ"
                                        />
                                        <Field
                                            type='hidden'
                                            name="endDate"
                                            value={values.endDate}
                                        />
                                    </div>
                                </div>

{/* 
                                <hr/>
                                <label className="mb-2 block text-sm">
                                    بازه زمانی
                                </label>

                                <DatePickerMulti 
                                    range
                                /> */}

                                <label className="mb-2 block text-sm">
                                    نوع تراکنش
                                </label>
                                <CheckboxGroup
                                    items={availableTransactionTypes.map(item => ({
                                        label: item,
                                        value: item
                                    }))}
                                    onChange={setFilteredTypes}
                                    values={filteredTypes}
                                />
                            </div>

                            <div className="flex gap-4 mt-7">
                                <button
                                    type="button"
                                    className="shrink-0 w-24 rounded-full px-5 py-2.5 bg-[#011425] text-sm"
                                    onClick={props.close}
                                >
                                    بستن
                                </button>
                                <button
                                    type="submit"
                                    className="w-full rounded-full px-5 py-2.5 bg-[#a93aff] text-sm"
                                >
                                    ثبت تغییرات
                                </button>
                            </div>
                        </Form>
                    )
                }}

            </Formik>
        </div>
    )
}

export default TransactionsFilter;