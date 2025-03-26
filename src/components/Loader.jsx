import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

function Loader() {
  return (
    <LoaderWrapper>
      <ClipLoader size={50} color="#36d7b7" />
    </LoaderWrapper>
  );
}

export default Loader;
