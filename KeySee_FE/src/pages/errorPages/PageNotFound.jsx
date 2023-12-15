import BaseErrorPage from './BaseErrorPage'

const PageNotFound = () => {
  return BaseErrorPage(
    '404 - Page Not Found',
    'The page you are looking for does not exist.',
    '(or you do not have permission to access this page)'
  )
}

export default PageNotFound
