import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    loadingRepo: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  async componentDidMount() {
    const repositories = JSON.parse(await localStorage.getItem('Repositories'));
    if (repositories != null) this.setState({ repositories });
    else this.setState({ repositories: [] });
  }

  async componentDidUpdate() {
    const { repositories } = this.state;
    await localStorage.setItem('Repositories', JSON.stringify(repositories));
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
    } catch (err) {
      const { repositoryInput } = this.state;
      this.setState({
        repositoryError: true,
        repositoryInput: `repo not found: ${repositoryInput}`,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  updateRepository = async (repo, name) => {
    this.setState({ loadingRepo: true });

    const { repositories } = this.state;

    try {
      const { data } = await api.get(`repos/${repo}/${name}`);
      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(r => (r.id === data.id ? data : r)),
      });
    } catch (err) {
      throw new Error();
    } finally {
      this.setState({ loadingRepo: false });
    }
  };

  deleteRepository = (id) => {
    const { repositories } = this.state;
    const filter = repositories.filter(repo => repo.id !== id);
    this.setState({ repositories: filter });
  };

  render() {
    const {
      repositoryInput, repositories, repositoryError, loading, loadingRepo,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="ex: facebook/react"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Search'}
          </button>
        </Form>
        <CompareList
          repositories={repositories}
          deleteRepository={this.deleteRepository}
          updateRepository={this.updateRepository}
          loading={loadingRepo}
        />
      </Container>
    );
  }
}
