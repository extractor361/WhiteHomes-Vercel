import { Field, Form, Formik } from 'formik';
import React from 'react'
import Dropzone from 'react-dropzone-uploader';
import { Button, Col, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { ReactstrapInput, ReactstrapSelect,ReactstrapRadio } from '../../utils/ReactStarpInputsValidation';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";

import axios from 'axios';
const AddPropertyForm = () => {
    const {t}=useTranslation("common");

    const [slikaaa,postaviSliku]=useState('');
    const [slikeee,postaviSlike]=useState([]);
    const ruter=useRouter();

    const [opcijee,postaviOpcije]=useState({status:[],tip:[],gradovi:[],drzave:[]});
    const getUploadParams = ({ file, meta }) => {
        const body = new FormData()
        body.append('slika', file)
        return { url: `/api/upload-sliku`, body }
      }
  useEffect(()=>{
    console.log(slikeee)
  },[slikeee])
    const handleChangeStatusSlika = ({ file }, status) => {
        if (status === 'done') postaviSliku(file.name);
        else if (status === 'removed') postaviSliku(prev => prev === file.name ? '' : prev);
    };
    const handleChangeStatusSlike = ({ file }, status) => {
        if (status === 'done') {
            postaviSlike(prev => prev.includes(file.name) ? prev : [...prev, file.name]);
        } else if (status === 'removed') {
            postaviSlike(prev => prev.filter(name => name !== file.name));
        }
    };
    
    // receives array of files that are done uploading when submit button is clicked
 
useEffect(()=>{
    console.log(opcijee)
},[opcijee]);
    
    const opcije=async()=>await axios(`/api/opcijeNekretnina`);

    useEffect(()=>{
        opcije().then(x=>{
            postaviOpcije({...opcijee,...x.data})});

    },[])
    const uploadSlike= (podaci) => {
    
        const podacii= new FormData(); 
        for(let i=0; i<podaci.length;i++){
            console.log(podaci)
          podacii.append("slike", podaci[i]);}//add image to form object
        console.log(podacii.getAll("slike"))
        axios({
          method: "post",
          url: `/api/upload-slike`,
          data: podacii,  //send image to server
        })
         .then((odgovor) => {
          const { data } = odgovor; 

    
      
        })
         .catch((greska) => {
          console.log(greska);
        });
      }

    return (
        <Formik
            initialValues={{
                naziv:"",
                tipNekretnine: "",
                statusNekretnine: "",
                spavaćeSobe: "",
                kupatila: "",
                površina: "",
                površinaPlaca:"",
                cijena: "",
                opis: "",
                adresa: "",
                država: "",
                slike:[],
                grad: "",
                slika:"",
                odabrana:false,
                imePrezime:"",
                email:"",
                kontakt:"",
               
            }}
            validationSchema={Yup.object().shape({
                naziv:Yup.string().required(t('Molimo vas upišite naziv nekretnine')),
                tipNekretnine: Yup.string().required(t('Molimo vas izaberite tip nekretnine')),
                statusNekretnine: Yup.string().required(t('Molimo vas izaberite status nekretnine')),
                cijena: Yup.number().typeError(t("Molimo vas unesite cijenu nekretnine(broj)")),
                površina: Yup.number().typeError(t("Molimo vas unesite broj")).required(t('Molimo vas unesite površinu nekretnine')),
                opis: Yup.string().required(t("Molimo vas unesite opis nekretnine")),
                adresa: Yup.string().required(t("Molimo vas unesite adresu/naselje nekretnine")),
                država: Yup.string().required(t("Molimo vas izaberite državu nekretnine")),
                grad: Yup.string().required(t("Molimo vas izaberite grad nekretnine")),
                površinaPlaca:Yup.number().typeError(t("Molimo vas unesite broj")),
                imePrezime: Yup.string().required(t('Molimo vas unesite vaše ime i prezime')),
                email: Yup.string().email().typeError(t("Forma emaila nije validna.")).required(t('Molimo vas upišite vaš email')),
                kontakt: Yup.string().matches(/^[0-9]{9,11}$/, t('Broj telefona nije validan.')).required(t('Molimo vas upišite kontakt telefon')),

            })}
            onSubmit={(values) => {
                console.log('aaa')
                values.slika=slikaaa;
                values.slike=[...slikeee];

                console.log(values)
                axios.post(`/api/sacuvajNekretninuKorisnik`, {
                    unos:values
                  })
                  .then(function (response,error) {
                    if(response){
                    postaviSlike([]);

                    if(response.data=="Korisnik sa unijetim podacima već postoji."){
                        toast.error(t("Korisnik sa unijetim e-adresom već postoji."));
                    }
                  else{
                    toast.success(t("Vaši podaci su uspješno sačuvani i poslati administratoru."));
                    
                    axios.post("/api/zahtjevNekretnine",{to:values.email,subject:`Zahtjev za ulistavanje nekretnine - klijent: ${values.imePrezime}`,message:`<strong>Zahtjev za ulistavanje nekretnine.</strong><br/><strong>Korisnik</strong>: ${values.imePrezime}<br/><strong>Kontakt broj korisnika</strong>: ${values.kontakt}<br/><strong>Email Korisnika</strong>: ${values.email}<br/><strong>Naziv nekretnine</strong>: ${values.naziv}<br/><strong>Opis nekretnine<strong/>: ${values.opis}`}).then(res=>console.log(res.data)).catch(err=>console.log(err))
                    setTimeout(()=>{ruter.push("/nekretnine")},1000);

                  }}
                else{console.log(error)}}).catch(err=>console.log(err))
            }}
            render={() => (
                <Form>
                    <Row className="gx-3">
                    <Col sm="4" className="form-group">
                            <Field name="naziv"  component={ReactstrapInput} className="form-control" placeholder={t("Dvosoban stan..")} label={t("Naziv nekretnine")} />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="tipNekretnine" inputprops={{ options: opcijee.tip.map(x=>t(x)), defaultOption: t("Tip Nekretnine") }} component={ReactstrapSelect} className="form-control" placeholder="villa" label={t("Tip Nekretnine")} />
                        </Col>

                        <Col sm='4' className="form-group">
                            <Field name="statusNekretnine" component={ReactstrapSelect} className="form-control" label={t("Status Nekretnine")}
                                inputprops={{ options: opcijee.status.map(x=>t(x)), defaultOption: t("Status Nekretnine") }}
                            />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="cijena" type="text" className="form-control" component={ReactstrapInput} label={t("Cijena Nekretnine")} placeholder="€5000" />
                        </Col>
                        <Col sm="4" className="form-group">
                                <Field name="država" component={ReactstrapSelect} className="form-control" label={t("Država")}
                                    inputprops={{ options: opcijee.drzave, defaultOption: "Država" }}
                                />
                            </Col>
                            <Col sm="4" className="form-group">
                                <Field name="grad" component={ReactstrapSelect} className="form-control" label={t("Grad")}
                                    inputprops={{ options: opcijee.gradovi, defaultOption: "Grad" }}
                                />
                            </Col>
                            <Col sm="4" className="form-group">
                            <Field name="površina" type="text" className="form-control" component={ReactstrapInput} label={t("Površina")} placeholder="85 m2" />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="površinaPlaca" type="text" className="form-control" component={ReactstrapInput} label={t("Površina placa")} placeholder="155 m2" />
                        </Col>
                        <Col sm="4" className="form-group">
                                <Field type="text" name="adresa" component={ReactstrapInput} className="form-control" label={t("Adresa")} placeholder={t("Adresa vaše nekretnine")} />
                            </Col>
                        <Col sm="4" className="form-group">
                            <Field name="spavaćeSobe" component={ReactstrapSelect} className="form-control" label={t("Spavaće Sobe")}
                                inputprops={{ options: ["1", "2", "3", "4", "5", "6"], defaultOption: t("Broj soba") }}
                            />
                        </Col>
                        <Col sm="4" className="form-group">
                            <Field name="kupatila" component={ReactstrapSelect} className="form-control" label={t("Kupatila")}
                                inputprops={{ options: ["1", "2", "3", "4", "5", "6"], defaultOption: "" }}
                            />
                            
                        </Col>
                     
                          
                        
                       
                       
                        <Col sm="12" lg="12" className="form-group">
                            <Field type="textarea" name="opis" placeholder={t("Unesite opis nekretnine..")} component={ReactstrapInput} className="form-control" rows={4} label={t("Opis")} />
                        </Col>
                        <Col sm="12" lg="4" className="form-group">
                            <Field type="text" name="imePrezime" placeholder={t("Unesite vaše ime i prezime")} component={ReactstrapInput} className="form-control" rows={4} label={t("Ime I prezime")} />
                        </Col>
                        <Col sm="12" lg="4" className="form-group">
                            <Field type="text" name="email" placeholder={t("Unesite vaš email")} component={ReactstrapInput} className="form-control" rows={4} label="EMail" />
                        </Col>
                        <Col sm="12" lg="4" className="form-group">
                            <Field type="text" name="kontakt" placeholder={t("Unesite kontakt broj")} component={ReactstrapInput} className="form-control" rows={4} label={t("Kontakt telefon")} />
                        </Col>
                    </Row>
                   
                            
                         
                          
                    <div className="dropzone-admin form-inputs">
                        <h6>{t("Odabrana slika")}</h6>
                        <div className="dropzone">
                            <div className="dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <Dropzone
                                id="jedna-slika"
                                    multiple={false}
                                    getUploadParams={getUploadParams}
                                    onChangeStatus={handleChangeStatusSlika}
                                    submitButtonContent="Otpremi sliku"
                                    accept="image/*,audio/*,video/*"
                                    
                                    inputContent={t("Izaberi sliku")}
                                    styles={{
                                        dropzoneActive: { borderColor: "green" },
                                    }}
                                />
                            </div>
                            
                        </div></div>
                        <div className="dropzone-admin form-inputs">

                        <h6>{t("Slike za galeriju")}</h6>
                        <div className="dropzone" id="multiFileUpload">
                            <div className="dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <Dropzone
                                id="jedna-slika"
                                    multiple={true}
                                    getUploadParams={getUploadParams}
                                    onChangeStatus={handleChangeStatusSlike}
                                    submitButtonContent="Otpremi sliku"
                                    accept="image/*,audio/*,video/*"
                                    
                                    inputContent="Izaberi slike za galeriju"
                                    styles={{
                                        dropzoneActive: { borderColor: "green" },
                                    }}
                                />
                            </div>
                            </div>
                        </div>
                        <Row className="gx-3">
                            
                         
                            <Col sm='12' className="form-btn">
                            <Button type="submit" className="btn btn-gradient btn-pill">{t("Sačuvaj")}</Button>
                                <Button type="submit" className="btn btn-dashed btn-pill">{t("Odbij")}</Button>
                            </Col>
                        </Row>
                </Form>
            )}
        />
    )
}

export default AddPropertyForm