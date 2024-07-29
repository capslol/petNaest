import React, {FC, useEffect, useState} from 'react';
import {Pet, Plan} from "../types/data";
import DatePicker from "react-datepicker";
import {format} from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import {styled} from "styled-components";
import {Button, Column} from "../styles/styles";
import {FiPlus} from "react-icons/fi";
import {Input} from "@chakra-ui/react";
import {FaCheck} from "react-icons/fa";
import {getPet} from "../services/petService";
import {getPlan} from "../services/planService";
import {useQuery} from "@tanstack/react-query";
import {log} from "util";

interface PetPlansProps {
    pet: Pet | undefined

}


const PetPlans: FC<PetPlansProps> = ({pet}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
    const [newPlan, setNewPlan] = useState<Plan>({name: '', date:'', location: ''});

    const {data: plans, isLoading, isError} = useQuery<Plan[]>({
        queryKey: ['plansData'],
        queryFn: () => getPlan(pet?.id),
    });
    useEffect(()=> {
        console.log('pet plans mounted')
    }, [])



    const handleChangeDate = (date: Date | null) => {
        if (date) {
            setStartDate(date);
        }
        setIsCalendarOpen(false);
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        setIsCalendarOpen(true);
    };

    const handleAddPlan = () => {
        setIsAddPlanModalOpen((prevState) => !prevState)
    }

    const handleChangePlan = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlan({...newPlan, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        setIsAddPlanModalOpen(false);
    };


    return (
        <>
            <PlansHeader>
                <p>Планы с {pet?.name}</p>
                {isAddPlanModalOpen ? (
                    <>
                        <Input name="name" value={newPlan.name} onChange={handleChangePlan}/>
                        <Input name="location" value={newPlan.location} onChange={handleChangePlan}/>
                        <Column><Button onClick={handleSave}><FaCheck/></Button></Column>
                    </>
                ) : (
                    <Button onClick={handleAddPlan}><FiPlus /></Button>
                ) }

            </PlansHeader>
            <PlansList>
                <PlanItem>{ plans?.map(plan => plan.name)}</PlanItem>
                <div style={{display: "flex", justifyContent: "flex-end", flexDirection: "column"}}>
                    <button onClick={handleClick}
                            style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end",}}>
                        {format(startDate, "dd MMMM")}
                    </button>
                    {isCalendarOpen  && (
                        <DatePicker
                            selected={startDate}
                            onChange={handleChangeDate}
                            inline

                        />
                    )}
                </div>
            </PlansList>
        </>
    );
};

const PlansList = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
`;
const PlanItem = styled.div`
`;
const PlansHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default PetPlans;