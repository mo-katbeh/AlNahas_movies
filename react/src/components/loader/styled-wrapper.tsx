import styled from "styled-components";
// interface Props {
//   className: string;
// }
const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span className="loader-text text-2xl font-bold">loading</span>
        <span className="load" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* full screen height */
  width: 100%; /* full width */
  background: #0f0f0f; /* optional: dark background */

  .loader {
    width: 80px;
    height: 50px;
    position: relative;
  }

  .loader-text {
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    color: #ad0000;
    animation: text_713 3.5s ease both infinite;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .load {
    background-color: #ad0000;
    border-radius: 50px;
    display: block;
    height: 16px;
    width: 16px;
    bottom: 0;
    position: absolute;
    transform: translateX(64px);
    animation: loading_713 3.5s ease both infinite;
  }

  .load::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #ff2e2e;
    border-radius: inherit;
    animation: loading2_713 3.5s ease both infinite;
  }

  @keyframes text_713 {
    0% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }
    40% {
      letter-spacing: 2px;
      transform: translateX(26px);
    }
    80% {
      letter-spacing: 1px;
      transform: translateX(32px);
    }
    90% {
      letter-spacing: 2px;
      transform: translateX(0px);
    }
    100% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }
  }

  @keyframes loading_713 {
    0% {
      width: 16px;
      transform: translateX(0px);
    }
    40% {
      width: 100%;
      transform: translateX(0px);
    }
    80% {
      width: 16px;
      transform: translateX(64px);
    }
    90% {
      width: 100%;
      transform: translateX(0px);
    }
    100% {
      width: 16px;
      transform: translateX(0px);
    }
  }

  @keyframes loading2_713 {
    0% {
      transform: translateX(0px);
      width: 16px;
    }
    40% {
      transform: translateX(0%);
      width: 80%;
    }
    80% {
      width: 100%;
      transform: translateX(0px);
    }
    90% {
      width: 80%;
      transform: translateX(15px);
    }
    100% {
      transform: translateX(0px);
      width: 16px;
    }
  }
`;

export default Loader;
