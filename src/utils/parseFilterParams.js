const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['home', 'work', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  if (isFavourite === 'true') return 'true';
  if (isFavourite === 'false') return 'false';
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavourite = parseFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
