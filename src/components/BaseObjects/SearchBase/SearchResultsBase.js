import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import SearchResultItem from './SearchBaseComponents/SearchResultItem';
import '../../../css/BaseObjects/SearchBase/SearchResultsBase.css';

export default function SearchResultsBase({
  data,
  events,
}) {
  return (
    <div
      className="search-results-Base"
    >
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="33%" align="left">User</TableCell>
              <TableCell width="33%" align="left">Title</TableCell>
              <TableCell width="34%" align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.filter.map(
                (entity) => (
                  <TableRow
                    key={entity.id}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                    >
                      <SearchResultItem
                        event={events.openModal}
                        url={data.url}
                        id={entity.id}
                        name={entity.code}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                    >
                      {entity.title}
                    </TableCell>
                    <TableCell
                      align="left"
                    >
                      {entity.description}
                    </TableCell>
                  </TableRow>
                ),
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

SearchResultsBase.propTypes = {
  data: PropTypes.shape({
    filter: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        code: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
    ).isRequired,
    url: PropTypes.string,
  }).isRequired,
  events: PropTypes.shape({
    openModal: PropTypes.func.isRequired,
  }).isRequired,
};
