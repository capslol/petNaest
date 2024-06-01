import React, {useEffect} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../services/auth";
import {Box, Spinner} from "@chakra-ui/react";
import {useAuth} from "../contexts/AuthContext";
import GoBackButton from "./GoBackButton";
import {Avatar, Button, colors, Container, Header, mixins, Section} from "../styles/styles";
import { BsThreeDots } from "react-icons/bs";
import {styled} from "styled-components";
import { MdOutlineEdit } from "react-icons/md";


const PetInfo = styled.section`
display: flex;
  justify-content: space-between;
`;

const PetDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PetName = styled.h2`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
`;

const PetBreed = styled.p`
  font-size: 14px;
  margin: 0;
  color: #888;
`;
const PetCard = () => {
    const { logout } = useAuth();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['userData'],
        queryFn: getUserData,
    });

    const { petId } = useParams();
    const { data: pet, isLoading, isError } = useQuery({
        queryKey: ['petData', petId],
        queryFn: () => getPetData(petId),
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
    return (
        <Container>
            <Header>
                <GoBackButton/>
                <h2>Pet Details</h2>
                <Button><BsThreeDots/></Button>
            </Header>
            <Section>
                <PetInfo>
                    <Avatar imageUrl="img/dog-avatar.png"/>
                    <PetDetails>
                        <PetName>Dobby</PetName>
                        <PetBreed>French Bulldog</PetBreed>
                    </PetDetails>
                    <Button> <MdOutlineEdit/> </Button>
                </PetInfo>
            </Section>
        </Container>
    );
};

export default PetCard;