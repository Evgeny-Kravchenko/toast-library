import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

function Portal(props) {
  return createPortal(props.children, document.body);
}

Portal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Portal;
