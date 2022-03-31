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

  // states for user general information
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

  // states for language proficiency...
  const [languageName, setLanguageName] = useState('');
  const [listning, setListning] = useState('Excellent');
  const [speaking, setSpeaking] = useState('Excellent');
  const [reading, setReading] = useState('Excellent');
  const [writing, setWriting] = useState('Excellent');

  // IELTS & others score state
  const [ielts_name, setIelts_name] = useState('');
  const [score, setScore] = useState('');

  // contact informations state
  const [city, setCity] = useState('');
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


  // language proficiency header...
  const languageProficiencyHeader = {
    method: 'POST',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      language_name:  languageName, 
      listening:  listning, 
      speaking:  speaking, 
      reading:  reading,
      writing:   writing
    })
  }

  const languageProficiencyAdd = event => {
    // event.preventDefault();
    fetch('http://127.0.0.1:8000/user/user-language-proficiency', languageProficiencyHeader)
        .then(response => response.json())
        .then(data => {
          fetch(`http://127.0.0.1:8000/user/user-language-proficiency/${userId.userId}`, header)
            .then(response => response.json())
            .then(data => { setLanguage(data);
            })
        })
        .catch(error => console.log(error))
  }
  
  
  // language proficiency header...
  const ieltsScoreHeader = {
    method: 'POST',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name:  ielts_name, 
      ielts_toefl_score:  score,
    })
  }

  const addIeltsScore = event => {
    // event.preventDefault();
    fetch('http://127.0.0.1:8000/user/user-language-score', ieltsScoreHeader)
        .then(response => response.json())
        .then(data => {
          fetch(`http://127.0.0.1:8000/user/user-language-score/${userId.userId}`, header)
            .then(response => response.json())
            .then(data => { setLanguageScore(data);
            })
        })
        .catch(error => console.log(error))
  }

  // update user GeneralInformation
  const updateUserContactInfoHeader = {
    // mode: 'no-cors',
    method: 'PATCH',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      city:  city, 
      country:  country, 
      present_address: presentAddress,
      permanent_address:   parmanentAddress
    })
  };

  const updateUserContactInfo = () =>{
    fetch(`http://127.0.0.1:8000/user/user-contact-info-update/${localStorage.getItem('id')}`, updateUserContactInfoHeader)
      .then(response => {response.json()
          if (response.status===200) {
            console.log("okay")
            fetch(`http://127.0.0.1:8000/user/user-contact-info/${userId.userId}`, header)
            .then(response => response.json())
            .then(data => { setContactInfo(data);
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
        })
        
        // fetch for language
        fetch(`http://127.0.0.1:8000/user/user-language-score/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setLanguageScore(data);
        })
        
        // fetch for contact info
        fetch(`http://127.0.0.1:8000/user/user-contact-info/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setContactInfo(data);})
        
        
        // fetch for research skill
        fetch(`http://127.0.0.1:8000/user/user-research-skill/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setResearchSkill(data);})
        
        
        // fetch for research article
        fetch(`http://127.0.0.1:8000/user/user-research-article/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setResearchArticle(data);})
        
        
        // fetch for research work
        fetch(`http://127.0.0.1:8000/user/user-research-work/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setResearchWork(data);})
        
        
        // fetch for summary section
        fetch(`http://127.0.0.1:8000/user/user-research-summary/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setSummarySection(data);})
        
        
        // fetch for thought section
        fetch(`http://127.0.0.1:8000/user/user-research-thoughts/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setThoughtSection(data);})
        
        // fetch for working history
        fetch(`http://127.0.0.1:8000/user/user-working-history/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setWOrkingHistory(data);})
        
        // fetch for academic discipline
        fetch(`http://127.0.0.1:8000/user/user-academic-discipline/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setAcademicDiscipline(data);})
        
        // fetch for academic degree
        fetch(`http://127.0.0.1:8000/user/user-academic-degree/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setAcademicDegreeInit(data);})
        
        // fetch for training
        fetch(`http://127.0.0.1:8000/user/user-training/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setTrainingInit(data);})
        
        // fetch for workshop
        fetch(`http://127.0.0.1:8000/user/user-workshop-or-seminar/${userId.userId}`, header)
        .then(response => response.json())
        .then(data => { setWorkShopInit(data);})

  }, [random])

  // console.log(generalInfo[height])
  // console.log(workingHistory);

  return (
    <Container className="accordion_custom_div" >
      {showChangepass && <ChangepassForm toggle={toggleShowChangePass} />}
      {showChangepass && <Overlay />}
      <Accordion alwaysOpen className="mb-5">
        {/* user general info part  */}
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

        {/* language proficiency part */}
        <Accordion.Item eventKey="1" className="my-1">
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

            {/* getting language information  */}
              {language.length !== 0 && language.map(item => 
              
              <Row key={item.id} className="my-2">
                <div class="row mt-3">
                  <div className="col-sm-2">
                    <b>Language Name</b>
                  </div>                  
                  <div class="col-sm-10">
                    <p>{item.language_name}</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div className="col-sm-2">
                    <b>Listening</b>
                  </div>                  
                  <div class="col-sm-10">
                    <p>{item.listening} </p>
                  </div>
                </div><div class="row mt-3">
                  <div className="col-sm-2">
                    <b>Speaking</b>
                  </div>                  
                  <div class="col-sm-10">
                    <p>{item.speaking}</p>
                  </div>
                </div><div class="row mt-3">
                  <div className="col-sm-2">
                    <b>Reading</b>
                  </div>                  
                  <div class="col-sm-10">
                    <p>{item.reading}</p>
                  </div>
                </div><div class="row mt-3">
                  <div className="col-sm-2">
                    <b>Writing</b>
                  </div>                  
                  <div class="col-sm-10">
                    <p>{item.writing}</p>
                  </div>
                </div>
                {/* delete option  */}
                {/* <i className="fa fa-close d-flex flex-row-reverse mt-2"></i> */}
              </Row>)}
              
              {localStorage.getItem('id')===userId.userId && <Row> 
              <form>
                <div class="form-group row mt-3">
                  <label for="number" class="col-sm-2 col-form-label">
                    Language Name
                  </label>
                  <div class="col-sm-10">
                    <Form.Control onChange={event => setLanguageName(event.target.value)}>
                      
                    </Form.Control>
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
                  <Button onClick={()=> languageProficiencyAdd()} variant="primary justify">Save</Button>
                </div>
                <i onClick={() => removeInput( )} className="fa fa-close d-flex flex-row-reverse mt-2"></i>

                <div className="text-end mt-2">
                  <i onClick={addScore} className="fas fa-plus"></i>
                </div>
              </form> 
              </Row>}
          </Accordion.Body>
        </Accordion.Item> 
        

        {/* ielts score  */}
        <Accordion.Item eventKey="2" className="my-1">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>IELTS/ TOFEL/ GRE/ Others</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
          {languageScore.length !== 0 && languageScore.map(item => 
          <Row className="my-2">

            <div class="row mt-3">
              <div className="col-sm-2">
                <b>Name</b>
              </div>                  
              <div class="col-sm-10">
                <p>{item.name}</p>
              </div>
            </div>
            <div class="row mt-3">
              <div className="col-sm-2">
                <b>Score</b>
              </div>                  
              <div class="col-sm-10">
                <p>{item.ielts_toefl_score}</p>
              </div>
            </div>  
          </Row>)}

            {localStorage.getItem('id')===userId.userId &&  <form>
              <Row>
                {ielts_score.map(item =><div> <div>
                  <div id="example-collapse-text">
                    <div class="form-group row mt-3">
                      <label for="" class="col-sm-2 col-form-label">  Name </label>
                      <div class="col-sm-10">
                        <input onBlur={event => setIelts_name(event.target.value)} 
                          type="text"
                          readonly
                          class="form-control"
                          id=""
                        />
                      </div>
                    </div>
                    
                    <div class="form-group row mt-3">
                      <label for="" class="col-sm-2 col-form-label">Score</label>
                      <div class="col-sm-10">
                        <input onBlur={event => setScore(event.target.value)} type="number" readonly class="form-control" id="" min="1" max="9"/>
                      </div>
                    </div>          
                  </div>

                <div className="text-end mt-3">
                  <Button onClick={()=> addIeltsScore()} variant="primary justify ">Save</Button>
                </div>
                </div>
                <i onClick={() => removeInput(item, ielts_score, setIelts_score)} className="fa fa-close d-flex flex-row-reverse mt-2"></i></div>)}

                <div className="text-end mt-2">
                  <i onClick={addScore} className="fas fa-plus"></i>
                  
                </div>
              </Row>
            </form>}
          </Accordion.Body>
        </Accordion.Item>

        {/* user contact information  */}
        <Accordion.Item eventKey="3" className="my-1    ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Contact Information</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
          { userId.userId!==localStorage.getItem('id')  && <Row>
              
              <div class="row mt-3">
                    
                <div className="col-sm-2">
                  <b>City</b>
                </div>                  
                <div class="col-sm-10">
                  <p>{contactInfo.city}</p>
                </div>
              </div>
              <div class="row mt-3">
                    
                <div className="col-sm-2">
                  <b>Country</b>
                </div>                  
                <div class="col-sm-10">
                  <small>{contactInfo.country}</small>
                </div>
              </div>
              <div class="row mt-3 ">
                    
                <div className="col-sm-2">
                  <b>Present Address</b>
                </div>                 
                <div class="col-sm-10 ">
                  <small>{contactInfo.present_address}</small>
                </div>
              </div>
              <div class="row mt-3">
                    
                <div className="col-sm-2">
                  <b>Permanent Address</b>
                </div>                 
                <div class="col-sm-10 ">
                  <small>{contactInfo.permanent_address} </small>
                </div>
              </div>
            </Row>}

            { localStorage.getItem('id')===userId.userId && <Row>
              <form>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Current Location
                  </label>
                  <div class="col-sm-5">
                    <input
                    onChange={event => setCity(event.target.value)} defaultValue={contactInfo.city}
                      type="text"
                      readonly
                      class="form-control"
                      id=""
                      placeholder="City"
                    />
                  </div>
                  <div class="col-sm-5">
                    <input
                    onChange={event => setCountry(event.target.value)} defaultValue={contactInfo.country}
                      type="text"
                      readonly
                      class="form-control"
                      id=""
                      placeholder="Country"
                    />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Present Address
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => setPresentAddress(event.target.value)} defaultValue={contactInfo.present_address} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Permanent Address
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => setParmanentAddress(event.target.value)} defaultValue={contactInfo.permanent_address} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                
                {/* {emailField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Email Address
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, formEmail, setFormEmail)}} type="text" readonly class="form-control" id="" />
                    
                  </div>
                  <i onClick={() => removeInput(item, emailField, setEmailField)} className="fa fa-close d-flex flex-row-reverse mt-2"></i>
                </div> )} */}
{/*                     
                    <div className="text-end mt-2">
                      <i onClick={addEmailField} className="fas fa-plus"></i>
                    </div> */}
                
                {/* {numberField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Phone Number
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, number, setNumber)}} type="number" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, numberField, setNumberField)} className="fa fa-close d-flex flex-row-reverse mt-2"></i>
                </div>)} */}
                    
                    {/* <div className="text-end mt-2">
                      <i onClick={addNumberField} className="fas fa-plus"></i>
                    </div> */}
                
                <div className="text-end mt-3">
                  <Button onClick={() => updateUserContactInfo()} variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" className="my-1 ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Research Skill</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <form>
                
                {areaResearchField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Area of Research Interest
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, areaResearchInterest, setAreaResearchInterest)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, areaResearchField, setAreaResearchField)} className="fa fa-close d-flex flex-row-reverse mt-2"></i>
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addAreaResearchField} className="fas fa-plus"></i>
                  </div>
                
                {keyResearchField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Key Reseach Skill
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, keyResearchSkill, setKeyResearchSkill)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, keyResearchField, setKeyResearchField)} className="fa fa-close d-flex flex-row-reverse mt-2"></i>
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addKeyResearchField} className="fas fa-plus"></i>
                  </div>
                
                <div className="text-end mt-3">
                  <Button onClick={() => {console.log(areaResearchInterest); console.log(keyResearchSkill)}} variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5" className="my-1    ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b> Published Research Article</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
            
            {researchArticle.length !== 0 && researchArticle.map(item => <div className="my-2">
                <input className="form-control" value={item.language_name} disabled/>
                
                <div className="d-flex align-items-center my-1">
                  <span>Link</span>
                  <input className="form-control mx-1" value={item.url_link} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Article Name</span>
                  <input className="form-control mx-1" value={item.article_name} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Author's Name</span>
                  <input className="form-control mx-1" value={item.authors_name} disabled/>
                </div>

                <div className="d-flex align-items-center my-1">
                  <span>Journal's Name</span>
                  <input className="form-control mx-1" value={item.journals_name} disabled/>
                </div>

                <div className="d-flex align-items-center my-1">
                  <span>Publisher's Name</span>
                  <input className="form-control mx-1" value={item.publisher_name} disabled/>
                </div>

                <div className="d-flex align-items-center my-1">
                  <span>Publication Year</span>
                  <input className="form-control mx-1" value={item.publication_year} disabled/>
                </div>
                
              </div>)}

              <form>
                {pubYearField.map(item =><div><div className="mt-4 d-flex  ">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Has Url Link
                  </label>
                  <div>
                    <Form.Group className="mx-3 " controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        onClick={() => setUrl(!url)}
                        aria-controls="example-collapse-text"
                        aria-expanded={url}
                        label=""
                      />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Collapse in={url}>
                    <div id="example-collapse-text">
                      <div class="form-group row mt-3">
                        <label for="" class="col-sm-2 col-form-label">
                          Url Link
                        </label>
                        <div class="col-sm-10">
                          <input
                          // name={item} onBlur={event => {handleMultipleInput(event, urlLink, setUrlLink)}}
                          name={item} onChange={event => {setUrlLink(event.target.value)}}
                            type="url"
                            readonly
                            class="form-control"
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Article Name
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, articleName, setArticleName)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setArticleName(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Author's Name
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, authorName, setAuthorName)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setAuthorName(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Journal's Name
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, journalName, setJournalName)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setJournalName(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Publisher Name
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, publisherName, setPublisherName)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setPublisherName(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Publication Year
                  </label>
                  <div class="col-sm-10">
                    <input
                    // name={item} onBlur={event => {handleMultipleInput(event, publisherYear, setPublisherYear)}}
                    name={item} onChange={event => {setPublisherYear(event.target.value)}}
                      type="number"
                      readonly
                      class="form-control"
                      id=""
                      min="1900"
                      max="2099"
                      step="1"
                    />
                  </div>
                </div>
                {/* <i onClick={() => removeInput(item, pubYearField, setPubYearField)} className="fa fa-close d-flex flex-row-reverse mt-2"></i> */}
                </div>)}
                
                  {/* <div className="text-end mt-2">
                    <i onClick={addPubYearField} className="fas fa-plus"></i>
                  </div> */}
                <div className="text-end mt-3">
                <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className="my-1    ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Research Work</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <form>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Information on the involvement in research work url
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => setInformationLink(event.target.value)} value={informationLink} type="url" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Institution
                  </label>
                  <div class="col-sm-10">
                    <input onChange={event => setInformationLink(event.target.value)} value={informationLink} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Start Date
                  </label>
                  <div class="col-sm-10">
                    <input
                    onChange={event => setStartDate(event.target.value)} value={startDate}
                      type="date"
                      readonly
                      class="form-control"
                      id="duedate"
                    />
                  </div>
                </div>
                <div className="mt-4 d-flex  ">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Present
                  </label>
                  <div>
                    <Form.Group className="mx-3 " controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        onClick={() => setDate(!date)}
                        aria-controls="example-collapse-text"
                        aria-expanded={url}
                        label=""
                      />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Collapse in={date}>
                    <div id="example-collapse-text">
                      <div class="form-group row mt-3">
                        <label for="" class="col-sm-2 col-form-label">
                          End Date
                        </label>
                        <div class="col-sm-10">
                          <input
                          onChange={event => setEndtDate(event.target.value)} value={endDate}
                            type="date"
                            readonly
                            class="form-control"
                            id="duedate"
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>
                  <div className="text-end mt-3">
                    <Button variant="primary justify ">Save</Button>
                  </div>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7" className="my-1   ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b> Reseach Summary on Reseach Rider</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <form>
                
                {summaryField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Research Summary on Reseach Rider
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, summary, setSummary)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setSummary(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                  {/* <i onClick={() => removeInput(item, summaryField, setSummaryField)} className="fa fa-close d-flex flex-row-reverse"></i> */}
                </div>)}
                  
                  {/* <div className="text-end mt-2">
                    <i onClick={addSummaryField} className="fas fa-plus"></i>
                  </div> */}
                  
                  <div className="text-end mt-3">
                  <Button  variant="primary justify ">Save</Button>
                  </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8" className="my-1  ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b> Thought on Reseach Rider</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <form>
                
                {thoughtField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Thought on Reseach Rider
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, thought, setThought)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, thoughtField, setThoughtField)} className="fa fa-close d-flex flex-row-reverse"></i>
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addThoughtField} className="fas fa-plus"></i>
                  </div>
                  
                  <div className="text-end mt-3">
                    <Button variant="primary justify ">Save</Button>
                  </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9" className="my-1   ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Book Publication</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <form>
                {bookPubYearField.map(item => <div><div className="mt-4 d-flex  ">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    has url link
                  </label>
                  <div>
                    <Form.Group className="mx-3 " controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        onClick={() => setPublish(!publish)}
                        aria-controls="example-collapse-text"
                        aria-expanded={publish}
                        label=""
                      />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Collapse in={publish}>
                    <div id="example-collapse-text">
                      <div class="form-group row mt-3">
                        <label for="" class="col-sm-2 col-form-label">
                          Published book url
                        </label>
                        <div class="col-sm-10">
                          <input
                          name={item} onBlur={event => {handleMultipleInput(event, bookPubUrl, setBookPubUrl)}}
                          onChange={event => setBookPubUrl(event.target.value)} value={bookPubUrl}
                            type="url"
                            readonly
                            class="form-control"
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Book's Name
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, bookName, setBookName)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Author's Name
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, authorsName, setAuthorsName)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>

                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Publisher's Name
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, pubName, setPubName)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Publication Year
                  </label>
                  <div class="col-sm-10">
                    <input
                    name={item} onBlur={event => {handleMultipleInput(event, pubYear, setPubYear)}}
                      type="number"
                      readonly
                      class="form-control"
                      id=""
                      min="1900"
                      max="2099"
                      step="1"
                    />
                  </div>
                </div>
                <i onClick={() => removeInput(item, bookPubYearField, setBookPubYearField)} className="fa fa-close d-flex flex-row-reverse mt-3"></i>
                </div>)}

                <div className="text-end mt-2">
                  <i onClick={addBookPubYearField} className="fas fa-plus"></i>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="10" className="my-1    ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Working Skill</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <form>
                
                {keyWorkingSkillField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Key Working Skill
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, keyWorkingSkill, setKeyWorkingSkill)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, keyWorkingSkillField, setKeyWorkingSkillField)} className="fa fa-close d-flex flex-row-reverse mt-3"></i>
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addKeyWorkingSkillField} className="fas fa-plus"></i>
                  </div>
                
                {careerObjectPlanField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Career Object Plan
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, careerObjectPlans, setCareerObjectPlans)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, careerObjectPlanField, setCareerObjectPlanField)} className="fa fa-close d-flex flex-row-reverse mt-3"></i>
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addCareerObjectPlanField} className="fas fa-plus"></i>
                  </div>
                
                {areaWorkInterestField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Area of Working Interest
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, areaOfWorkInterest, setAreaOfWorkInterest)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, areaWorkInterestField, setAreaWorkInterestField)} className="fa fa-close d-flex flex-row-reverse mt-3"></i>
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addAreaWorkingInterestField} className="fas fa-plus"></i>
                  </div>
                
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="11" className="my-1    ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Working History</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              
            {workingHistory.length !== 0 && workingHistory.map(item => <div className="my-2">
                
                <div className="d-flex align-items-center my-1">
                  <span>Designation</span>
                  <input className="form-control mx-1" value={item.designation} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Department</span>
                  <input className="form-control mx-1" value={item.department} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Institute</span>
                  <input className="form-control mx-1" value={item.institute} disabled/>
                </div>

                <div className="d-flex align-items-center my-1">
                  <span>Start Date</span>
                  <input className="form-control mx-1" value={item.start_date} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>End Date</span>
                  <input className="form-control mx-1" value={item.end_date} disabled/>
                </div>
                
              </div>)}

              <form>
                
                {workingHistoryField.map(item => <div><div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Designation
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, designation, setDesignation)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setDesignation(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Department
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, department, setDepartment)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setDepartment(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Institution
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, instituition, setInstituition)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setInstituition(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Start Date
                  </label>
                  <div class="col-sm-10">
                    <input
                    // name={item} onBlur={event => {handleMultipleInput(event, workingStartDate, setWorkingStartDate)}}
                    name={item} onChange={event => {setWorkingStartDate(event.target.value)}}
                      type="date"
                      readonly
                      class="form-control"
                      id="duedate"
                    />
                  </div>
                </div>
                <div className="mt-4 d-flex  ">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Present
                  </label>
                  <div>
                    <Form.Group className="mx-3 " controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        onClick={() => setWorkingdate(!workingdate)}
                        aria-controls="example-collapse-text"
                        aria-expanded={workingdate}
                        label=""
                      />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Collapse in={workingdate}>
                    <div id="">
                      <div class="form-group row mt-3">
                        <label
                          for="staticEmail"
                          class="col-sm-2 col-form-label"
                        >
                          End Date
                        </label>
                        <div class="col-sm-10">
                          <input
                          // name={item} onBlur={event => {handleMultipleInput(event, workingEndtDate, setWorkingEndDate)}}
                          name={item} onChange={event => {setWorkingEndDate(event.target.value)}}
                            type="date"
                            readonly
                            class="form-control"
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                {/* <i onClick={() => removeInput(item, workingHistoryField, setWorkingHistoryField)} className="fa fa-close d-flex flex-row-reverse mt-3"></i> */}
                </div>)}
                  
                  {/* <div className="text-end mt-2">
                    <i onClick={addWorkingHistoryField} className="fas fa-plus"></i>
                  </div> */}
                  
                  <div className="text-end mt-3">
                  <Button variant="primary justify ">Save</Button>
                  </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="12" className="my-1   ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Technology & Notable Skill</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <form>
                {techSkillField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Technological Skill
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, techSkill, setTechSkill)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, techSkillField, setTechSkillField)} className="fa fa-close d-flex flex-row-reverse mt-3"></i>
                  
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addTechSkillField} className="fas fa-plus"></i>
                  </div>
                
                {otherSkillField.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Other Notable Skill
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, otherSkill, setOtherSkill)}} type="text" readonly class="form-control" id="" />
                  </div>
                  <i onClick={() => removeInput(item, otherSkillField, setOtherSkillField)} className="fa fa-close d-flex flex-row-reverse mt-3"></i>
                </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addOtherSkillField} className="fas fa-plus"></i>
                  </div>
                
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="13" className="my-1  ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Education & Training</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              
              {academicDiscipline.length !== 0 && academicDiscipline.map(item => <div className="my-2">
                
                <div className="d-flex align-items-center my-1">
                  <span>Academic Discipline</span>
                  <input className="form-control mx-1" value={item.academic_discipline} disabled/>
                </div>
              </div>)}

              <form>
                {academicDescipline.map(item => <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Academic Discipline
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, academicDesciplines, setAcademicDesciplines)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setAcademicDesciplines(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                  {/* <i onClick={() => removeInput(item, academicDescipline, setAcademicDescipline)} className="fa fa-close d-flex flex-row-reverse mt-3"></i> */}
                </div>)}
                  
                  {/* <div className="text-end mt-2">
                    <i onClick={addAcademicDesciplineField} className="fas fa-plus"></i>
                  </div> */}
                
                <div className="text-end mt-3">
                <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>

            <Row>
              
              

              <form>
                {academicAchievement.map(item =><div> <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Academic Achievement
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, academicAchievements, setAcademicAchievements)}} type="text" readonly class="form-control" id="" />
                    {/* <input name={item} onChange={event => {setAcademicAchievements(event.target.value)}} type="text" readonly class="form-control" id="" /> */}
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Institution
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, educationInstution, setEducationInstitution)}} type="text" readonly class="form-control" id="" />
                    {/* <input name={item} onChange={event => {setEducationInstitution(event.target.value)}} type="text" readonly class="form-control" id="" /> */}
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Year
                  </label>
                  <div class="col-sm-10">
                    <input
                    name={item} onBlur={event => {handleMultipleInput(event, educationYear, setEducationYear)}}
                    // name={item} onChange={event => {setEducationYear(event.target.value)}}
                      type="number"
                      readonly
                      class="form-control"
                      id=""
                      min="1900"
                      max="2099"
                      step="1"
                    />
                  </div>
                </div>
                {/* <i onClick={() => removeInput(item, academicAchievement, setAcademicAchievement)} className="fa fa-close d-flex flex-row-reverse mt-3"></i> */}
                </div>)}
                  
                  {/* <div className="text-end mt-2">
                    <i onClick={addAcademicAchievementField} className="fas fa-plus"></i>
                  </div> */}
                <div className="text-end mt-3">
                <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>

            <Row>
              {academicDegreeInit.length !== 0 && academicDegreeInit.map(item => <div className="my-2">
                
                <div className="d-flex align-items-center my-1">
                  <span>Academic Degree</span>
                  <input className="form-control mx-1" value={item.degree} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Department</span>
                  <input className="form-control mx-1" value={item.department} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Institution</span>
                  <input className="form-control mx-1" value={item.institutions} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Start Date</span>
                  <input className="form-control mx-1" value={item.start_date} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>End Date</span>
                  <input className="form-control mx-1" value={item.end_date} disabled/>
                </div>
              </div>)}
              <form>
                {academicDegree.map(item => <div><div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Academic Degree
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, academicDegrees, setAcademicDegrees)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setAcademicDegrees(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Department
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, educationDepartment, setEducationDepartment)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setEducationDepartment(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Institution
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, institution2, setInstitution)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setEducationInstitution(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Start Date
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, educationStartDate, setEducationStartDate)}} type="date" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setEducationStartDate(event.target.value)}} type="date" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    End Date
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, educationEndDate, setEducationEndDate)}} type="date" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setEducationEndDate(event.target.value)}} type="date" readonly class="form-control" id="" />
                  </div>
                </div>
                {/* <i onClick={() => removeInput(item, academicDegree, setAcademicDegree)} className="fa fa-close d-flex flex-row-reverse mt-3"></i> */}
                </div>)}
               
                  
                  {/* <div className="text-end mt-2">
                    <i onClick={addAcademicDegreeField} className="fas fa-plus"></i>
                  </div> */}
                <div className="text-end mt-3">
                <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="14" className="my-1    ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  <b>Training</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
            
            {trainingInit.length !== 0 && trainingInit.map(item => <div className="my-2">
                
                <div className="d-flex align-items-center my-1">
                  <span>Name</span>
                  <input className="form-control mx-1" value={item.training_name} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Institution</span>
                  <input className="form-control mx-1" value={item.institutions} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Start Date</span>
                  <input className="form-control mx-1" value={item.start_date} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>End Date</span>
                  <input className="form-control mx-1" value={item.end_date} disabled/>
                </div>
              </div>)}

              <form>
                {training.map(item =><div> <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Name
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, trainingName, setTrainingName)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setTrainingName(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Institution
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, trainingInstution, setTrainingInstution)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setTrainingInstution(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Start Date
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, trainingStartDate, setTrainingStartDate)}} type="date" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setTrainingStartDate(event.target.value)}} type="date" readonly class="form-control" id="" />
                  </div>
                </div>
                <div className="mt-4 d-flex">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Present
                  </label>
                  <div>
                    <Form.Group className="mx-3 " controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        onClick={() => setTrainingdate(!trainingdate)}
                        aria-controls="example-collapse-text"
                        aria-expanded={trainingdate}
                        label=""
                      />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Collapse in={trainingdate}>
                    <div id="example-collapse-text">
                      <div class="form-group row mt-3">
                        <label for="" class="col-sm-2 col-form-label">
                          End Date
                        </label>
                        <div class="col-sm-10">
                          <input
                          // name={item} onBlur={event => {handleMultipleInput(event, trainingEndDate, setTrainingEndDate)}}
                          name={item} onChange={event => {setTrainingEndDate(event.target.value)}}
                            type="date"
                            readonly
                            class="form-control"
                            id="duedate"
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                {/* <i onClick={() => removeInput(item, training, setTraining)} className="fa fa-close d-flex flex-row-reverse mt-3"></i> */}
                </div>)}
                  
                  {/* <div className="text-end mt-2">
                    <i onClick={addTrainingField} className="fas fa-plus"></i>
                  </div> */}
                  
                  <div className="text-end mt-3">
                  <Button variant="primary justify ">Save</Button>
                  </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="15" className="my-1    ">
          <Accordion.Header>
            <Row>
              <div>
                <small className="">
                  {" "}
                  <b>Workshop & Seminer</b>
                </small>
              </div>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              {workShopInit.length !== 0 && workShopInit.map(item => <div className="my-2">
                
                <div className="d-flex align-items-center my-1">
                  <span>Workshop Name</span>
                  <input className="form-control mx-1" value={item.name} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Institution</span>
                  <input className="form-control mx-1" value={item.institutions} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>Start Date</span>
                  <input className="form-control mx-1" value={item.start_date} disabled/>
                </div>
                
                <div className="d-flex align-items-center my-1">
                  <span>End Date</span>
                  <input className="form-control mx-1" value={item.end_date} disabled/>
                </div>
              </div>)}

              <form>
                {workshop.map(item =><div> <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Workshop or Seminer Name
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, workShopName, setWorkshopName)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setWorkshopName(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Institution
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, workshopInstution, setWorkshopInstution)}} type="text" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setWorkshopInstution(event.target.value)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Start Date
                  </label>
                  <div class="col-sm-10">
                    {/* <input name={item} onBlur={event => {handleMultipleInput(event, workshopStartDate, setWorkshopStartDate)}} type="date" readonly class="form-control" id="" /> */}
                    <input name={item} onChange={event => {setWorkshopStartDate(event.target.value)}} type="date" readonly class="form-control" id="" />
                  </div>
                </div>
                <div className="mt-4 d-flex">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Present
                  </label>
                  <div>
                    <Form.Group className="mx-3 " controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        onClick={() => setSeminerdate(!seminerdate)}
                        aria-controls="example-collapse-text"
                        aria-expanded={seminerdate}
                        label=""
                      />
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Collapse in={seminerdate}>
                    <div id="example-collapse-text">
                      <div class="form-group row mt-3">
                        <label for="" class="col-sm-2 col-form-label">
                          End Date
                        </label>
                        <div class="col-sm-10">
                          <input
                          // name={item} onBlur={event => {handleMultipleInput(event, workshopEndDate, setWorkshopEndDate)}}
                          name={item} onChange={event => {setWorkshopEndDate(event.target.value)}}
                            type="date"
                            readonly
                            class="form-control"
                            id="duedate"
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                {/* <i onClick={() => removeInput(item, workshop, setWorkshop)} className="fa fa-close d-flex flex-row-reverse mt-3"></i> */}
                </div>)}
                
                  
                  {/* <div className="text-end mt-2">
                    <i onClick={addWorkshopField} className="fas fa-plus"></i>
                  </div> */}
                  
                  <div className="text-end mt-3">
                  <Button variant="primary justify ">Save</Button>
                  </div>
                
                {otherWorkshop.map(item => <div><div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Other Notable Achievement
                  </label>
                  <div class="col-sm-10">
                    <input name={item} onBlur={event => {handleMultipleInput(event, otherAchievement, setOtherAchievement)}} type="text" readonly class="form-control" id="" />
                  </div>
                </div>
                <div class="form-group row mt-3">
                  <label for="staticEmail" class="col-sm-2 col-form-label">
                    Year
                  </label>
                  <div class="col-sm-10">
                    <input
                      name={item} onBlur={event => {handleMultipleInput(event, otherYear, setOtherYear)}}
                      type="number"
                      readonly
                      class="form-control"
                      id=""
                      min="1900"
                      max="2099"
                      step="1"
                    />
                  </div>
                </div>
                <i onClick={() => removeInput(item, otherWorkshop, setOtherWorkshop)} className="fa fa-close d-flex flex-row-reverse mt-3"></i>
                 </div>)}
                  
                  <div className="text-end mt-2">
                    <i onClick={addOtherWorkshopField} className="fas fa-plus"></i>
                  </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save</Button>
                </div>
              </form>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
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
