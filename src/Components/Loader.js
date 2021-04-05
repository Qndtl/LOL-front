import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Loader = () => {
  return <Container>
    Loading...
  </Container>
}

export default Loader;