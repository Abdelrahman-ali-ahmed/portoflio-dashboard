// src/types/index.ts
export interface ExperienceType 
{  id: string,name: string, field: string, place: string,startDate:string,endDate:string,isPresent:boolean }

export type MessageForm = {
  link: string;
};

export interface ContactFormType {
  whatsapp: string;
  linkedin: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
}
export type TechnologyType = {
  id: string;
  name: string;
  logo: string;
  createdAt?: Date;
};
