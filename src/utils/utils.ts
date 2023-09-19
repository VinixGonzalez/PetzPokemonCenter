export const upperCaseFirstLetterHelper = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const real = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const getRandomLevelHelper = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};

export const extractLevelFromName = (name: string): number => {
  if (!name) return 0;
  const levelMatch = name.match(/\(lvl:\s*(\d+)\)/);
  return levelMatch ? parseInt(levelMatch[1], 10) : 0;
};
