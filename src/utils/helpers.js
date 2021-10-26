import placeholderImg from '../assets/images/placeholderimg.png';

export const brokenImg = (e, url = placeholderImg) => {
  e.target.onerror = null;
  e.target.src = url;
  return e;
};
