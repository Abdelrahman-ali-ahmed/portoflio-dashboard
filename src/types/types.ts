import type { FieldValue, Timestamp } from "firebase/firestore";

// src/types/index.ts
export interface ExperienceType 
{  id: string,name: string, field: string, place: string,startDate:string,endDate:string,isPresent:boolean,createdAt?: Date | Timestamp | FieldValue; }

export type MessageForm = {
  link: string;
};

export interface ContactFormType {
  whatsapp: string;
  linkedin: string;
  email: string;
  phone: string;
 gitHub:string;
}
export type TechnologyType = {
  id: string;
  name: string;
  logo: string;
  createdAt?: Date;
};
// types.ts


type LocaleMap = {
  ar: string;
  eng: string;
};
export type Project = {
  id: string; 
  category: 'Html + js + Css' | string;
  content: LocaleMap;
  title: LocaleMap;
  createdAt: string; 
  updatedAt?: string; 
  imageUrl?: string;
  liveLink?: string;
  src?: string;     
  publicId?: string;

};

