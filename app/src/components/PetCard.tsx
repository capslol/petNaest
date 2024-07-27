import React, {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deletePet, getPet, updatePetData} from "../services/auth";
import {Box, Input, Spinner, useToast} from "@chakra-ui/react";
import {useAuth} from "../contexts/AuthContext";
import GoBackButton from "./GoBackButton";
import {Avatar, Button, colors, Column, Container, Header, mixins, Section} from "../styles/styles";
import {BsThreeDots} from "react-icons/bs";
import {styled} from "styled-components";
import {MdOutlineEdit} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import {Pet, Plan} from "../types/data";
import {RiDeleteBinLine} from "react-icons/ri";
import {FaCheck} from "react-icons/fa";
import {FiPlus} from "react-icons/fi";
import PetPlans from "./PetPlans";


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
    name?: string;
    breed?: string;
    plans?: Plan[];
}


const PetCard = () => {
    const {logout} = useAuth();
    const {petId: petIdString} = useParams<{ petId: string }>();
    const petId = petIdString ? parseInt(petIdString) : null;
    const queryClient = useQueryClient();
    const toast = useToast()
    const navigate = useNavigate()

    const [isEditing, setIsEditing] = useState(false);
    const [editedPet, setEditedPet] = useState<PetUpdateData>({id: petId ?? 0, name: '', breed: ''});

    const {data: pet, isLoading, isError} = useQuery<Pet>({
        queryKey: ['petData'],
        queryFn: () => getPet(petId),
    });

    const mutation = useMutation({
        mutationFn: updatePetData,
        onSuccess: (data) => {
            queryClient.setQueryData(['petData'], editedPet);
        },
    });


    const deleteMutation = useMutation({
        mutationFn: deletePet,
        onSuccess: () => {
            navigate(-1)
            queryClient.setQueryData(['petData'], petId);
            toast({
                title: 'Pet Deleted',
                description: 'The pet has been successfully deleted.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        onError: (error: Error) => {
            toast({
                title: 'Deletion Failed',
                description: 'Failed to delete the pet. Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });

    useEffect(() => {
        if (isError) {
            logout();
        }
    }, [isError, logout]);

    useEffect(() => {
        if (pet) {
            setEditedPet({id: pet.id, name: pet.name, breed: pet.breed});
        }
    }, [pet]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl"/>
            </Box>
        );
    }

    if (isError) {
        return null;
    }

    const handleEdit = () => {
        if (pet) {
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        mutation.mutate(editedPet)
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPet({...editedPet, [e.target.name]: e.target.value});
    };

    const handleDelete = () => {
        deleteMutation.mutate(petId)
    };


    return (
        <Container>
            <Header>
                <GoBackButton/>
                <h2>Pet Details</h2>
                <Button><BsThreeDots/></Button>
            </Header>
            <Section>
                <PetInfo>
                    <Avatar imageurl="img/dog-avatar.png"></Avatar>
                    {isEditing ? (
                        <>
                            <PetDetails>
                                <Input name="name" value={editedPet.name} onChange={handleChange}/>
                                <Input name="breed" value={editedPet.breed} onChange={handleChange}/>
                            </PetDetails>
                            <Column>
                                <Button onClick={handleSave}><FaCheck/></Button>
                                <Button onClick={handleDelete}> <RiDeleteBinLine/> </Button>
                            </Column>
                        </>
                    ) : ( // e
                        <>
                            <PetDetails>
                                <PetName>{pet?.name}</PetName>
                                <PetBreed>{pet?.breed}</PetBreed>
                            </PetDetails>

                            <>
                                <Button onClick={handleEdit}><MdOutlineEdit/></Button>
                            </>
                        </>
                    )}


                </PetInfo>
            </Section>

            <Section>


                <PetPlans pet={pet}/>


            </Section>
        </Container>
    );
};


export default PetCard;