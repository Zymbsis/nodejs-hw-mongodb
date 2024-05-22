import { getContactById } from '../services/contactById.js';

export const contactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        status: 'fail',
        message: `Contact with id ${contactId} not found!`,
      });
    }
    res.status(200).json({
      status: 'success',
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: `Id must be a 24 character hex string, 12 byte Uint8Array, or an integer`,
    });
  }
};
