interface CheckboxProps {
  onChange: () => void;
}

export const Checkbox = ({ onChange }: CheckboxProps) => {
  return (
    <label className='filter__checkbox'>
      <input type='checkbox' onChange={onChange} /> Show starred Repositories
    </label>
  );
};
