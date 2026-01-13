declare module 'react-select-country-list' {
  interface Country {
    value: string;
    label: string;
  }

  interface CountryList {
    getData(): Country[];
    getLabel(value: string): string;
    getValue(label: string): string;
    getLabels(): string[];
    getValues(): string[];
  }

  function useCountries(): CountryList;
  export default useCountries;
}