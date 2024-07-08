import React, {useEffect, useState} from 'react';
import { Input } from "@chakra-ui/react";
import GoBackButton from "./GoBackButton";
import { Avatar, Button, Column, Container, Header, Section } from "../styles/styles";
import { BsThreeDots } from "react-icons/bs";
import { styled } from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import PetPlans from "./PetPlans";
import { useUnit } from "effector-react";
import { $currentPet, deletePetFx, getPetFx, updatePetDataFx } from "../store/userStore";
import {Pet, PetUpdateData} from "../types/data";

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

const PetAge = styled.p`
  font-size: 14px;
  margin: 0;
  color: #888;
`;

const PlansHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



const PetCard = () => {
    const { petId: petIdString } = useParams<{ petId: string }>();
    const petId = petIdString ? parseInt(petIdString) : undefined;

    const [isEditing, setIsEditing] = useState(false);
    const [editedPet, setEditedPet] = useState<Partial<Pet>>({});

    const pet = useUnit($currentPet);

    const navigate = useNavigate()

    useEffect(() => {
        if(petId){
            getPetFx(petId);
        }
    }, [petId]);

    useEffect(() => {
        if (pet) {
            setEditedPet(pet);
        }
    }, [pet]);

    const handleEdit = () => {
        if (pet) {
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        if (!pet) return;
            await updatePetDataFx(editedPet);
            setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPet(prev => ({ ...prev, [name]: value }));
    };

    const handleDelete = async () => {
        await deletePetFx(petId);
        navigate('/')
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
                    <Avatar imageurl="img/dog-avatar.png"></Avatar>
                    <PetDetails>
                        {isEditing ? (
                            <>
                                <Input name="name" value={editedPet?.name || ''} onChange={handleChange} />
                                <Input name="breed" value={editedPet?.breed || ''} onChange={handleChange} />
                                <Input name="age" value={editedPet?.age || ''} onChange={handleChange} />
                            </>
                        ) : (
                            <>
                                <PetName>{pet?.name}</PetName>
                                <PetBreed>{pet?.breed}</PetBreed>
                                <PetAge>{pet?.age}</PetAge>
                            </>
                        )}
                    </PetDetails>
                    {isEditing ? (
                        <Column>
                            <Button onClick={handleSave}><FaCheck /></Button>
                            <Button onClick={handleDelete}> <RiDeleteBinLine /> </Button>
                        </Column>
                    ) : (
                        <Button onClick={handleEdit}><MdOutlineEdit /></Button>
                    )}
                </PetInfo>
            </Section>
            <Section>
                <PlansHeader>
                    <p>Планы с {pet?.name}</p>
                    <Button><FiPlus /></Button>
                </PlansHeader>
                <PetPlans pet={pet} />
            </Section>
        </Container>
    );
};

export default PetCard;
