export const useScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  element?.scrollIntoView({ behavior: 'smooth' });
};
