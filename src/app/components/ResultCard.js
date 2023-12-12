import React from 'react';
import SkeletonLoading from './SkeletonLoading';

const ResultCard = ({ repository }) => {
  if (!repository) {
    return <SkeletonLoading />;
  }

  return (
    <div className="result-card">
      <img
        src={repository.owner.avatar_url}
        alt="User Avatar"
        className="avatar"
      />
      <div className="card-content">
        <h2>{repository.name}</h2>
        <p>By: {repository.owner.login}</p>
        <p>{repository.description}</p>
        <p>Language: {repository.language}</p>
        <p>Stars: {repository.stargazers_count}</p>
        <p>
          URL:{' '}
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repository.html_url}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
