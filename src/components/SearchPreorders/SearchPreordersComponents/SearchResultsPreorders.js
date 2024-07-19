import React from 'react';
import PropTypes from 'prop-types';
import {
  Chip,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import Modal from 'react-modal';
import PreorderItem from '../../BaseObjects/SearchBase/SearchBaseComponents/SearchResultItem';
import SingleFormPreorders from '../../SingleFormPreorders/SingleFormPreorders';
import '../../../css/SearchPreorders/SearchPreordersComponents/SearchResultsPreorders.css';

export default function SearchResultsPreorders({
  data,
}) {
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

  const openModal = (id) => {
    setSelectId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const statusColors = {
    NEW: 'secondary',
    APPROVED: 'success',
    IN_WORK: 'warning',
    COMPLETED: 'info',
    СANCELED: 'error',
  };

  return (
    <div
      className="search-results-preorders"
    >
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="search-results-preorders__table-cell" align="left">Наименование</TableCell>
              <TableCell className="search-results-preorders__table-cell" align="left">Тип потребности</TableCell>
              <TableCell className="search-results-preorders__table-cell" align="left">Конфигурация</TableCell>
              <TableCell className="search-results-preorders__table-cell" align="left">Среда</TableCell>
              <TableCell className="search-results-preorders__table-cell" align="left">ЦОДы</TableCell>
              <TableCell className="search-results-preorders__table-cell" align="left">Признак репликации</TableCell>
              <TableCell className="search-results-preorders__table-cell" align="left">Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.filter.map(
                (preorder) => (
                  <TableRow
                    key={preorder.id}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <PreorderItem align="left" id={preorder.id} name={preorder.regNumber ? preorder.regNumber : 'нет данных'} event={openModal} />
                    </TableCell>
                    <TableCell align="left">{preorder.preorderType ? preorder.preorderType : 'нет данных'}</TableCell>
                    <TableCell align="left">{preorder.configuration ? preorder.configuration.code : 'нет данных'}</TableCell>
                    <TableCell align="left">{preorder.environment ? preorder.environment.code : 'нет данных'}</TableCell>
                    <TableCell align="left">
                      {preorder.datacenters && preorder.datacenters.length !== 0
                        ? preorder.datacenters
                          .map((datacenter) => (datacenter && datacenter.code ? datacenter.code : ''))
                          .join(', ') : 'нет данных'}
                    </TableCell>
                    <TableCell align="left">{preorder.isReplication ? 'есть' : 'нет'}</TableCell>
                    <TableCell align="left">
                      <Chip
                        label={preorder.status ? preorder.status : 'нет данных'}
                        color={statusColors[preorder.status]}
                      />
                    </TableCell>
                  </TableRow>
                ),
              )
            }
          </TableBody>
        </Table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Preorder"
        >
          <SingleFormPreorders
            id={selectId.toString()}
            closeEvent={closeModal}
          />
        </Modal>

      </div>
    </div>
  );
}

SearchResultsPreorders.propTypes = {
  data: PropTypes.shape({
    filter: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        regNumber: PropTypes.string,
        status: PropTypes.string,
      }).isRequired,
    ),
  }).isRequired,
};
