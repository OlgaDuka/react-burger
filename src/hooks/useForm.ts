import {ChangeEvent, Dispatch, SetStateAction, useState} from 'react'
import {TForm, TFormObject} from '../services/types'

interface IForm {
  formValues: TForm<TFormObject> | null
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
  setFormValues: Dispatch<SetStateAction<TForm<TFormObject> | null>>
}
export function useForm(inputValues: TForm<TFormObject> | null): IForm {
  const [formValues, setFormValues] = useState(inputValues)

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target
    setFormValues({...formValues, [name]: value})
  }

  return {formValues, handleChangeInput, setFormValues}
}