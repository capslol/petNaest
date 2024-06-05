import React, {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPetData, updatePetData} from "../services/auth";
import {Box, Input, Spinner} from "@chakra-ui/react";
import {useAuth} from "../contexts/AuthContext";
import GoBackButton from "./GoBackButton";
import {Avatar, Button, colors, Container, Header, mixins, Section} from "../styles/styles";
import { BsThreeDots } from "react-icons/bs";
import {styled} from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import {useParams} from "react-router-dom";
import {Pet, User} from "../types/data";


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


interface PetUpdateData {
    id: number;
    name: string;
    breed: string;
}

const PetCard = () => {
    const { logout } = useAuth();
    const { petId } = useParams<{ petId: string }>();
    const petIdNumber = petId ? parseInt(petId) : undefined;
    const queryClient = useQueryClient();

    const { data: pet, isLoading, isError } = useQuery<Pet>({
        queryKey: ['petData'],
        queryFn: () => getPetData(petIdNumber),
    });


    const mutation = useMutation({
        mutationFn: updatePetData,
        onSuccess: (data) => {
        //     queryClient.invalidateQueries({
        //         queryKey: ['petData']
        // });
            queryClient.setQueryData(['petData'], data.pets.find((pet)=> pet.id === petIdNumber) );
        },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedPet, setEditedPet] = useState<PetUpdateData>({ id: petIdNumber ?? 0, name: '', breed: '' });


    useEffect(() => {
        if (isError) {
            logout();
        }
    }, [isError, logout]);

    useEffect(() => {
        if (pet) {
            setEditedPet({ id: pet.id, name: pet.name, breed: pet.breed });
        }
    }, [pet]);

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

    const handleEdit = () => {
        if( pet){
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        mutation.mutate(editedPet)
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPet({ ...editedPet, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Header>
                <GoBackButton />
                <h2>Pet Details</h2>
                <Button><BsThreeDots /></Button>
            </Header>
            <Section>
                <PetInfo>
                    <Avatar imageUrl="img/dog-avatar.png" />
                    <PetDetails>
                        {isEditing ? (
                            <>
                                <Input name="name" value={editedPet.name} onChange={handleChange} />
                                <Input name="breed" value={editedPet.breed} onChange={handleChange} />
                            </>
                        ) : (
                            <>
                                <PetName>{pet?.name}</PetName>
                                <PetBreed>{pet?.breed}</PetBreed>
                            </>
                        )}
                    </PetDetails>
                    {isEditing ? (
                        <Button onClick={handleSave}>Save</Button>
                    ) : (
                        <Button onClick={handleEdit}><MdOutlineEdit /></Button>
                    )}
                </PetInfo>
            </Section>
        </Container>
    );
};


export default PetCard;