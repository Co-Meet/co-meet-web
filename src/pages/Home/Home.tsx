import React from 'react';
import {Link} from 'react-router-dom';
import {JOIN_PAGE, LOGIN_PAGE} from '../../consts/route';

function Home() {
  return (
    <>
      <Link to={LOGIN_PAGE}>
        <button>이미 계정이 있나요</button>
      </Link>
      <Link to={JOIN_PAGE}>
        <button>계정 만들기</button>
      </Link>
    </>
  );
}

export default Home;
