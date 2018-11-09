import moment from 'moment';

const convertToValidDate = (date) => {
  const dateString = `${date.substr(0, date.length - 15)} Z`;

  const dayString = dateString.substr(0, 4);

  const monthString = dateString.substr(4, 3);

  const dayNumberString = dateString.substr(8, 3);

  const rest = dateString.substr(10);

  return `${dayString}${dayNumberString}${monthString}${rest}`;
};

export const setTime = (item) => {
  let time = 'm';

  const dateString = convertToValidDate(item.createdAt);

  const difference = moment.duration(moment().diff(moment(dateString)));

  let createdAt = Math.floor(difference.asMinutes()) + 1;

  if (createdAt === 0) {
    createdAt = 'Just now';
    time = '';
  } else if (createdAt > 59) {
    createdAt = Math.floor(difference.asHours());
    time = 'h';

    if (createdAt > 23) {
      time = '';
      createdAt = Math.floor(difference.asDays());

      if (createdAt > 365) {
        createdAt = moment(dateString).format('MMMM Do YYYY');
      } else {
        createdAt = moment(dateString).format('MMMM Do');
      }
    }
  }

  return { createdAt, time };
};

export const setLikeColor = ({ likes }, { id }) => {
  const liked = likes.some((like) => {
    if (like.likerId === id) {
      return true;
    }

    return false;
  });

  return liked ? ' #00bcd4' : 'grey';
};


export const getTags = (bucketlist) => {
  if (bucketlist.tags) {
    const tags = bucketlist.tags.split(',').map((tag, index) => ({
      key: index,
      name: tag,
      label: tag,
    }));

    tags.shift();

    return tags;
  }

  return [];
};

export const filterExpired = bucketlists => bucketlists.filter((bucketlist) => {
  if (bucketlist.dueDate) {
    const dueDate = new Date(bucketlist.dueDate);
    const now = new Date();
    const difference = dueDate.getTime() - now.getTime();

    return difference >= 0;
  }

  return true;
});

export const stripHtml = text =>
  text
    .replace('<b>', '')
    .replace('</b>', '')
    .replace('<br/>', ' ');

export const removeEmptyFields = (object) => {
  const newObject = {};

  Object.keys(object).forEach((key) => {
    const field = object[key];
    if (field || typeof field === 'boolean') {
      newObject[key] = field;
    }
  });

  return newObject;
};

const generateFieldsFromObject = (field) => {
  const key = Object.keys(field)[0];
  const value = Object.values(field)[0];

  const fieldVars = `${key} { ${generateFields(value)} }`;

  return fieldVars;
};

const generateFields = (fields) => {
  let fieldVars = '';

  fields.forEach((field) => {
    if (typeof field === 'object') {
      fieldVars = `${fieldVars}${generateFieldsFromObject(field)}`;
    } else {
      fieldVars = `${fieldVars}${field}`;
    }
    if (fields.indexOf(field) < fields.length - 1) {
      fieldVars = `${fieldVars}, `;
    }
  });

  return fieldVars;
};

export const generateQuery = ({
  mutation,
  fields,
  args,
}) => {
  let argsVars = '';
  let fieldVars = '';

  if (args) {
    const keys = Object.keys(args);
    keys.forEach((key) => {
      const arg = args[key];
      const isString = typeof arg === 'string';
      argsVars = `${argsVars}${key}: ${isString ? '"' : ''}${arg}${isString ? '"' : ''}`;
      if (keys.indexOf(key) < keys.length - 1) {
        argsVars = `${argsVars}, `;
      }
    });
  }

  fieldVars = generateFields(fields);

  const argString = args ? `(${argsVars})` : '';
  const query = `mutation { ${mutation} ${argString} { ${fieldVars} } }`;

  return query;
};
