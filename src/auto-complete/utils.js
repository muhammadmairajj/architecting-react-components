export function getFilteredSuggestion({ data = [], language = "" }) {
  return data.filter((item) => {
    const { value = "" } = item || {};
   return value?.toLowerCase().includes(language?.toLowerCase());
  });
}
