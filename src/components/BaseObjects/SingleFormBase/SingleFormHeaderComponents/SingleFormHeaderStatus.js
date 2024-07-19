import { Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function SingleFormHeaderStatus({
  status,
}) {
  const statusOptionsEnum = {
    statusNew: 'NEW',
    statusApproved: 'APPROVED',
    statusInWork: 'IN_WORK',
    statusCompleted: 'COMPLETED',
    statusCanceled: 'СANCELED',
  };
  let buttonColor = 'inherit';
  if (status === statusOptionsEnum.statusNew) {
    buttonColor = 'secondary';
  } else if (status === statusOptionsEnum.statusApproved) {
    buttonColor = 'success';
  } else if (status === statusOptionsEnum.statusInWork) {
    buttonColor = 'warning';
  } else if (status === statusOptionsEnum.statusCompleted) {
    buttonColor = 'info';
  } else if (status === statusOptionsEnum.statusCanceled) {
    buttonColor = 'error';
  }
  return (
    <div>
      <Button
        variant="contained"
        color={buttonColor}
      >
        {status}
      </Button>
    </div>
  );
}

SingleFormHeaderStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
