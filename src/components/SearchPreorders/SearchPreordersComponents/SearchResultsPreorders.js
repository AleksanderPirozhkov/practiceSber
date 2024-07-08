import React from 'react';
import PropTypes from 'prop-types';
import {
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

  return (
    <div
      className="search-results-preorders"
    >
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">User</TableCell>
              <TableCell align="right">Status</TableCell>
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
                      <PreorderItem id={preorder.id} name={preorder.regNumber} event={openModal} />
                    </TableCell>
                    <TableCell align="right">{preorder.status}</TableCell>
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
            id={selectId}
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
        id: PropTypes.number,
        regNumber: PropTypes.string,
        status: PropTypes.string,
      }).isRequired,
    ),
  }).isRequired,
};
