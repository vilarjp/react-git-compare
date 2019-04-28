import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }

  button {
    color: #fff;
    border: none;
    padding: 15px 0;
    font-weight: bold;
    border-radius: 3px;
    margin: 30px;

    &.btn-update {
      background: #63f5b0;
      color: #000;
      margin-bottom: 0;
    }

    &.btn-remove {
      background: #f97c66;
    }

    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }
`;

export const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0;

  .fa {
    font-size: 50px;
    color: #fff;
  }
`;
