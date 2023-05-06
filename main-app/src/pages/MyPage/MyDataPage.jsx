import React from 'react';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const emailAtom = atom('rani@gmail.com');
const nameAtom = atom('라니안');
const nicknameAtom = atom('라니라니');
const passwordAtom = atom('1234');
const confirmPasswordAtom = atom('1234');

const MyDataPage = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [name, setName] = useAtom(nameAtom);
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);

  setEmail('rani@gmail.com');
  setName('고양이');
  setNickname('라니라니');
  setPassword('1234');
  setConfirmPassword('1234');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // 저장 로직 구현
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <MyDataWrapper>
      <ProfileForm />
      <MainContainer>
        <HeaderForm />
        <MyDataContainer onSubmit={handleSubmit}>
          <label>이메일</label>
          <Contents
            type='email'
            value={email}
            readOnly
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>이름</label>
          <Contents
            type='name'
            value={name}
            readOnly
            onChange={(event) => setName(event.target.value)}
          />
          <label>닉네임</label>
          <Contents
            type='nickname'
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <label>비밀번호</label>
          <Contents
            type='password'
            value={password}
            required
            minLength='8'
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>비밀번호 확인</label>
          <Contents
            type='password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <SubmitButton type='submit'>저장</SubmitButton>
        </MyDataContainer>
      </MainContainer>
    </MyDataWrapper>
  );
};

const MyDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;

  /* @media (max-width: 768px) {
  } */
`;

const MainContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const MyDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 500px;
  height: 550px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  /* @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-top: 20px;
  } */
`;

const Contents = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 30px;
  margin: 10px;
  padding: 5px;
`;

const SubmitButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 20px;
`;

export default MyDataPage;
