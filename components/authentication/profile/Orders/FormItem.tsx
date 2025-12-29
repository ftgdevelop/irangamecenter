/* eslint-disable  @typescript-eslint/no-explicit-any */

import { submitOrderForm } from "@/actions/commerce";
import InfoCircle from "@/components/icons/InfoCircle";
import Loading from "@/components/icons/Loading";
import Checkbox from "@/components/shared/Checkbox";
import FormikField from "@/components/shared/FormikField";
import Select from "@/components/shared/Select";
import { toPersianDigits } from "@/helpers";
import { validateEmail, validateRequired } from "@/helpers/formik-validation";
import { useAppDispatch } from "@/hooks/use-store";
import { setReduxError } from "@/redux/errorSlice";
import { OrderFormFields } from "@/types/commerce";

import { Field, Form, Formik, FormikErrors } from "formik";
import { useState } from "react";

type Props = {
  fields: OrderFormFields[];
  key: string;
  orderItemId: number;
  loginProviderId: number;
};

const FormItem: React.FC<Props> = (props) => {

  type FormValues = Record<string, any>;

  const [submitLoading, setSubmitLoading] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues: FormValues = {};

  props.fields.forEach((field) => {
    if (field.type === "Checkbox") {
      initialValues[field.key] = false;
    } else if (field.type === "InputGroup") {
      if (field.inputGroupCount) {

        for (let i = 0; i < field.inputGroupCount; i++) {
          initialValues[field.key+"__"+(i+1)] = "";
        }
      }
    } else {
      initialValues[field.key] = "";
    }
  });

  const getHtml = (item: OrderFormFields, keyword : "label"| "placeholder"|"info" ) => {
    const t = item.translations.find(x => x.language === "fa");
    return (t?.[keyword] || "")
  }

  const submitHandler = async (values: FormValues)=>{

    const fields = Object.entries(values).map(([key, value]) => {
      if (key.includes("__")) {
        const [fieldKey] = key.split("__");
        return { fieldKey, value };
      }

      return { fieldKey: key, value  };
    });

    const userToken = localStorage.getItem("Token");        
    if (!userToken) return;

    setSubmitLoading(true);

    const response : any = await submitOrderForm({
      fields:fields,
      loginProviderId:props.loginProviderId,
      orderItemId:props.orderItemId
    }, userToken);
    
    setSubmitLoading(false);

    if(response.message){
      dispatch(setReduxError({
        status: 'error',
        message: response.message || "ارسال اطلاعات ناموفق",
        isVisible: true
      }))
    }
    debugger;
    console.log(response);
  }

  return (
    <div>
      
      <Formik
        key={props.key}
        validate={() => {
          return {};
        }}
        initialValues={initialValues}
        onSubmit={submitHandler}
      >
        {({
          errors,
          touched,
          setFieldValue,
          values,
          isValid,
          isSubmitting,
        }) => {
          if (isSubmitting && !isValid) {
            setTimeout(() => {
              const formFirstError = document.querySelector(".has-validation-error");

              if (formFirstError) {
                const yOffset = -84; 
                const y =
                  formFirstError.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset;

                window.scrollTo({
                  top: y,
                  behavior: "smooth",
                });
              }
            }, 100);
          }

          return (
            <Form autoComplete="off" className="pt-6">
              {props.fields
                .sort((a, b) => a.order - b.order)
                .map((field) => (
                  <div key={field.id}>
                    {field.type === "Checkbox" ? (
                      <div className="px-5 mt-6 mb-5"> 
                        <Checkbox 
                            checked={values[field.key]} 
                            value={field.key}
                            onChange={e => {setFieldValue(field.key , e)}} 
                            label={getHtml(field , "label")}
                            block
                            name={field.key}
                            className="mb-0.5"
                        />
                        {getHtml(field, "info") && (
                            <p className="text-xs"> 
                                <InfoCircle className="w-4 h-4 fill-current inline-block align-middle ml-1" />
                                {getHtml(field, "info")} 
                            </p>
                        )}                        
                      </div>
                    ) : field.type === "InputGroup" ? (
                      <div>  
                        {!!field.inputGroupCount &&  Array.from({ length: field.inputGroupCount }, (_, i) => i + 1).map(x => (
                            <FormikField
                                info={getHtml(field, "info")}
                                showRequiredStar={field.isRequired}
                                placeholder={getHtml(field, "placeholder") || ""}
                                key={x}
                                className="mb-5"
                                setFieldValue={setFieldValue}
                                errorText={errors[field.key+"__"+x] as string}
                                id={field.key+"__"+x}
                                name={field.key+"__"+x}
                                isTouched={!!touched[field.key+"__"+x]}
                                label={`${getHtml(field, "label")} (${toPersianDigits(x.toString())})`}
                                validateFunction={(value: string) =>
                                field.isRequired
                                    ? validateRequired(
                                        value,
                                        `لطفا ${getHtml(field, "label")} (${toPersianDigits(x.toString())}) را وارد نمایید`
                                    )
                                    : undefined
                                }
                                onChange={(value: string) => {
                                setFieldValue(field.key+"__"+x, value, true);
                                }}
                                value={values[field.key+"__"+x]}
                            />                            
                        ))}
                      </div>
                    ) : field.type === "Select" ? (
                      <div className={`mb-5 ${errors[field.key] && touched[field.key] ? "has-validation-error" : ""}`}>
                        <Select
                            showRequiredStar={field.isRequired}
                            info={getHtml(field, "info")}
                          label={getHtml(field, "label")}
                          items={
                            field.options?.map((option) => ({
                              label:
                                option.translations.find(
                                  (x) => x.language === "fa"
                                )?.displayName || option.value,
                              value: option.value,
                            })) || []
                          }
                          onChange={(value: string) => {
                            setFieldValue(field.key, value, true);
                          }}
                          value={values[field.key]}
                          buttonClassName={`h-11 ${
                            errors[field.key] && touched[field.key]
                              ? "border border-red-600"
                              : ""
                          }`}
                          placeholder={getHtml(field, "placeholder")}
                        />
                        <Field
                          hidden
                          name={field.key}
                          type="text"
                          readOnly
                          value={values[field.key]}
                          validate={(value: string) =>
                            field.isRequired
                              ? validateRequired(
                                  value,
                                  `لطفا ${getHtml(field, "label")} را وارد نمایید`
                                )
                              : undefined
                          }
                        />

                        {errors[field.key] && touched[field.key] && (
                          <div className="text-[#ff163e] text-xs px-5">
                            {errors[field.key]
                              ? (
                                  errors as FormikErrors<{
                                    [field.key]: string;
                                  }>
                                )?.[field.key]
                              : undefined}
                          </div>
                        )}
                      </div>
                    ) : field.type === "Email" ? (
                      <FormikField    
                        showRequiredStar={field.isRequired}                    
                        placeholder={getHtml(field, "placeholder")}
                        info={getHtml(field, "info")}
                        className="mb-5"
                        setFieldValue={setFieldValue}
                        errorText={errors[field.key] as string}
                        id={field.key}
                        name={field.key}
                        isTouched={!!touched[field.key]}
                        label={getHtml(field, "label")}
                        validateFunction={
                          (value: string) => validateEmail({ 
                            value: value,
                            invalidMessage: "ایمیل وارد شده معتبر نیست", 
                            reqiredMessage: field.isRequired? `لطفا ${getHtml(field, "label")} را وارد نمایید` :undefined 
                          })
                        }
                        onChange={(value: string) => {
                          setFieldValue(field.key, value, true);
                        }}
                        value={values[field.key]}
                      />
                    ) : field.type === "Text" ? (
                      <FormikField    
                        showRequiredStar={field.isRequired}                    
                        placeholder={getHtml(field, "placeholder")}
                        info={getHtml(field, "info")}
                        className="mb-5"
                        setFieldValue={setFieldValue}
                        errorText={errors[field.key] as string}
                        id={field.key}
                        name={field.key}
                        isTouched={!!touched[field.key]}
                        label={getHtml(field, "label")}
                        validateFunction={(value: string) =>
                          field.isRequired
                            ? validateRequired(
                                value,
                                `لطفا ${getHtml(field, "label")} را وارد نمایید`
                              )
                            : undefined
                        }
                        onChange={(value: string) => {
                          setFieldValue(field.key, value, true);
                        }}
                        value={values[field.key]}
                      />
                    ) : field.type === "Password" ? (
                      <FormikField   
                        isPassword 
                        showRequiredStar={field.isRequired}                    
                        placeholder={getHtml(field, "placeholder")}
                        info={getHtml(field, "info")}
                        className="mb-5"
                        setFieldValue={setFieldValue}
                        errorText={errors[field.key] as string}
                        id={field.key}
                        name={field.key}
                        isTouched={!!touched[field.key]}
                        label={getHtml(field, "label")}
                        validateFunction={(value: string) =>
                          field.isRequired
                            ? validateRequired(
                                value,
                                `لطفا ${getHtml(field, "label")} را وارد نمایید`
                              )
                            : undefined
                        }
                        onChange={(value: string) => {
                          setFieldValue(field.key, value, true);
                        }}
                        value={values[field.key]}
                      />
                    ) : field.type === "Textarea" ? (
                        <div className="mb-5">
                            {getHtml(field, "label") && (<label
                                htmlFor={field.key || undefined}
                                className="select-none pointer-events-none inline-block text-sm px-5 mb-2"
                            > 
                                {getHtml(field, "label")} {field.isRequired && <span className='text-red-900'> * </span>}
                            </label>)}

                            {getHtml(field, "info") && <p className='text-xs mb-3 px-5'>
                                <InfoCircle className='w-4 h-4 fill-current inline-block align-middle ml-1' />
                                {getHtml(field, "info")}
                            </p>}

                            <Field
                                label={getHtml(field, "label")}
                                name={field.key}
                                as="textarea"
                                placeholder={getHtml(field, "placeholder")}
                                className={`${
                                errors[field.key] && touched[field.key]
                                    ? "border-red-600"
                                    : "border-gray-300 dark:border-transparent"
                                } w-full px-5 py-3 bg-white dark:bg-[#192a39] border text-sm rounded-2xl outline-none duration-300 h-32`}
                                validate={field.isRequired ? (value: any) =>validateRequired(value, `${getHtml(field, "label")} را وارد کنید`) : undefined}                            
                            />

                            {errors[field.key] && touched[field.key] && (
                                <div className="text-[#ff163e] text-xs px-5">{errors[field.key] as string}</div>
                            )}
                        </div>
                    ) : null}
                  </div>
                ))}

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 h-11 px-5 w-full bg-gradient-violet rounded-full text-white text-sm mb-7"
                  disabled={submitLoading}
                >
                  ثبت و ارسال اطلاعات
                  
                  {submitLoading && <Loading className="w-5 h-5 fill-current animate-spin" />}

                </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormItem;
