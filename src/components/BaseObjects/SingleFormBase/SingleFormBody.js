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
          error={data.errors && (data.errors.code)}
        />
        <SearchBarTextBox
          label="Название"
          value={data.title}
          onChange={events.onTitleChanged}
          error={data.errors && (data.errors.title)}
        />
      </div>
      <SearchBarTextBox
        multiline
        label="Описание"
        value={data.description}
        onChange={events.onDescriptionChanged}
        error={data.errors && (data.errors.description)}
      />
    </div>
  );
}

SingleFormBody.propTypes = {
  data: PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    errors: PropTypes.shape({
      code: PropTypes.bool,
      title: PropTypes.bool,
      description: PropTypes.bool,
    }),
  }).isRequired,
  events: PropTypes.shape({
    onCodeChanged: PropTypes.func,
    onTitleChanged: PropTypes.func,
    onDescriptionChanged: PropTypes.func,
  }).isRequired,
};
