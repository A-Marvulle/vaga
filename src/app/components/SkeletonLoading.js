import React from 'react';

const SkeletonLoading = () => {
  return (
    <div className="skeleton-loading">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
