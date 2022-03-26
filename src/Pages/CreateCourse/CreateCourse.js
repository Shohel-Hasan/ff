import React, { useEffect, useState } from 'react';
import { Button, Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import './CreateCourse.css'
import man from '../../Images/man.jpg'
import { useNavigate, useParams } from 'react-router-dom';


const CreateCourse = (props) => {
    const groupId = useParams();
    const navigate = useNavigate();


    props.triggerCheckLoggedIn();

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    
    //Form Data
    const [courseName, setCourseName] = useState("");
    const [coverPic, setCoverPic] = useState();
    // const [profilePic, setProfilePic] = useState();
    const [hourPerClass, setHourPerClass] = useState("");
    const [classPerWeek, setClassPerWeek] = useState("");
    const [totalClass, setTotalClass]= useState("");
    const [totalClassHour, setTotalClassHour] = useState("");
    const [courseStartMonth, setCourseStartMonth] = useState('');
    const [courseStartDay, setCourseStartDay] = useState("");
    const [courseStartYear, setCourseStartYear] = useState("");
    const [courseEndMonth, setCourseEndMonth] = useState("");
    const [courseEndDay, setCourseEndDay] = useState("");
    const [courseEndYear, setCourseEndYear] = useState("");
    const [courseTopic, setCourseTopic] = useState("");
    const [courseOutcome, setCourseOutcome] = useState("");
    const [courseReward, setCourseReward] = useState("");
    const [enrollmentRequirement, setEnrollmentRequirement] = useState("");
    const [courseResponsibility, setCourseResponsibility] = useState("");
    const [enrollmentEndMonth, setEnrollmentEndMonth] = useState("");
    const [enrollmentEndDay,setEnrollmentEndDay] = useState("");
    const [enrollmentEndYear, setEnrollmentEndYear] =useState('');
    const [enrollmentStartMonth,setEnrollmentStartMonth] = useState("");
    const [enrollmentStartDay, setEnrollmentStartDay] = useState("");
    const [enrollmentStartYear, setEnrollmentStartYear] =useState('');
    const [enrollmentFee, setEnrollmentFee] = useState("");
    const [paymentProcedure ,setPaymentProcedure] = useState("");
    const [expectedStudent, setExpectedStudent] = useState("");
    const [disclaimer, setDisclaimer] = useState("");
    // const [courseTeacher, setCourseTeacher] = useState("");

    const [singleGroup, setSingleGroup] = useState({})


    //Class Routine
    const [sat, setSat] = useState("");
    const [sun, setSun] = useState("");
    const [mon, setMon] = useState("");
    const [tue, setTue] = useState("");
    const [wed, setWed] = useState("");
    const [thu, setThu] = useState("");
    const [fri, setFri] = useState("");
    
    // getting group details
    useEffect(() => {
        fetch(`http://18.211.204.106/group/${groupId.groupId}/group-detail/`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .then(data => {setSingleGroup(data)
            // console.log(data)
        })
    }, [groupId.groupId])

   
    // course data function
    // const courseHeader = {
    //     // mode: 'no-cors',
    //     method: 'POST',
    //     headers: {
    //         "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         name : courseName,
    //         hour_per_class: hourPerClass,
    //         class_per_week : classPerWeek,
    //         total_class : totalClass,
    //         total_class_hour : totalClassHour,
    //         start_date :  courseStartYear + "-" + courseStartMonth + "-" + courseStartDay,
    //         end_date : courseEndYear + "-" + courseEndMonth + "-" + courseEndDay,
    //         class_routine : `{"Saturday": ${sat}, "Sunday": ${sun},"Monday": ${mon},"Tuesday": ${tue},"Wednesday": ${wed},"Thursday": ${thu},"Friday": ${fri},}`,
    //         course_topic : courseTopic,
    //         course_outcome : courseOutcome,
    //         course_reward: courseReward,
    //         enrollment_requirement: enrollmentRequirement,
    //         course_responsibility: courseResponsibility,
    //         course_enroll_start_date: enrollmentStartYear + "-" + enrollmentStartMonth + "-" +  enrollmentStartDay,
    //         course_enroll_end_date: enrollmentEndYear + "-" + enrollmentEndMonth + "-" +  enrollmentEndDay,
    //         enrollment_fee: enrollmentFee,
    //         payment_procedure: paymentProcedure,
    //         max_student  : expectedStudent,
    //         disclaimer_from_group: disclaimer
    //     })
    // };

    // const handleCourseCreate = (e) =>{
    //     e.preventDefault();
    //     console.log("I am hitting.....");
    //     console.log(localStorage.getItem('auth_token'))

    //     console.log(courseHeader.body)
    //     e.preventDefault();
    //     console.log(courseHeader.body)

    //     fetch('http://127.0.0.1:8000/course/group/1/course-create/', courseHeader)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //         })
    //         .catch(error => console.log(error))
        
    // }

    // course create api 
    const handleCreateCourseFormData = () => {
        // e.preventDefault();
        const newData = new FormData();
        newData.append('name', courseName);
        newData.append('cover_pic', coverPic);
        // newData.append('profile_pic', profilePic);

        newData.append('hour_per_class', hourPerClass);
        newData.append('class_per_week', classPerWeek);
        newData.append('total_class', totalClass);
        newData.append('total_class_hour', totalClassHour);
        newData.append('start_date', courseStartYear + "-" + courseStartMonth + "-" + courseStartDay);
        newData.append('end_date', courseEndYear + "-" + courseEndMonth + "-" + courseEndDay);

        newData.append('sat', sat);
        newData.append('sun', sun);
        newData.append('mon', mon);
        newData.append('tue', tue);
        newData.append('wed', wed);
        newData.append('thu', thu);
        newData.append('fri', fri);

        // newData.append('class_routine', `{"Saturday": ${sat}, "Sunday": ${sun},"Monday": ${mon},"Tuesday": ${tue},"Wednesday": ${wed},"Thursday": ${thu},"Friday": ${fri}}`);
        newData.append('course_topic', courseTopic);
        newData.append('course_outcome', courseOutcome);
        newData.append('course_reward', courseReward);
        newData.append('enrollment_requirement', enrollmentRequirement);
        newData.append('course_responsibility', courseResponsibility);
        newData.append('course_enroll_start_date', enrollmentStartYear + "-" + enrollmentStartMonth + "-" +  enrollmentStartDay);
        newData.append('course_enroll_end_date', enrollmentEndYear + "-" + enrollmentEndMonth + "-" +  enrollmentEndDay);
        newData.append('enrollment_fee', enrollmentFee);
        newData.append('payment_procedure', paymentProcedure);
        newData.append('max_student', expectedStudent);
        newData.append('disclaimer_from_group', disclaimer);

      
        console.log(newData)
        console.log("data: ", courseName, hourPerClass,classPerWeek ,totalClass ,totalClassHour , coverPic )
      
        fetch(`http://18.211.204.106/course/group/${groupId.groupId}/course-create/`, {
          method: "POST",
          headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          },
          body: newData
        })
          .then(res=> {
              if (res.status===400) {
                alert("please enter all the required field");
              } else if(res.status===201) {
                navigate(`/${groupId.groupId}/my-courses`)
              }
          })
          .catch(error => console.log(error))
      }
      
    // const changeHandler = (e) => {
        
    //     console.log('click');
    //     let Name = e.target.files[0];
    //     setSelectedFile(Name);
        // setSelectedFile(true);
        

        // if (e.target.files && e.target.files[0]) {
        //     let img = e.target.files[0];
        //     setSelectedFile({
        //       image: URL.createObjectURL(img)
        //     });
        //   }
    // }
   
    
    // console.log(selectedFile);
    
    



    // ------ Course Starting Date ---------//
     const year = () => {
       
        let ddlYears = document.getElementById("ddlYears");
    
        let currentYear = new Date().getFullYear();
    
        for (var i = 1910; i <= currentYear; i++) {
          var option = document.createElement("OPTION");
          option.innerHTML = i;
          option.value = i;
          ddlYears.appendChild(option);
        }
      };
  

     // ------ Course Ending Date  ---------//
     const date = () => {
       
        let ddYears = document.getElementById("ddYears");
    
        let currentYear = new Date().getFullYear();
    
        for (var i = 1910; i <= currentYear; i++) {
          var option = document.createElement("OPTION");
          option.innerHTML = i;
          option.value = i;
          ddYears.appendChild(option);
        }
      };
     

  // ------ Enrolment Ending Date ---------//
  const start = () => {
   
    let enStart = document.getElementById("enStart");

    let currentYear = new Date().getFullYear();

    for (var i = 1910; i <= currentYear; i++) {
      var option = document.createElement("OPTION");
      option.innerHTML = i;
      option.value = i;
      enStart.appendChild(option);
    }
  };


 // ------ Dynamic Year Start ---------//
 const end = () => {

     let enEnd = document.getElementById("enEnd");
 
     let currentYear = new Date().getFullYear();
 
     for (var i = 1910; i <= currentYear; i++) {
       var option = document.createElement("OPTION");
       option.innerHTML = i;
       option.value = i;
       enEnd.appendChild(option);
     }
   };
// ------ Dynamic Year End ---------//


     
  // ------ AddRemoveInputField ---------//
  
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };


//   Routine Time  //
  const satTime = (time) =>{
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
    
        var displayTime = hours + ":" + minutes + " " + suffix;
        setSat(displayTime);
      }
    
  }

  const sunTime = (time) =>{
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
    
        var displayTime = hours + ":" + minutes + " " + suffix;
        setSun(displayTime);
      }
}

const monTime = (time) =>{
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
    
        var displayTime = hours + ":" + minutes + " " + suffix;
        setMon(displayTime);
      }
}
const tueTime = (time) =>{
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
        var displayTime = hours + ":" + minutes + " " + suffix;
        setTue(displayTime);
      }
}
const wedTime = (time) =>{
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
    
        var displayTime = hours + ":" + minutes + " " + suffix;
        setWed(displayTime);
      }
}
const thuTime = (time) =>{
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
    
        var displayTime = hours + ":" + minutes + " " + suffix;
        setThu(displayTime);
      }
}
const friTime = (time) =>{
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
    
        var displayTime = hours + ":" + minutes + " " + suffix;
        setFri(displayTime);
      }
}


const BASE_URL = "http://18.211.204.106"

     
    
    
   

    return (
        <Container className='create_course_container' >
           
                <Form >
                    <Row className='justify-content-center align-items-center'>
                       
                      <div className='fb-box-shadow pb-3' style={{borderBottom: "1px solid #ced0d4"}}>
                      
                       {/* Group name & information start  */}
                       <Row className='justify-content-center'>
                            <Col md={8}>
                             
                                 <div class="container">
                                    <span class="select-wrapper">
                                        <input onChange={e => setCoverPic(e.target.files[0])} type="file" name="image_src" id="image_src" />
                                    </span>
                                </div>
                           
                         
                             <img className='course-img img-fluid rounded' src={man} alt=""/>
                             
                            </Col>
                        </Row>
                      
                      
                       <Row  className='mt-2'>
                            <Col md={{ span: 3, offset: 2 }}>
                                <div className='icon-container d-flex align-items-center'>
                                     <img className='group-pic'  src={`${BASE_URL}${singleGroup.cover_pic}`} alt='' />
                                     <div className="image-load mt-4">
                                    
                                        {/* <label for="file-input"> */}
                                        {/* <input type="file"/>
                                            <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png" alt=''/>
                                           
                                        </label>
                                        <input className='d-none' id="file-input" type="file"/> */}
                                    </div>
                                    <div><h6 style={{ color: "#1877f2", fontSize:'20px', marginLeft: '15px'}} > {singleGroup.name}</h6></div>
                                </div>
                                <div>
                                </div>
                                
                            </Col>
                            
                        </Row>


                    </div>


                     
                        {/* Course Information Start  */}

                         {/* Course Name */}
                        <div className="form-group row mb-1 mt-4">
                            <label    className="col-sm-4 col-form-label">Course Name</label>
                            <div className="col-sm-8">
                               <input 
                                   type="text"     
                                   className="form-control" 
                                   placeholder='Course Name'
                                   onChange={(e)=> setCourseName(e.target.value)}
                                   value={courseName} required
                               />
                            </div>
                        </div>

                         {/* Hour per class */}
                        <div className="form-group row mb-1">
                            <label    className="col-sm-4 col-form-label">Hour Per Class</label>
                            <div className="col-sm-8">
                               <input 
                                  type="number" 
                                  className="form-control" 
                                  placeholder='Hour Per Class'
                                  onChange={(e)=> setHourPerClass(e.target.value)}
                                  value={hourPerClass} required
                               />
                            </div>
                        </div>
                        
                        {/* class per week */}
                        <div className="form-group row mb-1">
                            <label className="col-sm-4 col-form-label">Class Per Week</label>
                            <div className="col-sm-8">
                             <input 
                                type="number"
                                className="form-control" 
                                placeholder="Class Per Week"
                                name="ClassPerWeek" 
                                onChange={(e)=> setClassPerWeek(e.target.value)}
                                value={classPerWeek} required
                              />
                            </div>
                        </div>

                        {/*------  Total class-------*/}
                     
                        <div className="form-group row mb-1">
                            <label className="col-sm-4 col-form-label">Total Class</label>
                            <div className="col-sm-8">
                                 <input 
                                    type="number"
                                    className="form-control" 
                                    placeholder="Total Class"
                                    onChange={(e)=> setTotalClass(e.target.value)}
                                    value={totalClass} required
                                />
                                  
                                    
                            </div>
                        </div>

                        {/* Total Class Hour */}
                        <div className="form-group row mb-1">
                            <label className="col-sm-4 col-form-label">Total Class Hour</label>
                            <div className="col-sm-8">
                                <input 
                                    type="number"
                                    className="form-control" 
                                    placeholder="Total Class Hour"
                                    onChange={(e)=> setTotalClassHour(e.target.value)}
                                    value={totalClassHour} required
                                />
                                     
                            </div>
                        </div>

                        {/*Course Starting Date */}

                        <div className="form-group row mb-1">
                            <label className="col-sm-4 col-form-label">Course Start Date</label>
                            <div className="col-sm-8 d-flex wrap">
                            <div>
                                <select 
                                   className="form-control input-lg"
                                   onChange={ e=> setCourseStartMonth(e.target.value)} required
                                   
                                >
                                    <option disabled selected>Month</option>
                                    <option value="01" >Jan</option>
                                    <option value="02" >Feb</option>
                                    <option value="03" >Mar</option>
                                    <option value="04" >Apr</option>
                                    <option value="05" >May</option>
                                    <option value="06" >Jun</option>
                                    <option value="07" >Jul</option>
                                    <option value="08" >Aug</option>
                                    <option value="09" >Sep</option>
                                    <option value="10" >Oct</option>
                                    <option value="11" >Nov</option>
                                    <option value="12" >Dec</option>
                                </select>
                            </div>

                            <div className="mx-4">
                            <select 
                              className="form-control input-lg"
                              onChange={(e)=> setCourseStartDay(e.target.value)} required
                            >
                                <option disabled selected>Day</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            </div>

                            <div className="mx-1">
                                <select
                                    onClick={year}
                                    id="ddlYears"
                                    className="form-control input-lg px-2"
                                    name="CourseStartYear" 
                                    onChange={(e)=> setCourseStartYear(e.target.value)}
                                    value={courseStartYear} required
                                    
                                >
                                    <option disabled selected>Year</option>
                                    </select>
                            </div>
                                    
                            </div>
                        </div>
                        
                        {/*Course Ending Date */}

                        <div className="form-group row mb-1">
                            <label className="col-sm-4 col-form-label">Course End Date</label>
                            <div className="col-sm-8 d-flex wrap">
                            <div>
                                <select 
                                  className="form-control input-lg"
                                  onChange={(e)=> setCourseEndMonth(e.target.value)}
                                   required
                                >
                                    <option disabled selected>Month</option>
                                    <option value="01">Jan</option>
                                    <option value="02">Feb</option>
                                    <option value="03">Mar</option>
                                    <option value="04">Apr</option>
                                    <option value="05">May</option>
                                    <option value="06">Jun</option>
                                    <option value="07">Jul</option>
                                    <option value="08">Aug</option>
                                    <option value="09">Sep</option>
                                    <option value="10">Oct</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                            </div>

                            <div className="mx-4">
                            <select 
                               className="form-control input-lg"
                               onChange={(e)=> setCourseEndDay(e.target.value)} required
                               
                            >
                                <option disabled selected>Day</option>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                                <option value="6" >6</option>
                                <option value="7" >7</option>
                                <option value="8" >8</option>
                                <option value="9" >9</option>
                                <option value="10" >10</option>
                                <option value="11" >11</option>
                                <option value="12" >12</option>
                                <option value="13" >13</option>
                                <option value="14" >14</option>
                                <option value="15" >15</option>
                                <option value="16" >16</option>
                                <option value="17" >17</option>
                                <option value="18" >18</option>
                                <option value="19" >19</option>
                                <option value="20" >20</option>
                                <option value="21" >21</option>
                                <option value="22" >22</option>
                                <option value="23" >23</option>
                                <option value="24" >24</option>
                                <option value="25" >25</option>
                                <option value="26" >26</option>
                                <option value="27" >27</option>
                                <option value="28" >28</option>
                                <option value="29" >29</option>
                                <option value="30" >30</option>
                                <option value="31" >31</option>
                            </select>
                            </div>

                            <div className="mx-1">
                                <select
                                    onClick={date}
                                    id="ddYears"
                                    className="form-control input-lg px-2"
                                    onChange={(e)=> setCourseEndYear(e.target.value)}
                                    value={courseEndYear} required
                                >
                                      <option disabled selected>Year</option>
                                    </select>
                            </div>
                                    
                            </div>
                        </div>

                        {/* Class Routine */}

                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Class Routine</label>
                            <div className="col-sm-8">
                             <div className='d-flex flex-wrap gap-3'>
                                <div >
                                    <Form.Check 
                                        label="Sat"
                                        onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open} required
                                    
                                    />
                                    <Collapse in={open}>
                                        <input onChange={ (e) => satTime(e.target.value)}  type="time" className="form-control"/>
                                    </Collapse>
                                </div>
                                <div >
                                    <Form.Check 
                                        label="Sun"
                                
                                            onClick={() => setOpen1(!open1)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={open1}
                                     
                                    />
                                    <Collapse in={open1}>
                                          <input onChange={ (e) =>sunTime(e.target.value)}   type="time" className="form-control"/>
                                    </Collapse>

                                </div>
                                <div >
                                    <Form.Check 
                                        label="Mon"
                                
                                            onClick={() => setOpen2(!open2)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={open2}
                                     
                                    />
                                    <Collapse in={open2}>
                                          <input  onChange={(e) => monTime(e.target.value)}  type="time" className="form-control"/>
                                    </Collapse>

                                </div>
                                <div >
                                    <Form.Check 
                                        label="Tue"
                                
                                            onClick={() => setOpen3(!open3)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={open3}
                                     
                                    />
                                    <Collapse in={open3}>
                                          <input  onChange={(e) =>tueTime(e.target.value)}  type="time" className="form-control"/>
                                    </Collapse>

                                </div>
                                <div >
                                    <Form.Check 
                                        label="Wed"
                                
                                            onClick={() => setOpen4(!open4)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={open4}
                                     
                                    />
                                    <Collapse in={open4}>
                                          <input onChange={(e) =>wedTime(e.target.value)}   type="time" className="form-control"/>
                                    </Collapse>

                                </div>
                                <div >
                                    <Form.Check 
                                        label="Thu"
                                
                                            onClick={() => setOpen5(!open5)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={open5}
                                     
                                    />
                                    <Collapse in={open5}>
                                          <input onChange={(e) =>thuTime(e.target.value)}   type="time" className="form-control"/>
                                    </Collapse>

                                </div>
                                <div >
                                    <Form.Check 
                                        label="Fri"
                                
                                            onClick={() => setOpen6(!open6)}
                                            aria-controls="example-collapse-text"
                                            aria-expanded={open6}
                                     
                                    />
                                    <Collapse in={open6}>
                                          <input onChange={(e) =>friTime(e.target.value)}   type="time" className="form-control"/>
                                    </Collapse>

                                </div>
                                
                                
                             </div>
                            </div>
                        </div>

                        {/* Course Topic */}

                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Course Topic</label>
                            <div className="col-sm-8">
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                placeholder="Course Topic"
                                onChange={(e)=> setCourseTopic(e.target.value)}
                                value={courseTopic} required
                                
                                
                            />
                            </div>
                        </div>
                       
                       {/* Course Outcome */}

                       <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Course Outcome</label>
                            <div className="col-sm-8">
                              <Form.Control 
                                 placeholder="Course Outcome"
                                 as="textarea" 
                                 rows={3}
                                 onChange={(e)=> setCourseOutcome(e.target.value)}
                                 value={courseOutcome} required
                              />
                            </div>
                        </div>

                        {/* Course Reward */}
                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Course Reward</label>
                            <div className="col-sm-8">
                            <input 
                               type="text" 
                               className="form-control" 
                               placeholder="Course Reward"
                               onChange={(e)=> setCourseReward(e.target.value)}
                               value={courseReward} required
                            />
                            </div>
                        </div>

                        {/* Enrollment Requirement */}
                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Enrollment Requirement</label>
                            <div className="col-sm-8">
                             <Form.Control 
                             placeholder="Enrollment Requirement"
                               as="textarea" 
                               rows={3}
                               onChange={(e)=> setEnrollmentRequirement(e.target.value)}
                               value={enrollmentRequirement} required
                             />
                            </div>
                        </div>

                        {/* Course Responsibility */}
                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Course Responsibility</label>
                            <div className="col-sm-8">
                             <Form.Control 
                               placeholder="Course Responsibility"
                               as="textarea" 
                               rows={3}
                               onChange={(e)=> setCourseResponsibility(e.target.value)}
                               value={courseResponsibility} required
                             />
                            </div>
                        </div>


                    {/* Enrollment Starting Date */}

                        <div className="form-group row mb-1">
                            <label className="col-sm-4 col-form-label">Enrollment Starting Date</label>
                            <div className="col-sm-8 d-flex wrap">
                            <div>
                                <select 
                                   className="form-control input-lg"
                                   onChange={(e)=> setEnrollmentStartMonth(e.target.value)}
                                   value={enrollmentStartMonth} required
                                >
                                    <option disabled selected>Month</option>
                                    <option value="01" >Jan</option>
                                    <option value="02" >Feb</option>
                                    <option value="03" >Mar</option>
                                    <option value="04" >Apr</option>
                                    <option value="05" >May</option>
                                    <option value="06" >Jun</option>
                                    <option value="07" >Jul</option>
                                    <option value="08" >Aug</option>
                                    <option value="09" >Sep</option>
                                    <option value="10" >Oct</option>
                                    <option value="11" >Nov</option>
                                    <option value="12" >Dec</option>
                                </select>
                            </div>

                            <div className="mx-4">
                            <select 
                              className="form-control input-lg"
                              onChange={(e)=> setEnrollmentStartDay(e.target.value)}
                              value={enrollmentStartDay} required
                            >
                                <option disabled selected>Day</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            </div>

                            <div className="mx-1">
                                <select
                                    onClick={start }
                                    id="enStart"
                                    className="form-control input-lg px-2"
                                    name="CourseStartYear" 
                                    onChange={(e)=> setEnrollmentStartYear(e.target.value)}
                                    value={enrollmentStartYear} required
                                >
                                      <option disabled selected>Year</option>
                                    </select>
                            </div>
                                    
                            </div>
                        </div>

                      
                        {/* Enrollment Ending Date */}

                        <div className="form-group row mb-1">
                            <label className="col-sm-4 col-form-label">Enrollment Ending Date</label>
                            <div className="col-sm-8 d-flex wrap">
                            <div>
                                <select 
                                  className="form-control input-lg"
                                  onChange={(e)=> setEnrollmentEndMonth(e.target.value)}
                                  value={enrollmentEndMonth} required
                                >
                                    <option disabled selected>Month</option>
                                    <option value="01">Jan</option>
                                    <option value="02">Feb</option>
                                    <option value="03">Mar</option>
                                    <option value="04">Apr</option>
                                    <option value="05">May</option>
                                    <option value="06">Jun</option>
                                    <option value="07">Jul</option>
                                    <option value="08">Aug</option>
                                    <option value="09">Sep</option>
                                    <option value="10">Oct</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                            </div>

                            <div className="mx-4">
                            <select 
                               className="form-control input-lg"
                               onChange={(e)=> setEnrollmentEndDay(e.target.value)}
                               value={enrollmentEndDay} required
                            >
                                <option disabled selected>Day</option>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                                <option value="6" >6</option>
                                <option value="7" >7</option>
                                <option value="8" >8</option>
                                <option value="9" >9</option>
                                <option value="10" >10</option>
                                <option value="11" >11</option>
                                <option value="12" >12</option>
                                <option value="13" >13</option>
                                <option value="14" >14</option>
                                <option value="15" >15</option>
                                <option value="16" >16</option>
                                <option value="17" >17</option>
                                <option value="18" >18</option>
                                <option value="19" >19</option>
                                <option value="20" >20</option>
                                <option value="21" >21</option>
                                <option value="22" >22</option>
                                <option value="23" >23</option>
                                <option value="24" >24</option>
                                <option value="25" >25</option>
                                <option value="26" >26</option>
                                <option value="27" >27</option>
                                <option value="28" >28</option>
                                <option value="29" >29</option>
                                <option value="30" >30</option>
                                <option value="31" >31</option>
                            </select>
                            </div>

                            <div className="mx-1">
                                <select
                                    onClick={end }
                                    id="enEnd"
                                    className="form-control input-lg px-2"
                                    onChange={(e)=> setEnrollmentEndYear(e.target.value)}
                                    value={enrollmentEndYear} required
                                >
                                    <option disabled selected>Year</option>
                                    </select>
                            </div>
                                    
                            </div>
                        </div>
                        {/* Enrolment fee */}
                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Enrollment Fee</label>
                            <div className="col-sm-8">
                            <input 
                              type="number" 
                              className="form-control"  
                              placeholder="Enrollment Fee"
                              onChange={(e)=> setEnrollmentFee(e.target.value)}
                              value={enrollmentFee} required
                            />
                            </div>
                        </div>

                        {/* Payment Procedure */}
                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Payment Procedure</label>
                            <div className="col-sm-8">
                            <input 
                               type="text" 
                               className="form-control" 
                               placeholder="Course Payment Procedure"
                               onChange={(e)=> setPaymentProcedure(e.target.value)}
                               value={paymentProcedure} required
                            />
                            </div>
                        </div>

                        {/* Expected Student */}
                        <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Expected Student</label>
                            <div className="col-sm-8">
                                <div>
                                <select 
                                    className="form-control input-lg"
                                    name="MaximumStudent"
                                    onChange={e=> setExpectedStudent(e.target.value)}
                                    value={expectedStudent} required
                                    >
                                    <option selected disabled>expected-student</option>
                                    <option value="10" >1-10</option>
                                    <option value="20" >1-20</option>
                                    <option value="20" >1-30</option>
                                    <option value="40" >1-40</option>
                                    <option value="50" >1-50</option>
                                    <option value="60" >1-60</option>
                                    <option value="70" >1-70</option>
                                    <option value="80" >1-80</option>
                                    <option value="90" >1-90</option>
                                    <option value="100" >1-100</option>
                                </select>
                                </div>
                            </div>
                        </div>

                        {/* disclaimer from group */}

                         <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Disclaimer From Group</label>
                            <div className="col-sm-8">
                             <Form.Control 
                               placeholder="Disclaimer From Group"
                               as="textarea" 
                               rows={3}
                               onChange={(e)=> setDisclaimer(e.target.value)}
                               value={disclaimer} required
                             />
                            </div>
                        </div>

                        
                 
                        {/* Course Teacher */}
                        {/* <div className="form-group row mb-1">
                            <label   className="col-sm-4 col-form-label">Course Teacher</label>
                           
                                <div className='col-sm-8'>
                                {serviceList.map((singleService, index) => (
                            <div >
                                <select key={index}
                                    name="Course Teacher"
                                    type="text"
                                    value={singleService.service}
                                    onClick={ (e) => {handleServiceChange(e, index)} }  
                                    className="input-lg form-control"
                                    onChange={(e) =>setCourseTeacher(e.target.value)} required
                                    >
                                    <option disabled selected>Select Teacher</option> 
                                    <option value="1">Saddam Hossain</option>
                                    <option value="2">Saddam Hossain</option>
                                    <option value="3">Saddam Hossain</option>
                                </select> */}
                                
                                    {/* <div className='d-flex justify-content-end'>
                                        <div>                                                
                                            {serviceList.length - 1 === index && serviceList.length < 10 && (
                                                        <button
                                                            type="button"
                                                            onClick={handleServiceAdd}
                                                            className="btn btn-outline-success mb-1  mt-1
                                                            "
                                                        >
                                                    +
                                                </button>
                                                )}
                                        </div>


                                            <div className=''>
                                                    {serviceList.length !== 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleServiceRemove(index)}
                                                        className="btn btn-outline-danger mt-1 ms-1 mb-1 "
                                                    >
                                                        -
                                                    </button>
                                                )}
                                            </div>
                                    </div> */}
                                {/* </div>                                 
                                ))}
                                </div>

                        </div> */}


                    <div className='text-end my-2'>
                        <Button onClick={()=> handleCreateCourseFormData()} className='btn-primary'>Submit</Button>
                    </div>
                    </Row>
                   
                </Form>
          
        </Container>
    );
};

export default CreateCourse;