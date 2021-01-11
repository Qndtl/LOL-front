import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
  font-size: 100px;
  font-weight: 600;
  a{
    text-decoration: none;
    color: inherit;
  }
`;

const Container = styled.div``;

const UserNotFound = ({text}) => {
  return <Wrapper>
    <Container>
      {text}
    </Container>
    <button><Link to="/">go back</Link></button>
  </Wrapper>
}

export default UserNotFound;