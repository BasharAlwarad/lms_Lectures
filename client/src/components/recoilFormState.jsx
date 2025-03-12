import { atom, selector } from 'recoil';

export const formState = atom({
  key: 'formState',
  default: {
    username: '',
    email: '',
    password: '',
    errors: {},
  },
});

export const formErrors = selector({
  key: 'formErrors',
  get: ({ get }) => {
    const state = get(formState);
    const errors = {};
    if (!state.username) errors.username = 'Username is required';
    if (!state.email) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(state.email))
      errors.email = 'Email is invalid';
    if (!state.password) errors.password = 'Password is required';
    return errors;
  },
});
