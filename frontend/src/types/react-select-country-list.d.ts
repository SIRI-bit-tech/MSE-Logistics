declare module 'react-select-country-list' {
  interface Country {
    value: string;
    label: string;
  }

  interface CountryList {
    getData(): Country[];
    getLabel(value: string): string | undefined;
    getValue(label: string): string | undefined;
    getLabels(): string[];
    getValues(): string[];
    getValueList(): Record<string, string>;
    getLabelList(): Record<string, string>;
    setLabel(label: string): CountryList;
    setEmpty(label?: string): CountryList;
    native(): CountryList;
  }

  function countryList(): CountryList;
  export default countryList;
}