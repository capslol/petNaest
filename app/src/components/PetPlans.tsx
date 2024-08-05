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
import {getPlan, updatePlan} from "../services/planService";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

interface PetPlansProps {
    pet: Pet | undefined

}


const PetPlans: FC<PetPlansProps> = ({pet}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState<{ [key: string]: boolean }>({});
    const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
    const [newPlan, setNewPlan] = useState<Plan>({name: '', date: '', location: '', id: -1});

    const queryClient = useQueryClient();


    const {data: plans, isLoading, isError} = useQuery<Plan[]>({
        queryKey: ['plansData'],
        queryFn: () => getPlan(pet?.id),
    });

    useEffect(() => {
        if (plans) {
            console.log(plans[0].date)
        }
    }, [plans])

    const convertToDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // Месяц в JavaScript начинается с 0
    };

    const mutationDate = useMutation({
        mutationFn:  updatePlan,
        onSuccess: (newPlan: Plan) => {
            queryClient.setQueryData(['plansData'], newPlan)
        }

    })


    const handleChangeDate = (planId: number, date: Date | null) => {
        if (date) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            console.log(formattedDate)
            console.log(typeof formattedDate)

            mutationDate.mutate({id: planId, date: formattedDate} )
        }
        setIsCalendarOpen(prevState => ({
            ...prevState,
            [planId]: false,
        }));
    };

    const handleClick = (planId: number) => {
        setIsCalendarOpen(prevState => ({
            ...prevState,
            [planId]: !prevState[planId],
        }));
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
                    <Button onClick={handleAddPlan}><FiPlus/></Button>
                )}

            </PlansHeader>
            <PlansList>
                <>
                    {plans?.map(plan => (
                        <PlanItem key={plan.id}>
                            <PlanName>{plan.name}</PlanName>
                            <CalendarIcon style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column" }}>
                                <button onClick={() => handleClick(plan.id)}
                                        style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                    {format(plan.date, "dd MMMM")}
                                </button>
                                {isCalendarOpen[plan.id] && (
                                    <DatePicker
                                        selected={convertToDate(plan.date)}
                                        onChange={(date) => handleChangeDate(plan.id, convertToDate(plan.date))}
                                        inline
                                    />
                                )}
                            </CalendarIcon>
                        </PlanItem>
                    ))}

                </>
            </PlansList>

        </>
    );
};

const PlansList = styled.div`
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;
const PlanItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5% 0;
`;
const PlanName = styled.div`
`;
const PlansHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CalendarIcon = styled.div`

`;

export default PetPlans;