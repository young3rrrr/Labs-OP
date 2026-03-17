const persons = {
  lenin: { born: 1870, died: 1924 },
  mao: { born: 1893, died: 1976 },
  gandhi: { born: 1869, died: 1948 },
  hirohito: { born: 1901, died: 1989 },
};
function living(person) {
  return person.died - person.born;
}
console.log(living(persons.lenin));
console.log(living(persons.mao));
console.log(living(persons.gandhi));
console.log(living(persons.hirohito));