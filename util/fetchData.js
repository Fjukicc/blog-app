export async function fetchData(fetchFunc, params, errorSetter) {
  try {
    return await fetchFunc(params);
  } catch (error) {
    console.error(`Error fetching data:`, error);
    errorSetter(error); // Set the specific error
    return null; // Return null in case of failure
  }
}
