export const debounce = (fn, debounceTime) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
    fn.apply(this,arguments)
    }, debounceTime);
  };  
}