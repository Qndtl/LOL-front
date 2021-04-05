import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import Participant from "./Participant";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.3fr 0.7fr 1fr;
  place-items: center;
  grid-gap: 2px;
  background-color: rgba(255,255,255,0.7);
  @media all and (max-width: 1440px){
    grid-template-columns: 0.7fr 0.5fr 1fr;
  }
  border-left: 10px solid ${props => props.borderColor};
  background: linear-gradient(to right, ${props => props.bgColor1}, ${props => props.bgColor2})
`;

const MainCon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  span{
    font-weight: 600;
    color: white;
  }
`;
const MyChampImg = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
`;
const SpellCon = styled.div`
  img{
    width: 25px;
    height: 25px;
    margin: 0px 2px;
    border-radius: 5px;
  }
`;
const RuneCon = styled(SpellCon)`
  img{
    width: 18px;
    height: 18px;
    margin: 0px 6px;
  }
`;

const KdaCon = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  span{
    font-size: 18px;
    font-weight: 600;
    color: white;
  }
  p{
    font-size: 14px;
    color: grey;
  }
`;
const KDA = styled.div`
  span{
    letter-spacing: 2px;
  }
  span:first-child{
    color: #90EE90;
  }
  span:nth-child(2){
    color: grey;
  }
  span:nth-child(3){
    color: red;
  }
  span:nth-child(4){
    color: grey;
  }
  span:last-Child{
    color: orange;
  }
`;

const ItemCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  p{
    font-size: 13px;
    letter-spacing: 1px;
    color: grey;
  }
`;
const Items = styled.div`
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
`;
const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 35px;
    height: 35px;
    border-radius: 5px;
  }
  span{
    width: 35px;
    height: 35px;
    background-color: grey;
    border-radius: 5px;
  }
`;
const SubInfo = styled.div`
  display: flex;
  align-items: center;
  p{
    margin: 10px 5px;
  }
  p:last-child{
    color: orange;
  }
`;
const MultiKillCon = styled.div`
  display: flex;
  justify-content: center;
  span{
    font-size: 12px;
    font-weight: 600;
    color: white;
    padding: 3px;
    background-color: green;
    border-radius: 5px;
  }
`;
const KillSpan = styled.span`
  background: linear-gradient(to right, ${props => props.color1}, ${props => props.color2}, ${props => props.color3});
`;

const ParticipantCon = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 3px;
  grid-auto-flow: column;

  @media all and (max-width: 1440px){
    display: none;
  }
`;
//----------------------------------------------------------------STYLED COMPONENTS END----------------------------------------------------------------

const Match = ({ gameId, lane, role, summonerInfo, championInfo, spellInfo, runeInfo }) => {
  const [gameInfo, setGameInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  let myIndex = null;
  let myChampionId = null;
  let myChampionName = null;

  let mySpell1Name = null;
  let mySpell2Name = null;

  let myMainRune = null;
  let mainRuneIdx = null;
  let mySubRune = null;
  let subRuneIdx = null;

  useEffect(() => {
    const getGameInfo = async () => {
      const result = await axios.post(process.env.NODE_ENV === "production" ?
        "http://lol-record.herokuapp.com/api/match" :
        'http://localhost:4000/api/match', { gameId });
      //console.log(result.data)
      setGameInfo(result?.data);
      setLoading(false);
    }
    getGameInfo();
  }, [gameId]);

  if (!loading) {
    myIndex = gameInfo?.participantIdentities?.findIndex(i => i.player.summonerName === summonerInfo.name);
    myChampionId = gameInfo?.participants[myIndex]?.championId.toString();
    myChampionName = Object.values(championInfo).filter(champ => champ?.key === myChampionId)[0]?.id;
    //console.log(myIndex);
    //console.log(myChampionId);
    //console.log(myChampionName);

    mySpell1Name = Object.values(spellInfo).filter(spell => spell.key === gameInfo.participants[myIndex].spell1Id.toString())[0].id;
    mySpell2Name = Object.values(spellInfo).filter(spell => spell.key === gameInfo.participants[myIndex].spell2Id.toString())[0].id;
    //console.log(Object.values(spellInfo));
    //console.log(Object.values(spellInfo).filter(spell => spell.key === gameInfo.participants[myIndex].spell1Id.toString()));

    mainRuneIdx = runeInfo?.findIndex(i => i.id === gameInfo?.participants[myIndex]?.stats?.perkPrimaryStyle);
    myMainRune = runeInfo[mainRuneIdx]?.icon?.split('Styles/')[1];
    subRuneIdx = runeInfo?.findIndex(i => i.id === gameInfo?.participants[myIndex]?.stats?.perkSubStyle);
    mySubRune = runeInfo[subRuneIdx]?.icon?.split('Styles/')[1];
    //console.log(runeInfo);
  }
  if (!loading) { console.log('%c gameinfo', 'color: red, font-size: 25px'); console.log(gameInfo); console.log('-----------------------------') }
  //if(!loading){console.log("myinfo");console.log(gameInfo.participantIdentities[myIndex]);console.log('--------------------------')}
  return loading ? <Loader /> : <Container bgColor1={gameInfo?.participants[myIndex]?.stats?.win === true ? "#203748" : "#332B32"} bgColor2={gameInfo?.participants[myIndex]?.stats?.win === true ? "#171D24" : "#241E1E"} borderColor={gameInfo?.participants[myIndex]?.stats?.win === true ? "#001D6C" : gameInfo?.gameDuration < 300 ? "#808080" : "#6A0101"}>
    <MainCon>
      <MyChampImg src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${myChampionName}.png`} alt={myChampionName} />
      <span>{myChampionName}</span>
      <SpellCon>
        <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/spell/${mySpell1Name}.png`} alt={mySpell1Name} />
        <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/spell/${mySpell2Name}.png`} alt={mySpell2Name} />
      </SpellCon>
      <RuneCon>
        <img src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${myMainRune}`} alt="Main Rune" />
        <img src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${mySubRune}`} alt="Sub Rune" />
      </RuneCon>
    </MainCon>
    <KdaCon>
      <span>{gameInfo.participants[myIndex].stats.win === true ? "승리" : gameInfo.gameDuration < 300 ? "다시하기" : "패배"}</span>
      <p>
        {
          `${new Date(gameInfo?.gameCreation).getFullYear().toString()}.${new Date(gameInfo?.gameCreation).getMonth() + 1 < 10 ? `0${new Date(gameInfo?.gameCreation).getMonth() + 1}` : new Date(gameInfo?.gameCreation).getMonth() + 1}.${new Date(gameInfo?.gameCreation).getDate() < 10 ? `0${new Date(gameInfo?.gameCreation).getDate()}` : new Date(gameInfo?.gameCreation).getDate()}`
        }
      </p>
      <KDA>
        <span>{gameInfo?.participants[myIndex]?.stats?.kills}</span>
        <span>/</span>
        <span>{gameInfo?.participants[myIndex]?.stats?.deaths}</span>
        <span>/</span>
        <span>{gameInfo?.participants[myIndex]?.stats?.assists}</span>
      </KDA>
      <p>
        {
          gameInfo?.participants[myIndex]?.stats?.deaths === 0 ? "0.00:1" : `${((gameInfo?.participants[myIndex]?.stats?.kills + gameInfo?.participants[myIndex]?.stats?.assists) / gameInfo?.participants[myIndex]?.stats?.deaths).toFixed(2)}:1`
        }
      </p>
    </KdaCon>
    <ItemCon>
      <MultiKillCon>
        {
          gameInfo?.participants[myIndex]?.stats?.largestMultiKill === 0 ?
            null : gameInfo?.participants[myIndex]?.stats?.largestMultiKill === 1 ?
              null : gameInfo?.participants[myIndex]?.stats?.largestMultiKill === 2 ?
                <KillSpan color1="#52c234" color2="#52c234" color3="#52c234">DOUBLE</KillSpan> : gameInfo?.participants[myIndex]?.stats?.largestMultiKill === 3 ?
                  <KillSpan color1="#E99C89" color2="#E99C89" color3="#E99C89">TRIPLE</KillSpan> : gameInfo?.participants[myIndex]?.stats?.largestMultiKill === 4 ?
                    <KillSpan color1="#FF7F0D" color2="#FF7F0D" color3="#FF7F0D">QUADRA</KillSpan> : gameInfo?.participants[myIndex]?.stats?.largestMultiKill === 5 ?
                      <KillSpan color1="#1e9600" color2="#fff200" color3="#ff0000">PENTA</KillSpan> : null
        }
      </MultiKillCon>
      <Items>
        <Item>{gameInfo?.participants[myIndex]?.stats?.item0 === 0 ? <span></span> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/item/${gameInfo?.participants[myIndex]?.stats?.item0}.png`} alt={gameInfo?.participants[myIndex]?.stats?.item0} />}</Item>
        <Item>{gameInfo?.participants[myIndex]?.stats?.item1 === 0 ? <span></span> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/item/${gameInfo?.participants[myIndex]?.stats?.item1}.png`} alt={gameInfo?.participants[myIndex]?.stats?.item1} />}</Item>
        <Item>{gameInfo?.participants[myIndex]?.stats?.item2 === 0 ? <span></span> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/item/${gameInfo?.participants[myIndex]?.stats?.item2}.png`} alt={gameInfo?.participants[myIndex]?.stats?.item2} />}</Item>
        <Item>{gameInfo?.participants[myIndex]?.stats?.item6 === 0 ? <span></span> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/item/${gameInfo?.participants[myIndex]?.stats?.item6}.png`} alt={gameInfo?.participants[myIndex]?.stats?.item3} />}</Item>
        <Item>{gameInfo?.participants[myIndex]?.stats?.item3 === 0 ? <span></span> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/item/${gameInfo?.participants[myIndex]?.stats?.item3}.png`} alt={gameInfo?.participants[myIndex]?.stats?.item4} />}</Item>
        <Item>{gameInfo?.participants[myIndex]?.stats?.item4 === 0 ? <span></span> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/item/${gameInfo?.participants[myIndex]?.stats?.item4}.png`} alt={gameInfo?.participants[myIndex]?.stats?.item5} />}</Item>
        <Item>{gameInfo?.participants[myIndex]?.stats?.item5 === 0 ? <span></span> : <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/item/${gameInfo?.participants[myIndex]?.stats?.item5}.png`} alt={gameInfo?.participants[myIndex]?.stats?.item6} />}</Item>
      </Items>
      <SubInfo>
        <p>{gameInfo?.participants[myIndex]?.stats?.neutralMinionsKilled + gameInfo?.participants[myIndex]?.stats?.totalMinionsKilled}CS</p>
        <p>{`${Math.ceil(gameInfo.gameDuration / 60)}분`}</p>
        <p>{`${gameInfo.participants[myIndex].stats.goldEarned}Gold`}</p>
      </SubInfo>
    </ItemCon>
    <ParticipantCon>
      {
        !loading && (<>
          {
            gameInfo?.participantIdentities?.map((participant, i) => <Participant key={i} participant={participant} gameInfo={gameInfo} championInfo={championInfo} idx={i} />)
          }
        </>)
      }
    </ParticipantCon>
  </Container>
}

export default Match;