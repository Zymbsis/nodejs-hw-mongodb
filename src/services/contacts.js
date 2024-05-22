import { Contact } from '../db/contactModel.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};
