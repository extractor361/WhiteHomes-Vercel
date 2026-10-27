/**
 * It takes in a label and filterValues, and returns a dropdown menu with the options from the
 * InputForm array
 * @returns A dropdown menu with the options of the array in the InputForm.
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Label } from "reactstrap";
import { InputForm } from "../../data/inputForm";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
const TextInputField = ({ label, filterValues, setFilterValues, lg, sm, lastSm, colorLabel,color }) => {
  const {t}=useTranslation("common");

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState("true");
  const inputFilter = useSelector((state) => state.inputsReducer);
useEffect(()=>{console.log(inputFilter)},[inputFilter]);
  return (
    <>
    
  
    
        <Col lg={lg} sm={sm ? sm : lastSm ? 2 > 1  && lastSm : ''} >
          <div className='form-group'>
            <label style={{color: colorLabel,
    marginBottom: 16,
    marginTop: 7,

    fontWeight: 600}}>{t("Pretraži pojam")}</label>
          <Input className="input" style={{padding:"8px 20px 6px",fontSize:14,background:"transparent",color:color}}  placeholder={t("Pretraži pomoću ključne riječi")} type="text" name="pretraga" value={inputFilter.pretraga || ""} aria-label={t("Pretraži pojam")}
                      onChange={(e) => {
                        setFilterValues({ ...filterValues, ...{ [`${e.target.name}`]: e.target.value } });
                        dispatch({ type: `${e.target.name}`, payload: e.target.value });
                      }}/>
                    
                
          </div>
        </Col>
   
    </>
  );}


export { TextInputField };
