import React, {useEffect, useState} from 'react';
import { Pet } from "../types/data";
import styled from "styled-components";
import { colors } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createPet, getPets} from "../services/petService";
import {
    Spinner,
    Box,
    Text,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton, ModalBody, Input, ModalFooter, Button
} from "@chakra-ui/react"; // Добавлен Box и Text для отображения ошибки

const PetListWrapper = styled.div`
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
  cursor: pointer;
`;

const AddPet = styled(PetItem)`
  background-color: ${colors.lightYellow};
  color: ${colors.yellow};
  border: 1px dashed ${colors.yellow};
`;

const PetName = styled.span`
  font-size: 16px;
  position: absolute;
  bottom: -40%;
`;

const PetList = () => {

    const toast = useToast()
    const queryClient = useQueryClient()

    const [showAddPetPopup, setShowAddPetPopup] = useState(false); // Состояние для отслеживания отображения попапа
    const [newPetName, setNewPetName] = useState(''); // Состояние для хранения имени нового питомца
    const [newPetBreed, setNewPetBreed] = useState(''); // Состояние для хранения породы нового питомца


    const { data: pets, isLoading, isError, error } = useQuery<Pet[]>({
        queryKey: ['petsData'],
        queryFn: getPets,
    });


    const mutate = useMutation({
        mutationFn: createPet,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['petsData']
            });
            toast({
                status: "success",
                title: "Pet Added",
                description: "A new pet has been successfully added.",
                duration: 5000,
                isClosable: true,
            });
        }
    })


    const navigate = useNavigate();

    const handlePetClick = (petId: number) => {
        navigate(`/petCard/${petId}`);
    };
    if (isError) {
        toast({
            status: "error",
            title: "Error loading pets data",
            description: "Please try again later.",
            duration: 9000,
            isClosable: true,
        });
    }
    const handleAddPetClick = () => {
        setShowAddPetPopup(true);
    };
    const handleAddPetClose = () => {
        setShowAddPetPopup(false);
        // Очищаем введенные данные
        setNewPetName('');
        setNewPetBreed('');
    };

    const handleAddPetSubmit = () => {
        mutate.mutate({ name: newPetName, breed: newPetBreed });
        handleAddPetClose();
    };


    return (
        <PetListWrapper>
            <AddPet onClick={handleAddPetClick}>+</AddPet>
            {isError ? (
                <Box>
                    {error.message}
                </Box>
            ) : isLoading ? (
                <Spinner size="xl"/>
            ) : (
                pets?.map((pet: Pet) => (
                    <PetItem onClick={() => handlePetClick(pet.id)} key={pet.id}>
                        🐶<PetName>{pet.name}</PetName>
                    </PetItem>
                ))
            )}
            {/* Попап для добавления нового питомца */}
            <Modal isOpen={showAddPetPopup} onClose={handleAddPetClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Pet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb="4">Enter the name and breed of the new pet:</Text>
                        <Input placeholder="Name" value={newPetName} onChange={(e) => setNewPetName(e.target.value)} />
                        <Input mt="4" placeholder="Breed" value={newPetBreed} onChange={(e) => setNewPetBreed(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddPetSubmit}>
                            Add
                        </Button>
                        <Button onClick={handleAddPetClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </PetListWrapper>
    );
};

export default PetList;
