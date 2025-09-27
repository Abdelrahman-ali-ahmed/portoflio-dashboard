// src/types/index.ts
export interface ExperienceType 
{  id: string,name: string, field: string, place: string,startDate:string,endDate:string,isPresent:boolean }


export interface ContactFormType {
  whatsapp: string;
  linkedin: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
}
export type CustomerType = {
  id: string;
  name: {eng:string,ar:string};
  logo: string;
  createdAt?: Date;
};
