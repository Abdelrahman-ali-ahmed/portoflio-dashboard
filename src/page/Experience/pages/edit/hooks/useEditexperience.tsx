import { useNavigate, useParams } from 'react-router-dom';
import { getExperienceById, updateLocation } from '../../../hooks/CRUDFireBase';
import useAddExperience from '../../add/hooks/useAddExperience';
import {  useEffect, useState } from 'react';
import type { ExperienceType } from '../../../../../types/types';

export default function useEditexperience() {
          const {
            startRef,
            endRef,
            isDark,
            inputClass,
            openPicker,
          } = useAddExperience ();
const [form, setForm] = useState<Omit<ExperienceType, "id">>({
  name: "",
  field: "",
  place: "",
  startDate: "",
  endDate: "",
  isPresent: false,
});
const[loadingComponenet, setLoadingComponenet] = useState(false);
const[error,setError] = useState<any>(null);
const navigate=useNavigate()
const  { id } = useParams<{ id: string }>();
const getdata = async () => {
  const data = await getExperienceById(id!);
  console.log(data);

  if (data) {
    setForm(data);
  }
};
          useEffect   (() => {
            setLoadingComponenet(true)
            try{
              getdata();
            }catch (err) {
              console.error(err);
              setError(err);
            }finally{
              setLoadingComponenet(false);
            }
            
          }, []);
            const handleSubmit = async () => {
              setLoadingComponenet(true);
              try {
                await updateLocation (id!, form);
              } catch (erro) {
                setError(erro)
              }finally{
                setLoadingComponenet(false);
                navigate(-1);
              }
              setForm({ name: "", field: "", place: "",startDate:"",endDate:"",isPresent:false });
            };

  return {
            form,
            setForm,
            handleSubmit,
            loadingComponenet,
            id,
            error,
            navigate,
            startRef,
            endRef,
            isDark,
            inputClass,
            setLoadingComponenet,
            openPicker,
          };
}
