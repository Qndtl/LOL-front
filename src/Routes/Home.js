import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from '../Components/Icons';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  input{
    font-size: 18px;
    width: 50%;
    height: 60px;
    border-radius: 30px;
    background-color: rgba(255,255,255,0.7);
    &::placeholder{
      font-size: 20px;
    }
    padding-top: 5px;
    padding-left: 20px;
    @media screen and (max-width: 1000px){
      width: 60%;
    }
    @media screen and (max-width: 400px){
      width: 80%;
    }
  }
  position: relative;
  button{
    position: relative;
    right: 40px;
    top: 5px;
    svg{
      fill: grey;
    }
  }
`;

const Home = () => {
  const [summonerName, setSummonerName] = useState('');
  const history = useHistory();
  const onSubmit = e => {
    history.push(`/result/${summonerName}`)
  }
  return <Wrapper src={'/bg.png'}>
    <Form onSubmit={onSubmit}>
      <input placeholder="Search" value={summonerName} onChange={e => setSummonerName(e.target.value)} />
      <button><Search /></button>
    </Form>
  </Wrapper>
}

export default Home;