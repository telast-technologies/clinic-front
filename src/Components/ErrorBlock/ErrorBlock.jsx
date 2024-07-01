import { Link } from "react-router-dom";
export default function ErrorBlock({ title, message }) {
  return (
    <div className="error-block">
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
        <p>
          Please login again <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
}
