import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-gap: 2px;
  height: 30px;
  width: 100%;
  place-items: center;
`;

const ChampImg = styled.img`
  background-color: blue;
  width: 25px;
  height: 25px;
  border-radius: 8px;
`;

const SummonerName = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
  height: 20px;
  font-size: 13px;
  font-weight: 600;
`;

const Link = styled.span`
  cursor: pointer;
`;
//--------------------------------------------------------------STYLED COMPONENTS END----------------------------------------------------------------
const Participant = ({ gameInfo, participant, championInfo, idx }) => {
  let champName = Object.values(championInfo).filter(champ => champ.key === gameInfo?.participants[participant?.participantId - 1]?.championId?.toString())[0]?.id;

  const onClick = () => {
    window.location = `/result/${participant.player.summonerName}`;
  }
  return <Container>
    <ChampImg src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${champName}.png`} />
    <SummonerName style={gameInfo.participants[idx].teamId === 100 ? { color: "#39ACAF" } : { color: "#EAB544" }}><Link onClick={onClick}>{participant.player.summonerName}</Link></SummonerName>
  </Container>
}

export default Participant;