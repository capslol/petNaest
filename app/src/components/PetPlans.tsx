import React, {FC, useEffect, useState} from 'react';
import {Pet} from "../types/data";
import DatePicker from "react-datepicker";
import {format} from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import {styled} from "styled-components";

interface PetPlansProps {
    pet: Pet | undefined
}

const PlansList = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
`;
const Plan = styled.div`
`;
const PetPlans: FC<PetPlansProps> = ({pet}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);


    const handleChange = (date: Date | null) => {
        if (date) {
            setStartDate(date);
        }
        setIsOpen(false);
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <>
            <PlansList>

                <Plan>{ pet?.plans && pet?.plans.map(plan => plan.name)}</Plan>
                <div style={{display: "flex", justifyContent: "flex-end", flexDirection: "column"}}>
                    <button onClick={handleClick}
                            style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end",}}>
                        {format(startDate, "dd MMMM")}
                    </button>
                    {isOpen && (
                        <DatePicker
                            selected={startDate}
                            onChange={handleChange}
                            inline

                        />
                    )}
                </div>
            </PlansList>
        </>
    );
};

export default PetPlans;