import BaseErrorPage from './BaseErrorPage';

const AccessDenied = () => {
  return BaseErrorPage('403 - Access denied', 'You do not have permission to access this page.')
}

export default AccessDenied
