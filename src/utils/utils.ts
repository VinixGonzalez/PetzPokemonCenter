export const upperCaseFirstLetterHelper = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
