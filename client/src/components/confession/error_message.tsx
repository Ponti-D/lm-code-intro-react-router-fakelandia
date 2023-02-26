export interface ErrorMessageProps {
    message: string | undefined;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p data-testid="error-message" className="errorMessage" >{message}</p> ;
};
export default ErrorMessage;
