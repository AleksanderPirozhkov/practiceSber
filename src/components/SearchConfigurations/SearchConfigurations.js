import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';
import Modal from 'react-modal';
import SearchBarBase from '../BaseObjects/SearchBase/SearchBarBase';
import SearchResultsBase from '../BaseObjects/SearchBase/SearchResultsBase';
import Crud from '../../api/crud';
import NumberOfFound from '../BaseObjects/SearchBase/NumberOfFound';
import SingleFormConfigurations from '../SingleFormConfigurations/SingleFormConfigurations';
import '../../css/SearchConfigurations/SearchConfigurations.css';

export default function SearchConfigurations(
  {
    isOpenSearchBar,
    setOpenSearchBar,
    elementOnPageCount,
  },
) {
  const [code, setCode] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [numberOfFound, setNumberOfFound] = React.useState(0);
  const [filter, setFilter] = React.useState([]);
  const [numberOfPages, setNumberOfPages] = React.useState(1);
  const [numberOfPage, setNumberOfPage] = React.useState(1);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectId, setSelectId] = React.useState(0);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const filteredConfigurations = async (
    codePreorder,
    titlePreorder,
    descriptionPreorder,
    numberOfPagePreorder,
  ) => {
    const searchObject = {};
    if (codePreorder && codePreorder !== '') {
      searchObject.code = codePreorder.trim();
    }
    if (titlePreorder && titlePreorder !== '') {
      searchObject.title = titlePreorder.trim();
    }
    if (descriptionPreorder && descriptionPreorder !== '') {
      searchObject.description = descriptionPreorder.trim();
    }

    const startNumber = elementOnPageCount * (Number.parseInt(numberOfPagePreorder, 10) - 1);
    const endNumber = startNumber + elementOnPageCount;
    const result = await Crud.searchConfigurations(searchObject);

    if (Math.ceil(result.length / elementOnPageCount) < numberOfPages) {
      setNumberOfPage(1);
    }

    // if (result.length !== numberOfFound) {
    //   setNumberOfPage(1);
    // }

    setFilter(result.slice(startNumber, endNumber));
    setNumberOfFound(result.length);
    setNumberOfPages(Math.ceil(result.length / elementOnPageCount));
  };

  const openModal = (id) => {
    setSelectId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    filteredConfigurations(code, title, description, numberOfPage);
  }, [code, title, description, numberOfPage, filteredConfigurations]);

  const onCodeChanged = (e) => {
    setCode(e.target.value);
    filteredConfigurations(
      e.target.value,
      title,
      description,
      numberOfPage,
    );
  };
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
    filteredConfigurations(
      code,
      e.target.value,
      description,
      numberOfPage,
    );
  };
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
    filteredConfigurations(
      code,
      title,
      e.target.value,
      numberOfPage,
    );
  };

  const paginationHandleChange = (e, page) => {
    setNumberOfPage(page);
    filteredConfigurations(
      code,
      title,
      description,
      page,
    );
  };

  const clearAll = () => {
    setCode('');
    setTitle('');
    setDescription('');
    filteredConfigurations(
      '',
      '',
      '',
      numberOfPage,
    );
  };

  return (
    <div
      className="search-configurations"
    >
      <div>
        <SearchBarBase
          data={
            {
              code,
              title,
              description,
            }
          }
          events={
            {
              onCodeChanged,
              onTitleChanged,
              onDescriptionChanged,
              clearAll,
            }
          }
          isOpenSearchBar={isOpenSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
      </div>
      <div>
        <NumberOfFound numberOfFound={numberOfFound} />
      </div>
      <div>
        <SearchResultsBase
          data={
            {
              filter,
              numberOfFound,
              url: '/configurations',
            }
          }
          events={
            {
              openModal,
            }
          }
          isOpenSearchBar={isOpenSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Configuration"
      >
        <SingleFormConfigurations id={selectId.toString()} closeEvent={closeModal} />
      </Modal>
      <div
        className="search-configurations__pagination"
      >
        <Pagination
          count={numberOfPages}
          page={numberOfPage}
          onChange={paginationHandleChange}
        />
      </div>
    </div>
  );
}

SearchConfigurations.propTypes = {
  isOpenSearchBar: PropTypes.bool.isRequired,
  setOpenSearchBar: PropTypes.func.isRequired,
  elementOnPageCount: PropTypes.number.isRequired,
};
