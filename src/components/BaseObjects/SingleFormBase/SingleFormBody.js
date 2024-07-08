import PropTypes from 'prop-types';
import SearchBarTextBox from '../SearchBase/SearchBaseComponents/SearchBarTextBox';
import '../../../css/BaseObjects/SingleFormBase/SingleFormBody.css';

export default function SingleFormBody({
  data,
  events,
}) {
  return (
    <div
      className="single-form-body"
    >
      <div
        className="single-form-body__row"
      >
        <SearchBarTextBox
          label="Код"
          value={data.code}
          onChange={events.onCodeChanged}
        />
        <SearchBarTextBox
          label="Название"
          value={data.title}
          onChange={events.onTitleChanged}
        />
      </div>
      <SearchBarTextBox
        multiline
        label="Описание"
        value={data.description}
        onChange={events.onDescriptionChanged}
      />
    </div>
  );
}

SingleFormBody.propTypes = {
  data: PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  events: PropTypes.shape({
    onCodeChanged: PropTypes.func,
    onTitleChanged: PropTypes.func,
    onDescriptionChanged: PropTypes.func,
  }).isRequired,
};
