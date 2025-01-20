import {ChangeEvent, useState} from 'react'
import {TForm} from "../utils/types";
import {TFormObject} from "../redux/types";

export function useForm(inputValues: TForm<TFormObject> | null) {
  const [formValues, setFormValues] = useState(inputValues)

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    setFormValues({...formValues, [name]: value})
  }

  return {formValues, handleChangeInput, setFormValues}
}