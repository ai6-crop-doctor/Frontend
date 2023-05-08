import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation, isSuccess } from 'react-query';

const registerUser = async (data) => {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

/** {mutate}로 회원가입 제출 */
const SignupForm = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const nameRef = useRef();
  const nicknameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const confirmPwRef = useRef();

  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);

  const [mutate, { isLoading }] = useMutation(registerUser);

  const signupAPI = async (email, password) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, name, nickname, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return response.json();
  };

  const signupSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutate({ email, nickname, name, password, confirmPassword });
      setEmail('');
      setName('');
      setNickname('');
      setPassword('');
    },
    [email, password, mutate],
    signupAPI
  );

  /** 구 회원가입 제출 */
  // const SignUpSubmit = (event) => {
  //   event.preventDefault();
  //   if (!isNameValid) {
  //     return nameRef.current.focus();
  //   }
  //   if (!isNicknameValid) {
  //     return nicknameRef.current.focus();
  //   }
  //   if (!isEmailValid) {
  //     return emailRef.current.focus();
  //   }
  //   if (isNameValid && isNicknameValid && isEmailValid && isPwMatch) {
  //     signupAPI();
  //   }
  // };

  // 폼 유효성 검사 로직 추가
  // const [isNameValid, setIsNameValid] = useState(false);
  // const [isNicknameValid, setIsNicknameValid] = useState(false);
  // const [isEmailValid, setIsEmailValid] = useState(false);
  // const [isPwMatch, setIsPwMatch] = useState(false);

  /** 이름 유효성 검사 */
  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);

    if (name.length < 3 || name.length > 20) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  };

  // 닉네임 유효성 검사
  const handleNicknameChange = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);

    if (nickname.length < 3 || nickname.length > 20) {
      setIsNicknameValid(false);
    } else {
      setIsNicknameValid(true);
    }
  };

  //이메일 유효성 검사
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);

    if (!email.match(/\S+@\S+\.\S+/)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  // 비밀번호 유효성 검사
  const handlePasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(pw);

    if (pw.length < 8) {
      setIsPwMatch(false);
    } else {
      setIsPwMatch(pw === confirmPassword);
    }
  };

  // 비밀번호 확인 유효성 검사
  const handleConfirmPasswordChange = (e) => {
    const confirmPw = e.target.value;
    setConfirmPassword(confirmPw);

    setIsPwMatch(password === confirmPw);
  };

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={signupSubmit}>
        <h1>회원가입</h1>
        <label>이름</label>
        <InputWrapper>
          <input
            type='text'
            placeholder='이름'
            ref={nameRef}
            onChange={handleNameChange}
          />
        </InputWrapper>
        {!isNameValid && <div>이름은 2글자 이상, 20글자 이하여야 합니다.</div>}
        <label>닉네임</label>
        <InputWrapper>
          <input
            type='text'
            placeholder='닉네임'
            ref={nicknameRef}
            onChange={handleNicknameChange}
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
            ref={emailRef}
            onChange={handleEmailChange}
          />
        </InputWrapper>
        {!isEmailValid && <div>유효한 이메일 주소를 입력해주세요.</div>}
        <label>비밀번호</label>
        <InputWrapper>
          <input
            type='password'
            placeholder='비밀번호'
            ref={pwRef}
            onChange={handlePasswordChange}
          />
        </InputWrapper>
        {!isPwMatch && (
          <div>비밀번호는 8글자 이상이어야 하며, 확인란과 일치해야 합니다.</div>
        )}
        <label>비밀번호 확인</label>
        <InputWrapper>
          <input
            type='password'
            placeholder='비밀번호 확인'
            ref={confirmPwRef}
            onChange={handleConfirmPasswordChange}
          />
        </InputWrapper>
        {!isPwMatch && (
          <div>비밀번호는 8글자 이상이어야 하며, 확인란과 일치해야 합니다.</div>
        )}
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

export default SignupForm;
