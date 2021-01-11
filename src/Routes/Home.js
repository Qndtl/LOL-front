import { useState } from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Search} from '../Components/Icons';

const Wrapper = styled.div`
  height: 100vh;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  input{
    width: 600px;
    font-size: 20px;
    text-align: center;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  button{
    width: 70px;
    border-left: 1px solid grey;
    background-color: white;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    svg{
      fill: rgba(0,0,0,0.5)
    }
  }
  input::placeholder{
    font-size: 20px;
  }
  input, button{
    height: 60px;
    opacity: 0.8;
  }
`;

const Home = ({history}) => {
  const [summonerName, setSummonerName] = useState('');

  const onEnter = (e) => {
    if(e.charCode === 13){
      history.push(`/result/${summonerName}`);
    }
  }

  return <Wrapper src={'/bg.png'}>
    <Container>
      <Form>
          <input placeholder="Search by summoner name" onChange={e => setSummonerName(e.target.value)} onKeyPress={onEnter} />
          <Link to={`/result/${summonerName}`}><button><Search /></button></Link>
        </Form>
    </Container>
  </Wrapper>
}

export default withRouter(Home);