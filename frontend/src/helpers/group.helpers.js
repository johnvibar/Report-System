export const groupBy = (arr, key) => {
  return arr.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    if (!result[currentValue[key]]) {
      result[currentValue[key]] = [];
    }

    result[currentValue[key]].push(currentValue);
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {});
};
