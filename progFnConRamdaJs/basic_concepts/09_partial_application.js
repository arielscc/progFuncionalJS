/**
 * left partial
 */
const getFullName = (nombre, apellido) => `${nombre} ${apellido}`;

const partialLeft = (fn, ...prevArgs) => (...nextArgs) =>
  fn(...prevArgs, ...nextArgs);

const partialGetFullName = partialLeft(getFullName, 'Ariel Socrates');
console.log(partialGetFullName('Chura'));

/**
 * right partial
 */
const concatenateAll = (...args) => args.join(' ');

const partialRight = (fn, ...nextArgs) => (...prevArgs) =>
  fn(...prevArgs, ...nextArgs);

const partialConcatenateAll = partialRight(concatenateAll, 'serious?');
console.log(partialConcatenateAll('Why', 'so'));
