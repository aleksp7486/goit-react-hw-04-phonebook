import PropTypes from 'prop-types';
import { Label, Input, Board } from './Filter.styled';

const Filter = ({ value, changeFilter }) => {
  return (
    <Board>
      <Label>
        Find contacts by name:
        <Input
          onChange={changeFilter}
          type="text"
          name="filter"
          value={value}
          placeholder="Введите имя для поиска"
        />
      </Label>
    </Board>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;
