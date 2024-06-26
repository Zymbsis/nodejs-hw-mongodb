import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { photoUploadDestination } from '../utils/photoUploadDestination.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id } = req.user;

  const contacts = await getAllContacts(
    {
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    },
    _id,
  );

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await getContactById(contactId, _id);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const photo = await photoUploadDestination(req.file);
  const payload = { ...req.body, userId, photo };
  const contact = await createContact(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const photo = await photoUploadDestination(req.file);
  const payload = { ...req.body, photo };
  const result = await updateContact(contactId, _id, payload);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await deleteContact(contactId, _id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
