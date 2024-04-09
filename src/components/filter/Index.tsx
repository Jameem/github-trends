import { languages } from '../../constants/languages';
import { Checkbox } from './Checkbox';
import { DefautltSelect, SelectOption } from './Select';

interface FilterProps {
  onChangeShowStarredRepo: () => void;
  onChangeLanguage: (option: SelectOption | null) => void;
}

const options = languages.map((language) => {
  return { value: language, label: language };
});

export const Filter = ({
  onChangeShowStarredRepo,
  onChangeLanguage,
}: FilterProps) => {
  return (
    <section className='filter flex py-1 px-1'>
      <DefautltSelect onChange={onChangeLanguage} options={options} />
      <Checkbox onChange={onChangeShowStarredRepo} />
    </section>
  );
};
