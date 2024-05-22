import { ContactModel } from '../db/contactModel.js';

export const getAllContacts = async () => {
  const contacts = await ContactModel.find();
  return contacts;
};
