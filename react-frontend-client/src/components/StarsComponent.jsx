import { useState } from 'react';

const Stars = ({ value = 0, onChange }) => {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          className={`star ${display >= n ? 'on' : ''}`}
          onClick={() => onChange && onChange(n)}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Stars;
