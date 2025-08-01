// src/types/index.ts
export interface LocationType {
  id: string;
  name: string;
  address: string;
  mapLink: string;
}

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
