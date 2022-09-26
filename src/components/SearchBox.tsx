import * as React from 'react';

type SearchBoxProps = {
  searchChange(event: React.ChangeEvent<HTMLInputElement>): void
}

const SearchBox = ({ searchChange }: SearchBoxProps): JSX.Element => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search robots'
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;