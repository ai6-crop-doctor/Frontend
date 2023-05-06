import React from 'react';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const Mypage = () => {
  return (
    <MyPageWrapper>
      <ProfileForm />
      <MainForm>
        <HeaderForm />
        <MyBoardContainer>
          <MyBoardForm>
            <Title>제목</Title>
            <Contents>글내용(20자이하로 출력)</Contents>
            <Time>작성시간</Time>
            <Author>작성자</Author>
            <Views>조회수</Views>
            <Comments>댓글수</Comments>
            <Likes>좋아요수</Likes>
            <Photos>사진첨부?</Photos>
          </MyBoardForm>
        </MyBoardContainer>
      </MainForm>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const MyBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 550px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const MyBoardForm = styled.div`
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 20%;
  margin: 10px; */

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto auto auto auto auto auto;
  grid-template-areas:
    'Title Title Time'
    'Contents Contents Contents'
    'Time Author'
    'Views Comments'
    'Likes Photos';
  gap: 10px;
  margin: 20px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  grid-area: Title;
  font-size: 24px;
  font-weight: bold;
`;
const Contents = styled.div`
  grid-area: Contents;
  font-size: 16px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Time = styled.div`
  grid-area: Time;
  font-size: 14px;
  color: gray;
`;
const Author = styled.div`
  grid-area: Author;
  font-size: 14px;
  color: gray;
`;
const Views = styled.div`
  grid-area: Likes;
  font-size: 14px;
  color: gray;
`;
const Comments = styled.div`
  grid-area: Comments;
  font-size: 14px;
  color: gray;
`;
const Likes = styled.div`
  grid-area: Photos;
  font-size: 14px;
  color: gray;
`;
const Photos = styled.div`
  grid-area: photos;
  font-size: 14px;
  color: gray;
`;

export default Mypage;
