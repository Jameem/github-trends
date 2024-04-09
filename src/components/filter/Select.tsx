import Select from 'react-select';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectLanguageProps {
  options: SelectOption[];
  onChange?: (option: SelectOption | null) => void;
}

export const DefautltSelect = ({ onChange, options }: SelectLanguageProps) => {
  return (
    <div className='select-container'>
      Filter by Language
      <Select
        options={options}
        className='select-container__select'
        isSearchable
        isClearable
        onChange={onChange}
        data-test-id='select'
      />
    </div>
  );
};
