import { FaArrowDown } from 'react-icons/fa';
import './loadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <main id="loading-spinner-main">
      <div id="loadingSpinner-container">
        <svg id="loading-text" viewBox="0 0 400 160">
          <text
            x="35%"
            y="50%"
            dy="0.32rem"
            textAnchor="middle"
            className="loading-text-body"
          >
            Simphiwe
          </text>
          <text
            x="50%"
            y="50%"
            dy="0.32rem"
            dx="6.6rem"
            textAnchor="middle"
            className="loading-text-body"
          >
            Dladla.
          </text>
        </svg>
      </div>
      <div id="mouse-scroller">
        <FaArrowDown className="arrow-down" />
      </div>
    </main>
  );
};
export default LoadingSpinner;
