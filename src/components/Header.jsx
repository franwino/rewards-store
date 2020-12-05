import styled from "styled-components";

const Points = styled.div`
  border-radius: 20px;
  background-color: grey;
`;

function User(props) {
  return (
    <>
      <p>Username</p>
      <Points>
        6000
        <img alt="coins"></img>
      </Points>
    </>
  );
}

export default function Header(props) {
  return (
    <>
      <img alt="logo"></img>
      <User></User>
    </>
  );
}
