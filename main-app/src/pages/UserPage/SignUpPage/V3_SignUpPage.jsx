import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation, isSuccess } from 'react-query';
import { post } from '../../utils/api';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);

  const { mutate, isLoading, isError } = useMutation(
    async (data) => {
      const res = await post('/api/auth/signup', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
    return res.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: (error) => {
        setError(error);
      },
    }
  ); 

  /** 회원가입 제출 */
  const SignUpSubmit = (e) => {
    e.preventDefault();
    mutate(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /** 이름 유효성 검사 */
  const handleNameChange = (e) => {
    const name = e.target.value;
    setUser.name(name);

    if (name.length < 3 || name.length > 20) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  };

  /** 닉네임 유효성 검사 */
  const handleNicknameChange = (e) => {
    const nickname = e.target.value;
    user.nickname(nickname);

    if (nickname.length < 3 || nickname.length > 20) {
      setIsNicknameValid(false);
    } else {
      setIsNicknameValid(true);
    }
  };

  /** 이메일 유효성 검사 */
  const handleEmailChange = (e) => {
    const email = e.target.value;
    user.email(email);

    if (!email.match(/\S+@\S+\.\S+/)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  /** 비밀번호 유효성 검사 */
  const handlePwChange = (e) => {
    const password = e.target.value;
    user.password(password);

    if (password.length < 8) {
      setIsPwValid(false);
    } else {
      setIsPwValid(password === user.confirmPassword);
    }
  };

  //* 비밀번호 확인 유효성 검사 */
  const handlePwMatchChange = (e) => {
    const confirmPassword = e.target.value;
    user.confirmPassword(confirmPassword);

    setIsPwMatch(user.password === confirmPassword);
  };

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={SignUpSubmit}>
        <h1>회원가입</h1>
        <label>이름</label>
        <InputWrapper>
          <input
            type='text'
            placeholder='이름'
            // ref={nameRef}
            onChange={handleNameChange}
            value={user.name}
          />
        </InputWrapper>
        {!isNameValid && <div>이름은 2글자 이상, 20글자 이하여야 합니다.</div>}
        <label>닉네임</label>
        <InputWrapper>
          <input
            type='text'
            placeholder='닉네임'
            // ref={nicknameRef}
            onChange={handleNicknameChange}
            value={user.nickname}
          />
        </InputWrapper>
        {!isNicknameValid && (
          <div>이름은 2글자 이상, 20글자 이하여야 합니다.</div>
        )}
        <label>이메일</label>
        <InputWrapper>
          <input
            type='email'
            placeholder='이메일'
            // ref={emailRef}
            onChange={handleEmailChange}
            value={user.email}
          />
        </InputWrapper>
        {!isEmailValid && <div>유효한 이메일 주소를 입력해주세요.</div>}
        <label>비밀번호</label>
        <InputWrapper>
          <input
            type='password'
            placeholder='비밀번호'
            // ref={pwRef}
            onChange={handlePwChange}
            value={user.password}
          />
        </InputWrapper>
        {!isPwValid && (
          <div>비밀번호는 8글자 이상이어야 하며, 확인란과 일치해야 합니다.</div>
        )}
        <label>비밀번호 확인</label>
        <InputWrapper>
          <input
            type='password'
            placeholder='비밀번호 확인'
            // ref={confirmPwRef}
            onChange={handlePwMatchChange}
          />
        </InputWrapper>
        {!isPwMatch && <div>비밀번호 확인이 일치하지 않습니다.</div>}
        <button disabled={isLoading}>회원가입</button>
        <GotoLogin>
          <Link to='/login'>이미 계정이 있으신가요?</Link>
        </GotoLogin>
        {isSuccess && <p>Successfully signed up!</p>}
      </SignUpForm>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const SignUpForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 600px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  label {
    text-align: left;
  }
  button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 80px;
  }
`;

// const InvalidMessage = styled.div``;
const InputWrapper = styled.div``;
const GotoLogin = styled.div`
  color: green;
  margin-top: 20px;
  font-size: 15px;
`;

export default SignUp;
