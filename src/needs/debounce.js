// Debounce ensures a function runs only after it stops being called for a period.
// Useful for search inputs or resize handlers to avoid excessive work.
export const debounce = (func, delay) => {

// Holds the active timeout so it can be reset on rapid calls.
let timer;

return (...args) => {

// Cancel any pending execution and schedule a new one.
clearTimeout(timer);

timer = setTimeout(() => {

// Invoke the original function with the latest arguments.
func(...args);

}, delay);

};

};
