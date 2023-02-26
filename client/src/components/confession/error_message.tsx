export interface ErrorMessageProps {
    message: string | undefined;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className="errorMessage" >{message}</p> ;
};
export default ErrorMessage;
