import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import * as API from '../../commons/api';
// import { useUserDispatch } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();
  const navigate = useNavigate();

  // const dispatch = useUserDispatch();

  /** 로그인 API */
  const loginAPI = async (userData) => {
    try {
      const { data } = await axios.post('/users/sign-in', userData);
      // console.log("login", data);

      //토큰처리?? => 세션스토리지로 처리
      sessionStorage.setItem('token', data.token);

      // dispatch({
      //   type: 'LOGIN',
      //   isLoggedIn: true,
      // });

      navigate('/');
    } catch (err) {
      console.log('Error', err?.response?.data);
      navigate('/login');
      alert('이메일 또는 비밀번호를 확인해주세요');
    }
  };

  /** 로그인 제출 */
  const loginSubmit = useCallback(
    (e) => {
      e.preventDefault();
      loginAPI({ email, password });
      setEmail('');
      setPassword('');
    },
    [email, password]
  );

  return (
    <LoginWrapper>
      <Loginform onSubmit={loginSubmit}>
        <h1>로그인</h1>
        <InputWrapper>
          <label>이메일</label>
          <br />
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일을 입력하세요'
          />
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <br />
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            placeholder='비밀번호를 입력하세요'
          />
        </InputWrapper>
        <button>로그인</button>
        <GotoSignup>
          <Link to='/signup'>회원가입</Link>
        </GotoSignup>
      </Loginform>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 50px;
`;
const Loginform = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 600px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 40px;
  }
`;
const InputWrapper = styled.div``;
const GotoSignup = styled.div`
  color: green;
  margin-top: 20px;
`;

export default Login;
