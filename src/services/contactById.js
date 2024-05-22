import { ContactModel } from '../db/contactModel.js';

export const getContactById = async (contactId) => {
  const contact = await ContactModel.findById(contactId);
  return contact;
};
