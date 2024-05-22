import { ContactModel } from '../db/contactModel';

export const getContactById = async (contactId) => {
  const contact = await ContactModel.findById(contactId);
  return contact;
};
