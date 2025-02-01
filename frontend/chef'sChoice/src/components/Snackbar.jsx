import React, { useEffect } from 'react';
import '../Snackbar.css';

function Snackbar({ message, type }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('snackbar').classList.remove('show');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="snackbar" className={`snackbar ${type} show`}>
      {message}
    </div>
  );
}

export default Snackbar;