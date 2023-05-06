import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { ROUTE } from '../../UserPage/LoginPage/Login';

// Atom 설정
//
// const nameAtom = atom('');
// const nicknameAtom = atom('');
// const emailAtom = atom('');
// const passwordAtom = atom('');
// const confirmPasswordAtom = atom('');

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

const SignUpPage = () => {
  const { isLoading, isError, error, mutate } = useMutation(signupUser);

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

  const [registerUserMutation, { isLoading, isSuccess }] =
    useMutation(SignupUser);

  // /** 유효성체크 메세지 */
  // const InvalidMessages = {
  //   name: '2-6글자 한글로 입력해주세요',
  //   nickname: '2-6글자 한글로 입력해주세요',
  //   email: '유효하지 않은 이메일 형식입니다',
  //   password: '비밀번호가 일치하지 않습니다',
  // };

  // /** 이름 유효성 검사 */
  // const checkName = useCallback(
  //   (e) => {
  //     const nameRegex = /^[가-힣]{2,6}$/;
  //     setName(e.target.value);
  //     setIsNameValid(nameRegex.test(e.target.value));
  //   },
  //   [name]
  // );

  // /** 닉네임 유효성 검사 */
  // const checkNickname = useCallback(
  //   (e) => {
  //     const nicknameRegex = /^[가-힣]{2,6}$/;
  //     setNickname(e.target.value);
  //     setIsNicknameValid(nicknameRegex.test(e.target.value));
  //   },
  //   [nickname]
  // );

  // /** 이메일 유효성 검사 */
  // const CheckEmail = useCallback(
  //   (e) => {
  //     const emailRegex =
  //       /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  //     setEmail(e.target.value);
  //     setIsEmailValid(emailRegex.test(e.target.value));
  //   },
  //   [email]
  // );

  // /** 비밀번호 유효성 검사 */
  // useEffect(() => {
  //   if (password && confirmPassword) {
  //     password === confirmPassword ? setIsPwMatch(true) : setIsPwMatch(false);
  //   }
  // }, [password, confirmPassword]);

  /** 신 회원가입 API */
  const SignUpAPI = async () => {
    await registerUserMutation({ name, nickname, email, password });
  };

  const SignUpSubmit = (event) => {
    event.preventDefault();

    if (!isNameValid) {
      return nameRef.current.focus();
    }
    if (!isNicknameValid) {
      return nicknameRef.current.focus();
    }
    if (!isEmailValid) {
      return emailRef.current.focus();
    }
    if (isNameValid && isNicknameValid && isEmailValid && isPwMatch) {
      SignUpAPI();
    }
  };

  /** 구 회원가입 API */
  // const SignUpAPI = async (userData) => {
  //   // await post()
  //   try {
  //     const { data } = await axios.post('', {
  //       name,
  //       nickname,
  //       email,
  //       password,
  //     });
  //     console.log('data', data);

  //     /** navigate 루트를 어떻게 할지? */
  //     // navigate(ROUTE.LOGIN.link);
  //   } catch (err) {
  //     console.log('Error', err.response.data);
  //     alert('이미 사용중인 이메일입니다.');
  //   }
  // };

  /** 회원가입 제출 */

  const signUpSubmit = (e) => {
    e.preventDefault();

    if (!isNameValid) {
      return nameRef.current.focus();
    }
    if (!isNicknameValid) {
      return nicknameRef.current.focus();
    }
    if (!isEmailValid) {
      return emailRef.current.focus();
    }
    if (isNameValid && isNicknameValid && isEmailValid && isPwMatch) {
      SignUpAPI();
    }
  };

  /** 유효성검사 */
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwMatch, setIsPwMatch] = useState(false);

  /** 이름 유효성 검사 */
  const handleNameChange = (e) => {
    const name = e.target.value;
    setUsername(name);

    if (name.length < 3 || name.length > 20) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  };

  /** 닉네임 유효성 검사 */
  const handleNickameChange = (e) => {
    const nickname = e.target.value;
    setUsernickname(nickname);

    if (nickname.length < 3 || nickname.length > 20) {
      setIsNicknameValid(false);
    } else {
      setIsNicknameValid(true);
    }
  };

  /** 이메일 유효성 검사 */
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);

    if (!email.match(/\S+@\S+\.\S+/)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  /** 비밀번호 유효성 검사 */
  const handlePasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(pw);

    if (pw.length < 8) {
      setIsPwMatch(false);
    } else {
      setIsPwMatch(pw === confirmPassword);
    }
  };

  /** 비밀번호 확인 유효성 검사 */
  const handleConfirmPasswordChange = (e) => {
    const confirmPw = e.target.value;
    setConfirmPassword(confirmPw);

    setIsPwMatch(password === confirmPw);
    x;
  };

  return (
    <>
      <SignUpWrapper>
        <SignUpForm onSubmit={SignUpSubmit}>
          <h1>회원가입</h1>
          <label>이름</label>
          <InputWrapper>
            <input
              type='text'
              required
              valued={name}
              placeholder='이름을 입력해주세요'
              onChange={checkName}
              ref={nameRef}
            />
            {name
              ? isNameValid || (
                  <InvalidMessage>{InvalidMessages.name}</InvalidMessage>
                )
              : null}
          </InputWrapper>
          <label>닉네임</label>
          <InputWrapper>
            <input
              type='text'
              required
              value={nickname}
              placeholder='닉네임을 입력해주세요'
              onChange={checkNickname}
              ref={nicknameRef}
            />
            {name
              ? isNameValid || (
                  <InvalidMessage>{InvalidMessages.nickname}</InvalidMessage>
                )
              : null}
          </InputWrapper>
          <label>이메일</label>
          <InputWrapper>
            <input
              type='text'
              required
              value={email}
              placeholder='이메일을 입력해주세요'
              onChange={CheckEmail}
              ref={emailRef}
            />
            {email
              ? isEmailValid || (
                  <InvalidMessage>{InvalidMessages.email}</InvalidMessage>
                )
              : null}
          </InputWrapper>
          <label>비밀번호</label>
          <InputWrapper>
            <input
              type='password'
              required
              minLength='8'
              value={password}
              placeholder='비밀번호를 입력해주세요(8자 이상)'
              onChange={(event) => setPassword(event.target.value)}
              ref={pwRef}
            />
          </InputWrapper>
          <label>비밀번호 확인</label>
          <InputWrapper>
            <input
              type='password'
              required
              minLength='8'
              value={confirmPassword}
              placeholder='비밀번호를 입력해주세요(8자 이상)'
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {isPwMatch || (
              <InvalidMessage>{InvalidMessages.password}</InvalidMessage>
            )}
          </InputWrapper>
          <button>회원가입</button>
          <GotoLogin>
            <Link to='/login'>이미 계정이 있으신가요?</Link>
          </GotoLogin>
        </SignUpForm>
      </SignUpWrapper>
    </>
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

const InvalidMessage = styled.div``;
const InputWrapper = styled.div``;
const GotoLogin = styled.div`
  color: green;
  margin-top: 20px;
  font-size: 15px;
`;

export default SignUpPage;
