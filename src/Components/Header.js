import { useState } from "react";
import styled from "styled-components";
import { Search } from "./Icons";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "first second third";
  border-bottom: 1px solid grey;
  @media all and (max-width: 840px){
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    grid-template-areas: 
    "first"
    "third";
  }
`;

const FirstCon = styled.div`
  height: 200px;
  padding: 0px 10%;
  display: flex;
  align-items: center;
  grid-area: first;
  @media all and (max-width: 840px){
    height: 100px;
  }
`;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  @media all and (max-width: 840px){
    width: 70px;
    height: 70px;
  }
`;
const SummonerTextCon = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 20px;
  span:first-child{
    font-size: 20px;
    font-weight: 600;
    @media all and (max-width: 840px){
      font-size: 15px;
    }
  }
  span:last-child{
    margin-top: 10px;
    font-size: 25px;
    font-weight: 600;
    @media all and (max-width: 840px){
      font-size: 20px;
    }
  }
  
`;

const SecondCon = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: second;
  @media all and (max-width: 840px){
    display: none;
  }
`;

const ThirdCon = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: third;
  input, button{
    box-sizing: border-box;
    height: 40px;
  }
  input{
    width: 300px;
    border-bottom: 1px solid black;
    font-size: 17px;
  }
  input::placeholder{
    text-align: center;
  }
  button{
    width: 50px;
    svg{
      fill: rgba(0,0,0,0.5)
    }
  }
  @media all and (max-width: 840px){
    height: 100px;
  }
`;

const Header = ({username, profileIcon, summonerLevel}) => {
  const [searchName, setSearchName] = useState('');

  const onClick = () => {
    window.location = `/result/${searchName}`
  }
  const onEnter = (e) => {
    if(e.charCode === 13){
      window.location = `/result/${searchName}`;
    }
  }
  return <Wrapper>
    <FirstCon>
      <ProfileImg src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIcon}.png`} />
      <SummonerTextCon>
        <span>{`Lv. ${summonerLevel}`}</span>
        <span>{username}</span>
      </SummonerTextCon>
    </FirstCon>
    <SecondCon></SecondCon>
    <ThirdCon>
      <input placeholder="소환사 검색" onChange={e => setSearchName(e.target.value)} onKeyPress={onEnter} />
      <button onClick={onClick}><Search /></button>
    </ThirdCon>
    </Wrapper>
}

export default Header;