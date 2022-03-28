import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Collapse, Container, Form, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import ChangepassForm from "../../components/ChangepassForm";
import Overlay from "../../components/Overlay";
import "./UserAboutPost.css";


const UserAboutPost = (props) => {

  const userId = useParams()
  console.log(typeof userId.userId)

  props.triggerCheckLoggedIn();


  // const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(false);
  const [publish, setPublish] = useState(false);
  const [date, setDate] = useState(true);
  const [workingdate, setWorkingdate] = useState(true);
  const [trainingdate, setTrainingdate] = useState(true);
  const [seminerdate, setSeminerdate] = useState(true);


  const [random, setRandom] = useState(false);

  // states for multiple input fields
  const [nidInputCount, setNidInputCount] = useState([randomText()]);
  const [ielts_score, setIelts_score] = useState([randomText()]);
  const [emailField, setEmailField] = useState([randomText()]);
  const [numberField, setNumberField] = useState([randomText()]);
  const [areaResearchField, setAreaResearchField] = useState([randomText()]);
  const [keyResearchField, setKeyResearchField] = useState([randomText()]);
  const [pubYearField, setPubYearField] = useState([randomText()]);
  const [summaryField, setSummaryField] = useState([randomText()]);
  const [thoughtField, setThoughtField] = useState([randomText()]);
  const [bookPubYearField, setBookPubYearField] = useState([randomText()]);
  const [keyWorkingSkillField, setKeyWorkingSkillField] = useState([randomText()]);
  const [careerObjectPlanField, setCareerObjectPlanField] = useState([randomText()]);
  const [areaWorkInterestField, setAreaWorkInterestField] = useState([randomText()]);
  const [workingHistoryField, setWorkingHistoryField] = useState([randomText()]);
  const [techSkillField, setTechSkillField] = useState([randomText()]);
  const [otherSkillField, setOtherSkillField] = useState([randomText()]);
  const [academicDescipline, setAcademicDescipline] = useState([randomText()]);
  const [academicAchievement, setAcademicAchievement] = useState([randomText()]);
  const [academicDegree, setAcademicDegree] = useState([randomText()]);
  const [training, setTraining] = useState([randomText()]);
  const [workshop, setWorkshop] = useState([randomText()]);
  const [otherWorkshop, setOtherWorkshop] = useState([randomText()]);

  // states for form data input
  const [fathersName, setFathersName] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInch, setHeightInch] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [weightGm, setWeightGm] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [nationality, setNationality] = useState('');
  const [nid, setNid] = useState({});
  const [religion, setReligion] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [listning, setListning] = useState('Excellent');
  const [speaking, setSpeaking] = useState('Excellent');
  const [reading, setReading] = useState('Excellent');
  const [writing, setWriting] = useState('Excellent');
  const [ielts_name, setIelts_name] = useState('');
  const [score, setScore] = useState('');
  const [location, setLoacation] = useState('');
  const [country, setCountry] = useState('');
  const [parmanentAddress, setParmanentAddress] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [number, setNumber] = useState('');
  const [areaResearchInterest, setAreaResearchInterest] = useState({});
  const [keyResearchSkill, setKeyResearchSkill] = useState({});
  
  const [urlLink, setUrlLink] = useState('');
  const [articleName, setArticleName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [journalName, setJournalName] = useState('');
  const [publisherYear, setPublisherYear ] = useState('');
  const [publisherName, setPublisherName] = useState('');

  const [informationLink, setInformationLink ] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndtDate] = useState('');
  
  const [summary, setSummary] = useState('');
  
  const [thought, setThought] = useState('');
  const [bookPubUrl, setBookPubUrl] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorsName, setAuthorsName] = useState('');
  const [pubName, setPubName] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [keyWorkingSkill, setKeyWorkingSkill] = useState('');
  const [careerObjectPlans, setCareerObjectPlans] = useState('');
  const [areaOfWorkInterest, setAreaOfWorkInterest] = useState('');
  
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [instituition, setInstituition] = useState('');
  const [workingStartDate, setWorkingStartDate] = useState('');
  const [workingEndtDate, setWorkingEndDate] = useState('');
  
  const [techSkill, setTechSkill] = useState('');
  const [otherSkill, setOtherSkill] = useState('');
  
  const [academicDesciplines, setAcademicDesciplines] = useState('');
  const [academicAchievements, setAcademicAchievements] = useState('');
  const [educationInstution, setEducationInstitution] = useState('');
  const [educationYear, setEducationYear] = useState('');
  const [academicDegrees, setAcademicDegrees] = useState('');
  const [educationDepartment, setEducationDepartment] = useState('');
  const [institution2, setInstitution] = useState('');
  const [educationStartDate, setEducationStartDate] = useState('');
  const [educationEndDate, setEducationEndDate] = useState('');
  const [trainingName, setTrainingName] = useState('');
  const [trainingInstution, setTrainingInstution] = useState('');
  const [trainingStartDate, setTrainingStartDate] = useState('');
  const [trainingEndDate, setTrainingEndDate] = useState('');
  const [workShopName, setWorkshopName] = useState('');
  const [workshopInstution, setWorkshopInstution] = useState('');
  const [workshopStartDate, setWorkshopStartDate] = useState('');
  const [workshopEndDate, setWorkshopEndDate] = useState('');
  const [otherAchievement, setOtherAchievement] = useState('');
  const [otherYear, setOtherYear] = useState('');

  // states for multiple inputs
  const [combinedNid, setCombinedNid] = useState([]);


  // states for initial data fetch operations 
  const [generalInfo, setGeneralInfo] = useState({});
  const [language, setLanguage] = useState([]);
  const [languageScore, setLanguageScore] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [researchSkill, setResearchSkill] = useState([]);
  const [researchArticle, setResearchArticle] = useState([]);
  const [researchWork, setResearchWork] = useState([]);
  const [summarySection, setSummarySection] = useState([]);
  const [thoughtSection, setThoughtSection] = useState([]);
  const [workingHistory, setWOrkingHistory] = useState([]);
  const [academicDiscipline, setAcademicDiscipline] = useState([]);
  const [academicDegreeInit, setAcademicDegreeInit] = useState([]);
  const [trainingInit, setTrainingInit] = useState([]);
  const [workShopInit, setWorkShopInit] = useState([]);

  // other functions 
  function randomText() {
    const random = (Math.random() + 1).toString(36).substring(7);
    return random;
  }



  // functions for handling the feature of adding multiple input fields
  function addNidInput() {
    setNidInputCount([...nidInputCount, randomText()]);
  }

  
  
  function addScore() {
    setIelts_score([...ielts_score, randomText()]);
  }
  
  function addEmailField() {
    setEmailField([...emailField, randomText()]);
  }
  
  function addNumberField() {
    setNumberField([...numberField, randomText()]);
  }
  
  function addAreaResearchField() {
    setAreaResearchField([...areaResearchField, randomText()]);
  }
  
  function addKeyResearchField() {
    setKeyResearchField([...keyResearchField, randomText()]);
  }
  
  function addPubYearField() {
    setPubYearField([...pubYearField, randomText()]);
  }
  
  function addSummaryField() {
    setSummaryField([...summaryField, randomText()]);
  }
  
  function addThoughtField() {
    setThoughtField([...thoughtField, randomText()]);
  }
  
  function addBookPubYearField() {
    setBookPubYearField([...bookPubYearField, randomText()]);
  }
  
  function addKeyWorkingSkillField() {
    setKeyWorkingSkillField([...keyWorkingSkillField, randomText()]);
  }
  
  function addCareerObjectPlanField() {
    setCareerObjectPlanField([...careerObjectPlanField, randomText()]);
  }
  
  function addAreaWorkingInterestField() {
    setAreaWorkInterestField([...areaWorkInterestField, randomText()]);
  }
  
  function addWorkingHistoryField() {
    setWorkingHistoryField([...workingHistoryField, randomText()]);
  }
  
  function addTechSkillField() {
    setTechSkillField([...techSkillField, randomText()]);
  }
  
  function addOtherSkillField() {
    setOtherSkillField([...otherSkillField, randomText()]);
  }
  
  function addAcademicDesciplineField() {
    setAcademicDescipline([...academicDescipline, randomText()]);
  }
  
  function addAcademicAchievementField() {
    setAcademicAchievement([...academicAchievement, randomText()]);
  }
  
  function addAcademicDegreeField() {
    setAcademicDegree([...academicDegree, randomText()]);
  }
  
  function addTrainingField() {
    setTraining([...training, randomText()]);
  }
  
  function addWorkshopField() {
    setWorkshop([...workshop, randomText()]);
  }
  
  function addOtherWorkshopField() {
    setOtherWorkshop([...otherWorkshop, randomText()]);
  }
  
  // console.log(areaResearchInterest)

  function removeInput(id, state, setState) {
    let updatedArray;
    for (var i = 0; i < state.length; i++) {
      updatedArray = state.filter(item => item !== id)
      setState(updatedArray);
    }
  }
  

  const handleMultipleInput = (event, state, setState) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    })
  }
  

  const [showChangepass, setShowChangepass] = useState(false);
  
  function toggleShowChangePass() {
    setShowChangepass(!showChangepass);
  }

  const header = {
    mode: 'cors',
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem('auth_token')}`
    },
    // body: JSON.stringify({
    //     email: mailForVerification,
    //     verification_code: verificationCode,
    //     password: newPassWord
    // })
  };


  // update user GeneralInformation
  // group about update 
  const updateUserGeneralInfoHeader = {
    // mode: 'no-cors',
    method: 'PATCH',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      height_feet:  heightFeet? heightFeet :  generalInfo.height_feet, 
      height_inch:  heightInch? heightInch :  generalInfo.height_inch, 
      weight_kg:  weightKg? weightKg :  generalInfo.weight_kg, 
      weight_gm: weightGm? weightGm :  generalInfo.weight_gm,
      blood_group:  bloodGroup? bloodGroup :  generalInfo.blood_group,
      marital_status: maritalStatus? maritalStatus :  generalInfo.marital_status ,
      nationality: nationality? nationality :  generalInfo.nationality ,
      nid_number:  nid? nid :  generalInfo.nid_number,
      fathers_name: fathersName? fathersName :  generalInfo.fathers_name ,
      mothers_name:  mothersName? mothersName :  generalInfo.mothers_name,
      religion:  religion? religion :  generalInfo.religion,
      native_language:  nativeLanguage? nativeLanguage :  generalInfo.native_language
    })
};

const updateUserGeneralInfo = () =>{
    // e.preventDefault();
    console.log(localStorage.getItem('auth_token'), "I am here for update")
    console.log(updateUserGeneralInfo)
    // e.preventDefault();

    fetch(`http://127.0.0.1:8000/user/user-general-info-update/${localStorage.getItem('id')}`, updateUserGeneralInfoHeader)
      .then(response => {response.json()
          if (response.status===200) {
            console.log("okay")
            fetch(`http://127.0.0.1:8000/user/user-general-info/${userId.userId}`, header)
            .then(response => response.json())
            .then(data => { setGeneralInfo(data);
            })
          }
      })
      .catch(error => console.log(error))
}



  
  useEffect(() => {
      console.log(random);
      console.log('use effect running')

      fetch(`http://127.0.0.1:8000/user/user-general-info/${userId.userId}`, header)
      // fetch(urlObj[url], header)
        .then(response => response.json())
        .then(data => { setGeneralInfo(data);
        })

        
        // fetch for language
        fetch(`http://127.0.0.1:8000/user/user-language-proficiency/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setLanguage(data);
          // data.map(item => {
          //   for (var x in item) {
          //     sessionStorage.setItem(x, item[x])
          //   }
          // })
        })
        
        // fetch for language
        fetch(`http://127.0.0.1:8000/user/user-language-score/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setLanguageScore(data);
          // data.map(item => {
          //   // console.log(data)
          //   for (var x in item) {
          //     sessionStorage.setItem(x, item[x])
          //   }
          // })
        })
        
        // fetch for contact info
        fetch(`http://127.0.0.1:8000/user/user-contact-info/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setContactInfo(data);})
        
        
        // fetch for research skill
        fetch(`http://127.0.0.1:8000/user/user-research-skill/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setResearchSkill(data);})
        
        
        // fetch for research article
        fetch(`http://127.0.0.1:8000/user/user-research-article/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setResearchArticle(data);})
        
        
        // fetch for research work
        fetch(`http://127.0.0.1:8000/user/user-research-work/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setResearchWork(data);})
        
        
        // fetch for summary section
        fetch(`http://127.0.0.1:8000/user/user-research-summary/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setSummarySection(data);})
        
        
        // fetch for thought section
        fetch(`http://127.0.0.1:8000/user/user-research-thoughts/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setThoughtSection(data);})
        
        // fetch for working history
        fetch(`http://127.0.0.1:8000/user/user-working-history/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setWOrkingHistory(data);})
        
        // fetch for academic discipline
        fetch(`http://127.0.0.1:8000/user/user-academic-discipline/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setAcademicDiscipline(data);})
        
        // fetch for academic degree
        fetch(`http://127.0.0.1:8000/user/user-academic-degree/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setAcademicDegreeInit(data);})
        
        // fetch for training
        fetch(`http://127.0.0.1:8000/user/user-training/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setTrainingInit(data);})
        
        // fetch for workshop
        fetch(`http://127.0.0.1:8000/user/user-workshop-or-seminar/${localStorage.getItem('id')}`, header)
        .then(response => response.json())
        .then(data => { setWorkShopInit(data);})



  }, [random])

  // console.log(generalInfo[height])
  // console.log(workingHistory);

  return (
    <Container className=" accordion_custom_div" style={{"padding-top": "69px"}} >
      {showChangepass && <ChangepassForm toggle={toggleShowChangePass} />}
      {showChangepass && <Overlay />}
      <Accordion alwaysOpen className="mb-5">
        <Accordion.Item eventKey="0" className="my-1 Small accordion_custom_bg" > 
          <Accordion.Header>
            <Row>
              <div>
                <small className=" ">
                  <b> General Information</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
          { userId.userId!==localStorage.getItem('id')  && <Row>
              
            <div class="row mt-3">
                  
                  <div className="col-sm-2">
                    <b>Father's Name</b>
                  </div>                  
                  <div class="col-sm-10">
                    <p>{generalInfo.fathers_name}</p>
                  </div>
                </div>
                 <div class="row mt-3">
                  
                  <div className="col-sm-2">
                    <b>Mother's Name</b>
                  </div>                  
                  <div class="col-sm-10">
                    <small>{generalInfo.mothers_name}</small>
                  </div>
                </div>
                <div class="row mt-3 ">
                  
                  <div className="col-sm-2">
                    <b>Height</b>
                  </div>                 
                  <div class="col-sm-5 mb-2">
                    <small>{generalInfo.height_feet} FT</small>
                  </div>
                  <div class="col-sm-5">
                    <small>{generalInfo.height_inch} Inch</small>
                  </div>
                </div>
               <div class="row mt-3">
                  
                  <div className="col-sm-2">
                    <b>Weight</b>
                  </div>                 
                  <div class="col-sm-5 mb-2">
                    <small>{generalInfo.weight_kg} Kg</small>
                  </div>
                  <div class="col-sm-5">
                    <small>{generalInfo.weight_gm} gm</small>
                  </div>
                </div>
                <div class="row mt-3">
                 
                  <div className="col-sm-2">
                    <b>Martial Status</b>
                  </div>                 
                  <div class="col-sm-10">
                    <small>{generalInfo.marital_status}</small>
                  </div>
                </div>
                <div class="row mt-3">
                 
                  <div className="col-sm-2">
                    <b>Blood Group</b>
                  </div>                 
                  <div class="col-sm-10">
                    <small>{generalInfo.blood_group}</small>
                  </div>
                </div>
                <div class="row mt-3">
                
                  <div className="col-sm-2">
                    <b>Nationality</b>
                  </div>                 
                  <div class="col-sm-10">
                    <small>{generalInfo.nationality}</small>
                  </div>
                </div>
                 <div class="row mt-3">
                  
                  <div className="col-sm-2">
                    <b>Religion</b>
                  </div>                 
                  <div class="col-sm-10">
                    <small>{generalInfo.religion}</small>
                  </div>
                </div>
               <div class="row mt-3">
                  <div className="col-sm-2">
                    <b>Native Language</b>
                  </div>                 
                  <div class="col-sm-10">
                    <small>{generalInfo.native_language}</small>
                  </div>
                </div>
                
                 {/* <div class="form-group row mt-3"> 
                  <label for="staticEmail" class="col-sm-2 col-form-label">NID/Birth-Certificate or Others National Identity Number</label>
                  <div class="col-sm-10">
                    <small>{generalInfo.nid_number}</small>
                  </div>
           
                </div>  */}
              </Row>}
            
              { userId.userId===localStorage.getItem('id')  && <Row> <form>
              <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Father's Name
                  </label>
                  <div class="col-sm-10">
                    <input onBlur={event => setFathersName(event.target.value)} defaultValue={generalInfo.fathers_name} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Mother's Name
                  </label>
                  <div class="col-sm-10">
                    <input defaultValue={generalInfo.mothers_name} onChange={event => setMothersName(event.target.value)} type="text" class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3 ">
                  
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Height
                  </label>
                  <div class="col-sm-5 mb-2">
                    <input
                      onChange={event => setHeightFeet(event.target.value)} 
                      defaultValue={generalInfo.height_feet}
                      type="number"
                      class="form-control"
                      id=""
                      placeholder="ft"
                    />
                  </div>
                  <div class="col-sm-5">
                    <input
                    onChange={event => setHeightInch(event.target.value)}
                    defaultValue={generalInfo.height_inch}
                      type="number"
                      readonly
                      class="form-control"
                      id=""
                      placeholder={sessionStorage.height ? `${sessionStorage.getItem('height')} inch` : "Inch"}
                    />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Weight
                  </label>
                  <div class="col-sm-5 mb-2">
                    <input
                    onChange={event => setWeightKg(event.target.value)}
                    defaultValue={generalInfo.weight_kg}
                      type="number"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Kg"
                    />
                  </div>
                  <div class="col-sm-5">
                    <input
                    onChange={event => setWeightGm(event.target.value)}
                    defaultValue={generalInfo.weight_gm}
                      type="number"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Gm"
                    />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Martial Status
                  </label>
                  <div class="col-sm-10">
                    <Form.Select onChange={event => setMaritalStatus(event.target.value)} defaultValue={generalInfo.marital_status}>
                      {generalInfo.marital_status===null && <option disabled>select marital status</option>}
                      {generalInfo.marital_status!==null && <option selected>{generalInfo.marital_status}</option>}
                      <option>Married</option>
                      <option>Unmarried</option>
                    </Form.Select>
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Blood Group
                  </label>
                  <div class="col-sm-10">
                    <Form.Select onChange={event => setBloodGroup(event.target.value)} defaultValue={generalInfo.blood_group}>
                     {generalInfo.blood_group===null && <option disabled>selecet blood group</option>}
                     {generalInfo.blood_group!==null &&  <option selected>{generalInfo.blood_group}</option>}
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Form.Select>
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Nationality
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => setNationality(event.target.value)} defaultValue={generalInfo.nationality} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Religion
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => setReligion(event.target.value)} defaultValue={generalInfo.religion} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Native Language
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => setNativeLanguage(event.target.value)} defaultValue={generalInfo.native_language} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                
                {/* { nidInputCount.map((item) => <div key={item} id={item} class="form-group row mt-3"> 
                <label for="staticEmail" class="col-sm-2 col-form-label">NID/Birth-Certificate or Others National Identity Number</label>
                <div class="col-sm-10">
                  <input name={item} onBlur={event => {handleMultipleInput(event, nid, setNid)}} defaultValue={generalInfo.nid_number} type="text" readonly class="form-control" id="" />
                </div>
                <div className="text-end mt-2"><i onClick={() => removeInput(item, nidInputCount, setNidInputCount)} className="fa fa-close"></i>
                </div>
                </div>)} */}
                  {/* <div className="text-end mt-2">
                    <i onClick={addNidInput} className="fas fa-plus"></i>
                  </div> */}
                <div className="text-end mt-3">
                  <Button onClick={()=> updateUserGeneralInfo()} variant="primary justify">Save</Button>
                </div>
              </form> </Row>}
            
          </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item eventKey="1" className="my-1">
          <Accordion.Header className="accordion_custom_bg">
            <Row>
              <div>
                <small className="">
                  <b>Language Proficiency</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              {language.length !== 0 && language.map(item => <div className="my-2">
                <input className="form-control" value={item.language_name} disabled/>
                
                <div className="d-flex align-items-center my-1">
                  <span>Listening</span>
                  <input className="form-control mx-1" value={item.listening} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Speaking</span>
                  <input className="form-control mx-1" value={item.speaking} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Reading</span>
                  <input className="form-control mx-1" value={item.reading} disabled/>
                </div>

                <div className="d-flex align-items-center my-1">
                  <span>Writing</span>
                  <input className="form-control mx-1" value={item.writing} disabled/>
                </div>
                <i onClick={() => updateUserInfo(`http://127.0.0.1:8000/user/user-language-proficiency-delete/${localStorage.getItem('id')}/${item.id}`, 'DELETE')} className="fa fa-close d-flex flex-row-reverse mt-2"></i>
              </div>)}
              
              <form>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Native Lanuage
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => {setNativeLanguage(event.target.value)}} type="text" class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Listning
                  </label>
                  <div class="col-sm-10">
                    <Form.Select onChange={event => setListning(event.target.value)} value={listning}>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Below Average</option>
                    </Form.Select>
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Speaking
                  </label>
                  <div class="col-sm-10">
                    <Form.Select onChange={event => setSpeaking(event.target.value)} value={speaking}>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Below Average</option>
                    </Form.Select>
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Reading
                  </label>
                  <div class="col-sm-10">
                    <Form.Select onChange={event => setReading(event.target.value)} value={reading}>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Below Average</option>
                    </Form.Select>
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Writing
                  </label>
                  <div class="col-sm-10">
                    <Form.Select onChange={event => setWriting(event.target.value)} value={writing}>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Below Average</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <Button onClick={() => {
                    updateUserInfo(
                      // `http://127.0.0.1:8000/user/user-language-proficiency-update/${localStorage.getItem('id')}/1`,
                      `http://127.0.0.1:8000/user/user-language-proficiency`,
                      'POST',
                      {
                        language_name: nativeLanguage,
                        listening: listning,
                        speaking: speaking,
                        reading: reading,
                        writing: writing
                      }
                    )
                  }} variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item> */}
        
      </Accordion>
      
      <Row>
        {/* <Col>
            <button onClick={toggleShowChangePass}>Change password</button>
        </Col> */}
      </Row>

    </Container>
  );
};

export default UserAboutPost;
