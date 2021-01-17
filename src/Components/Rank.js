import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 2fr;
  grid-gap: 10px;

  @media all and (max-width: 840px){
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const SoloRankCon = styled.div`
  img{
    width: 100px;
    height: 100px;
  }
  width: 100%;
  background-color: #32465A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #01B6C8;
`;

const TeamRankCon = styled(SoloRankCon)`
`;

const Rank = ({summonerInfo, matches}) => {
  const [soloRank, setSoloRank] = useState(null);
  const [teamRank, setTeamRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLeague = async () => {
      const result = await axios.post('http://localhost:4000/api/league',{summonerId: summonerInfo.id});

      if(result.data[0] === undefined){
        setSoloRank({tier: "UNRANKED", rank: "UNRANKED"})
      }else{
        setSoloRank(result.data[0]);
      }
      if(result.data[1] === undefined){
        setTeamRank({tier: "UNRANKED", rank: "UNRANKED"});
      }else{
        setTeamRank(result.data[1]);
      }
      setLoading(false);
    }
    getLeague();
  },[summonerInfo.id]);

  return <>
    {
      loading ? <h1>Loading...</h1> : <Container>
        <SoloRankCon>
          <h3>솔로 랭크</h3>
          {(() => {
            switch (soloRank.tier){
              case undefined:
                return <span>Unranked</span>
              case 'IRON':
                return (
                  <img src={'/ranked-emblems/Emblem_Iron.png'} alt="Iron-tier"/>
                )
              case 'BRONZE':
                return (
                  <img src={'/ranked-emblems/Emblem_Bronze.png'} alt="Bronze-tier"/>
                )
              case 'SILVER':
                return (
                  <img src={'/ranked-emblems/Emblem_Silver.png'} alt="Silver-tier"/>
                )
              case 'GOLD':
                return (
                  <img src={'/ranked-emblems/Emblem_Gold.png'} alt="Gold-tier"/>
                )
              case 'PLATINUM':
                return (
                  <img src={'/ranked-emblems/Emblem_Platinum.png'} alt="Platinum-tier"/>
                )
              case 'DIAMOND':
                return (
                  <img src={'/ranked-emblems/Emblem_Diamond.png'} alt="Diamond-tier"/>
                )
              case 'MASTER':
                return (
                  <img src={'/ranked-emblems/Emblem_Master.png'} alt="Master-tier"/>
                )
              case 'GRANDMASTER':
                return (
                  <img src={'/ranked-emblems/Emblem_Grandmaster.png'} alt="Grandmaster-tier"/>
                )
              case 'CHALLENGER':
                return (
                  <img src={'/ranked-emblems/Emblem_Challenger.png'} alt="Challenger-tier"/>
                )
              default:
                return <span>Unranked</span>
            }
          })()}
          <h4>{soloRank.rank}</h4>
        </SoloRankCon>
        <TeamRankCon>
          <h3>팀 랭크</h3>
          {(() => {
            switch (teamRank.tier){
              case undefined:
                return <span>Unranked</span>
              case 'IRON':
                return (
                  <img src={'/ranked-emblems/Emblem_Iron.png'} alt="Iron-tier"/>
                )
              case 'BRONZE':
                return (
                  <img src={'/ranked-emblems/Emblem_Bronze.png'} alt="Bronze-tier"/>
                )
              case 'SILVER':
                return (
                  <img src={'/ranked-emblems/Emblem_Silver.png'} alt="Silver-tier"/>
                )
              case 'GOLD':
                return (
                  <img src={'/ranked-emblems/Emblem_Gold.png'} alt="Gold-tier"/>
                )
              case 'PLATINUM':
                return (
                  <img src={'/ranked-emblems/Emblem_Platinum.png'} alt="Platinum-tier"/>
                )
              case 'DIAMOND':
                return (
                  <img src={'/ranked-emblems/Emblem_Diamond.png'} alt="Diamond-tier"/>
                )
              case 'MASTER':
                return (
                  <img src={'/ranked-emblems/Emblem_Master.png'} alt="Master-tier"/>
                )
              case 'GRANDMASTER':
                return (
                  <img src={'/ranked-emblems/Emblem_Grandmaster.png'} alt="Grandmaster-tier"/>
                )
              case 'CHALLENGER':
                return (
                  <img src={'/ranked-emblems/Emblem_Challenger.png'} alt="Challenger-tier"/>
                )
              default:
                return <span>Unranked</span>
            }
          })()}
          <h4>{teamRank.rank}</h4>
        </TeamRankCon>
      </Container>
    }
  </>
}

export default Rank;