import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const MySignOutPage = () => {
  return (
    <SingOutWrapper>
      <ProfileForm />
      <MainContainer>
        <HeaderForm />
        <SignOutContainer>
          <h2>정말로 탈퇴하시겠습니까?</h2>
          <Contents>비밀번호</Contents>
          <Contents>비밀번호 확인</Contents>
          <SubmitButton type='submit'>회원탈퇴</SubmitButton>
        </SignOutContainer>
      </MainContainer>
    </SingOutWrapper>
  );
};

const SingOutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const SignOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 550px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 35px;
  margin: 10px;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 20px;
`;

export default MySignOutPage;
