const hasNumber = (password: string): boolean => new RegExp(/[0-9]/).test(password);
const hasMixed = (password: string): boolean => new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password);
const hasSpecial = (password: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(password);

export const strengthColor = (count: number): { label: string; color: string } => {
  if (count < 2) return { label: 'Poor', color: 'error.main' };
  if (count < 3) return { label: 'Weak', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Good', color: 'success.main' };
  if (count < 6) return { label: 'Strong', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

export const strengthIndicator = (password: string): number => {
  let strength = 0;
  
  if (password.length > 5) strength += 1;
  if (password.length > 7) strength += 1;
  
  if (hasNumber(password)) strength += 1;
  
  if (hasSpecial(password)) strength += 1;
  
  if (hasMixed(password)) strength += 1;
  
  return strength;
};
