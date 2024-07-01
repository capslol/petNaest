// src/styles.ts

import { css, styled } from 'styled-components';

export const colors = {
    background: '#F7F7F7',
    white: '#FFFFFF',
    gray: '#888888',
    lightGray: '#F2F2F2',
    lightBackground: '#F0F0F0',
    lightYellow: '#FBF0C2',
    yellow: '#FFC800',
    lightBlue: '#D1E7FC',
    lightGreen: '#7AB06C'
};

export const fonts = {
    primary: '"Roboto", sans-serif',
};

export const shadows = {
    light: '0px 2px 8px rgba(0, 0, 0, 0.1)',
};

export const mixins = {
    boxShadow: css`
    box-shadow: ${shadows.light};
  `,
};

export const Container = styled.div`
  padding: 16px;
  background-color: ${colors.background};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Button = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  cursor: pointer;
`


export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${colors.white};
  border-radius: 8px;
  ${mixins.boxShadow};
  margin-bottom: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div<{ imageurl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: lightYellow;
  background-image: url(${props => props.imageurl});
  background-size: cover;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 16px;
  margin: 0;
  font-family: ${fonts.primary};
`;

const Location = styled.p`
  font-size: 14px;
  color: ${colors.gray};
  margin: 0;
  font-family: ${fonts.primary};
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;

export const Section = styled.section`
  background-color: ${colors.white};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  ${mixins.boxShadow};
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  font-family: ${fonts.primary};
`;

const PetList = styled.div`
  display: flex;
  overflow-x: auto;
`;

const PetItem = styled.div`
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  background-color: ${colors.lightBackground};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 24px;
`;

const AddPet = styled(PetItem)`
  background-color: ${colors.lightGray};
  color: ${colors.gray};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const ServiceCard = styled.div`
  background-color: ${colors.lightBackground};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ServiceIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const ServiceName = styled.p`
  font-size: 14px;
  color: ${colors.gray};
  font-family: ${fonts.primary};
`;