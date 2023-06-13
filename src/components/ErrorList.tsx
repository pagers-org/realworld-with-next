type ErrorListProps = {
  errors: string[];
};

const ErrorList = ({ errors }: ErrorListProps) => (
  <ul className="error-messages">
    {errors.map((error) => (
      <li key={error}>{error}</li>
    ))}
  </ul>
);

export default ErrorList;
