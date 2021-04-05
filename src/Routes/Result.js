import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import Main from "../Components/Main";
import Rank from "../Components/Rank";
import UserNotFound from "../Components/UserNotFound";

const Wrapper = styled.div`
  height: 100vh;
`;

const Container = styled.div`
  padding: 0px 5%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 15% 1fr;
  grid-template-rows: 200px 1fr;
  grid-gap: 30px;
  grid-template-areas:
  "header header"
  "side main";

  @media all and (max-width: 840px){
    grid-template-columns: 1fr;
    grid-template-rows: 200px 0.3fr 1fr;
    grid-gap: 20px;
    grid-template-areas:
    "header"
    "side"
    "main";
  }
`;

const RHeader = styled.div`
  height: 100%;
  width: 100%;
  grid-area: header;
  background-color: rgba(255,255,255,0.6);
`;

const RSide = styled.div`
  grid-area: side;
`;

const RMain = styled.div`
  grid-area: main;
`;

const RFooter = styled.div`
  grid-area: footer;
  border: 1px solid black;
`;

const Result = ({ match }) => {
  const { username } = match.params;
  const [loading, setLoading] = useState(true);
  const [summonerInfo, setSummonerInfo] = useState(null);
  const [notFound, setNotFound] = useState(null);

  const [matches, setMatches] = useState(null);
  const [matchLoading, setMatchLoading] = useState(true);
  const getMatches = async (accountId) => {
    const result = await axios.post(process.env.NODE_ENV === "production" ?
      "http://lol-record.herokuapp.com/api/matches" :
      'http://localhost:4000/api/matches', { accountId });
    setMatches(result.data.matches);
    setMatchLoading(false);
  }

  useEffect(() => {
    const getSummonerInfo = async () => {
      const summonerResult = await axios.post(process.env.NODE_ENV === "production" ?
        "http://lol-record.herokuapp.com/api/summoner" :
        `http://localhost:4000/api/summoner`, { summonerName: username });
      if (summonerResult.data === 404) {
        setNotFound(true);
      }
      setSummonerInfo(summonerResult.data);
      setLoading(false);
      getMatches(summonerResult.data.accountId)
    }
    getSummonerInfo();
  }, [username])

  //console.log(summonerInfo);
  //if(!loading && !matchLoading){console.log(matches)}
  return <Wrapper>
    {
      loading || matchLoading ? <Loader /> : !notFound ? <Container>
        <RHeader>
          <Header username={username} profileIcon={summonerInfo.profileIconId} summonerLevel={summonerInfo.summonerLevel} />
        </RHeader>
        <RSide>
          <Rank summonerInfo={summonerInfo} matches={matches} />
        </RSide>
        <RMain>
          <Main summonerInfo={summonerInfo} matches={matches} />
        </RMain>
        <RFooter></RFooter>
      </Container> : <UserNotFound text="User Not Found" />
    }
  </Wrapper>
}

export default Result;