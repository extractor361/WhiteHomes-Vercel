/**
 * It takes in a label and filterValues, and returns a dropdown menu with the options from the
 * InputForm array
 * @returns A dropdown menu with the options of the array in the InputForm.
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { InputForm } from "../../data/inputForm";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
const DropdownInputFields = ({ label, filterValues, setFilterValues, lg, sm, start, end, lastSm }) => {
  
  const {t}=useTranslation("common");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState("true");
  const inputFilter = useSelector((state) => state.inputsReducer);
useEffect(()=>{console.log(inputFilter)},[inputFilter]);
if(inputFilter.tip==t("Zemljište")){
  console.log("zemljiste")
  return (
    <>
    
  {InputForm.slice(`${start && start}`, `${end && end}`).filter((input)=>{if ( input.name==="spavaceSobe") {
    return false; // skip
  }
  return true}).map((value, i) => (
    
        <Col lg={lg || value.size} sm={sm ? sm : lastSm ? i > 1  && lastSm : ''} key={i}>
          <div className='form-group'>
            {t(label) && <label>{t(value.label)}</label>}
            <Dropdown
              isOpen={isOpen === t(value.label) ? true : false}
              toggle={function noRefCheck() {
                setIsOpen(t(value.label));
                isOpen === t(value.label) && setIsOpen();
              }}>

                {/*export const InputForm = [
  { name: "statusNekretnine", label: "Status Nekretnine", size: "12", options: ["Status Nekretnine", "Izdavanje", "Prodaja"] },
  { name: "tipNekretnine", label: "Tip Nekretnine", size: "12", options: ["Tip nekretnine", "Stan", "Kuća", "Poslovni prostor", "Zemljište","Vila"] },
  { name: "grad", label: "Grad", size: "6", options: ["Maks. Soba", 1, 2, 3, 4, 5, 6] },
  { name: "spavaceSobe", label: "Spavace Sobe", size: "6", options: ["Spavace Sobe", 1, 2, 3, 4] },
  { name: "kuptila", label: "Kupatila", size: "6", options: ["Kupatila", 1, 2, 3, 4] },
];*/}
              <DropdownToggle className="font-rubik" caret>
                {inputFilter[t(`${value.name}`)] || t(value.label)}
                <i className='fas fa-angle-down'></i>
              </DropdownToggle>
              <DropdownMenu>
                {value.options.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      filterValues = { ...filterValues, ...{ [t(`${value.name}`)]: t(`${option}`) } };
                      setIsOpen();
                    }}>
                    <DropdownItem
                      onClick={() => {
                        setFilterValues({ ...filterValues, ...{ [t(`${value.name}`)]: t(option) } });
                        dispatch({ type: `${value.name}`, payload: t(option)});
                      }}>
                      {t(option)}
                    </DropdownItem>
                  </div>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
      )) }
    </>
  );
}
else{return (<>{InputForm.slice(`${start && start}`, `${end && end}`).map((value, i) => (
  <Col lg={lg || value.size} sm={sm ? sm : lastSm ? i > 1  && lastSm : ''} key={i}>
    <div className='form-group'>
      {t(label) && <label>{t(value.label)}</label>}
      <Dropdown
        isOpen={isOpen === t(value.label) ? true : false}
        toggle={function noRefCheck() {
          setIsOpen(t(value.label));
          isOpen === t(value.label) && setIsOpen();
        }}>
        <DropdownToggle className="font-rubik" caret>
          {inputFilter[t(`${value.name}`)] || t(value.label)}
          <i className='fas fa-angle-down'></i>
        </DropdownToggle>
        <DropdownMenu>
          {value.options.map((option, i) => (
            <div
              key={i}
              onClick={() => {
                filterValues = { ...filterValues, ...{ [t(`${value.name}`)]: t(`${option}`) } };
                setIsOpen();
              }}>
              <DropdownItem
                onClick={() => {
                  setFilterValues({ ...filterValues, ...{ [t(`${value.name}`)]: t(option) } });
                  dispatch({ type: `${value.name}`, payload: t(option)});
                }}>
                {t(option)}
              </DropdownItem>
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  </Col>
)) }</>)}}

export { DropdownInputFields };
