import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const MyListPage = () => {
  return (
    <MyListWrapper>
      <ProfileForm />
      <MainContainer>
        <HeaderForm />
        <MyListContainer></MyListContainer>
      </MainContainer>
    </MyListWrapper>
  );
};

const MyListWrapper = styled.div`
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

const MyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 500px;
  height: 550px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export default MyListPage;
