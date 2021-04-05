import { useEffect, useState } from "react";
import styled from "styled-components";
import Match from "./Match";
import axios from 'axios';

const ButtonCon = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 1fr) 50px;
  grid-gap: 10px;
  height: 100%;

  @media all and (max-width: 840px){
    grid-template-columns: 1fr;
    grid-template-rows: repeat(10, 1fr) 50px;
    grid-gap: 10px;
  }
`;

const Button = styled.button`
  width: 60%;
  height: 100%;
  font-size: 22px;
  font-weight: 600;
  background-color: #32465A;
  color: white;
`;

const Main = ({ summonerInfo, matches }) => {
  //setSlice는 버튼 누르면 10씩 늘어나게
  const [slice, setSlice] = useState(0);

  const [championInfo, setChampionInfo] = useState(null);
  const [spellInfo, setSpellInfo] = useState(null);
  const [runeInfo, setRuneInfo] = useState(null);

  const [champLoading, setChampLoading] = useState(true);
  const [spellLoading, setSpellLoading] = useState(true);
  const [runeLoading, setRuneLoading] = useState(true);

  useEffect(() => {
    const getChampionInfo = async () => {
      const result = await axios.get(process.env.NODE_ENV === "production" ?
        "https://lol-record.herokuapp.com/api/champinfo" :
        'http://localhost:4000/api/champinfo');
      setChampionInfo(result.data.champinfo.data);
      setChampLoading(false);
    }
    const getSpellInfo = async () => {
      const result = await axios.get(process.env.NODE_ENV === "production" ?
        "https://lol-record.herokuapp.com/api/spellinfo" :
        'http://localhost:4000/api/spellinfo');
      setSpellInfo(result.data.spellinfo.data);
      setSpellLoading(false);
    }
    const getRuneInfo = async () => {
      const result = await axios.get(process.env.NODE_ENV === "production" ?
        "https://lol-record.herokuapp.com/api/runeinfo" :
        'http://localhost:4000/api/runeinfo');
      setRuneInfo(result.data.runeinfo);
      setRuneLoading(false);
    }
    getChampionInfo();
    getSpellInfo();
    getRuneInfo();
  }, []);

  return !champLoading && !spellLoading && !runeLoading && <Container>
    {
      matches?.slice(slice, slice + 10).map((match, i) => <Match
        key={i}
        gameId={match.gameId}
        lane={match.lane}
        role={match.role}
        summonerInfo={summonerInfo}
        championInfo={championInfo}
        spellInfo={spellInfo}
        runeInfo={runeInfo} />)
    }
    <ButtonCon>
      <Button onClick={() => (slice === 0 ? null : setSlice(slice - 10))}>Prev</Button>
    </ButtonCon>
    <ButtonCon>
      <Button onClick={() => (slice === 90 ? null : setSlice(slice + 10))}>Next</Button>
    </ButtonCon>
  </Container>
}

export default Main;