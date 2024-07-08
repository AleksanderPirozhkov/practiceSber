import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import SearchBarTextBox from './SearchBaseComponents/SearchBarTextBox';
import '../../../css/BaseObjects/SearchBase/SearchBarBase.css';

export default function SearchBarBase(
  {
    data,
    events,
    isOpenSearchBar,
    setOpenSearchBar,
  },
) {
  const onClickButtonSearchBar = () => {
    setOpenSearchBar(!isOpenSearchBar);
  };

  return (
    <div>
      <Accordion expanded={isOpenSearchBar} onChange={onClickButtonSearchBar}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          Фильтр
        </AccordionSummary>
        <AccordionDetails>
          <div
            className="search-bar-base__accordion-details"
          >
            <SearchBarTextBox
              label="Код"
              value={data.code}
              onChange={events.onCodeChanged}
              icon={<SearchIcon />}
            />
            <SearchBarTextBox
              label="Название"
              value={data.title}
              onChange={events.onTitleChanged}
              icon={<SearchIcon />}
            />
            <SearchBarTextBox
              label="Описание"
              value={data.description}
              onChange={events.onDescriptionChanged}
              icon={<SearchIcon />}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

SearchBarBase.propTypes = {
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
  isOpenSearchBar: PropTypes.bool.isRequired,
  setOpenSearchBar: PropTypes.func.isRequired,
};
