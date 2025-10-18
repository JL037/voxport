export const nowISO = () => new Date().toISOString();
export const toRfc2822 = (date: Date | string | number = new Date()) =>
  new Date(date).toUTCString();
