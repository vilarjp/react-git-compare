import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository, Loading } from './styles';

const CompareList = ({
  repositories, updateRepository, deleteRepository, loading,
}) => (loading === true ? (
  <Loading>
    <i className="fa fa-spinner fa-pulse" />
  </Loading>
) : (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            {' '}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            {' '}
            <small>last commit</small>
          </li>
        </ul>
        <button
          className="btn-update"
          type="submit"
          onClick={() => updateRepository(repository.owner.login, repository.name)}
        >
            Update
        </button>
        <button
          className="btn-remove"
          type="submit"
          onClick={() => deleteRepository(repository.id)}
        >
            Remove
        </button>
      </Repository>
    ))}
  </Container>
));

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,
  updateRepository: PropTypes.func.isRequired,
  deleteRepository: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CompareList;
