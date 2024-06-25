import React from 'react'

const AcquisitionDetailViewItem = ({label , value}) => {
  return (
    <li>
      <span>{label}</span>
      <p>{value}</p>
    </li>
  );
}

export default AcquisitionDetailViewItem
