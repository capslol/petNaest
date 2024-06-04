import React, {useEffect} from 'react';
import styled from 'styled-components';
import {colors, Container, fonts, Header, Button, mixins, Section, Avatar} from '../styles/styles';
import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../services/auth";
import { Box, Spinner} from "@chakra-ui/react";
import {Pet} from "../types/data";
import {useAuth} from "../contexts/AuthContext";
import { CiSearch  } from "react-icons/ci";
import { PiBellLight } from "react-icons/pi";
import {useNavigate} from "react-router-dom";


const UserInfo = styled.div`
  display: flex;
  align-items: center;
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


const StyledCiSearch = styled(CiSearch)`
    height: 24px;
    width: 24px;
`;
const StyledPiBellLight = styled(PiBellLight)`
    height: 24px;
    width: 24px;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;



const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  font-family: ${fonts.primary};
`;

const PetList = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 85px;
`;

const PetItem = styled.div`
  flex: 0 0 auto;
  width: 60px;
  height: 60px;
  background-color: ${colors.lightBlue};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 24px;
  position: relative;
`;
const PetName = styled.span`
  font-size: 16px;
  position: absolute;
  bottom: -40%;
`;

const AddPet = styled(PetItem)`
  background-color: ${colors.lightYellow};
  color: ${colors.yellow};
  border: 1px dashed ${colors.yellow};
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
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
`;

const ServiceName = styled.p`
  font-size: 14px;
  color: ${colors.gray};
  font-family: ${fonts.primary};
`;

const HomePage = () => {
    const navigate = useNavigate()
    const { logout } = useAuth();
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['userData'],
        queryFn: getUserData,
    });

    useEffect(() => {
        if (isError) {
            logout();
        }
    }, [isError, logout]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (isError) {
        return null;
    }

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`);
    };
    return (
        <Container>
            <Header>
                <UserInfo>
                    <Avatar imageUrl="img/avatar1.png"/>
                    <Greeting>
                        <UserName>Привет, {user.name}!</UserName>
                        {/*<Location>Bangalore, India</Location>*/}
                    </Greeting>
                </UserInfo>
                <IconGroup>
                    <Button>
                        <StyledCiSearch/>
                    </Button>
                    <Button>
                        <StyledPiBellLight/>
                    </Button>
                </IconGroup>
            </Header>
            <Section>
                <SectionTitle>Your Pets</SectionTitle>
                <PetList>
                    <AddPet>+</AddPet>
                    {user.pets.map((pet: Pet) => <PetItem onClick={() => handlePetClick(pet.id)} key={pet.id}>🐶<PetName>{pet.name}</PetName></PetItem>)}
                </PetList>
            </Section>
            <Section>
                <SectionTitle>Services</SectionTitle>
                <ServicesGrid>
                    <ServiceCard>
                        <ServiceIcon src="daycare_icon_url" alt="Daycare"/>
                        <ServiceName>Daycare</ServiceName>
                    </ServiceCard>
                    <ServiceCard>
                        <ServiceIcon src="health_icon_url" alt="Health"/>
                        <ServiceName>Health</ServiceName>
                    </ServiceCard>
                    <ServiceCard>
                        <ServiceIcon src="grooming_icon_url" alt="Grooming"/>
                        <ServiceName>Grooming</ServiceName>
                    </ServiceCard>
                    <ServiceCard>
                        <ServiceIcon src="tracking_icon_url" alt="Tracking"/>
                        <ServiceName>Tracking</ServiceName>
                    </ServiceCard>
                </ServicesGrid>
            </Section>
        </Container>
    );
}

export default HomePage;
