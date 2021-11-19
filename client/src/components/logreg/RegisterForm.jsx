import React, { useState } from 'react'
import { Link, navigate } from '@reach/router';
import { Icon } from '@iconify/react';
import axios from 'axios';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // Validation states
    const [fnVal, setFnVal] = useState(false)
    const [lnVal, setLnVal] = useState(false)
    const [emailVal, setEmailVal] = useState(false)
    const [pwVal, setPwVal] = useState(false)
    const [confirmPwVal, setConfirmPwVal] = useState(false)
    // Backend validation 
    const [fnError, setFnError] = useState();
    const [lnError, setLnError] = useState();
    const [emailError, setEmailError] = useState();
    const [pwError, setPwError] = useState();
    const [confirmPwError, setConfirmPwError] = useState();


    const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // name is used htmlFor validation purposes on input tags
    const frontEndValidation = e => {
        setFnError();
        setLnError();
        setEmailError();
        setPwError();
        setConfirmPwError();
        if (e.target.name === "firstName") {
            setFirstName(e.target.value);
            firstName.length < 3 ? setFnVal(true) : setFnVal(false)
        } else if (e.target.name === "lastName") {
            setLastName(e.target.value);
            lastName.length < 3 ? setLnVal(true) : setLnVal(false)
        } else if (e.target.name === "email") {
            setEmail(e.target.value)
            emailRE.test(email) ? setEmailVal(false) : setEmailVal(true) // confusing reversal
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
            password.length < 7 ? setPwVal(true) : setPwVal(false)
        } else if (e.target.name === "confirmPW") {
            console.log(password, e.target.value)
            setConfirmPassword(e.target.value)
            e.target.value === password ? setConfirmPwVal(false) : setConfirmPwVal(true) // confusing reversal
        }
    }

    const handleRegistration = (e, user) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/', user, {withCredentials: true})
            .then(res => {
                console.log(res);
                sessionStorage.setItem("userId", res.data.userId);
                navigate('/dashboard');
            })
            .catch(err => { 
                console.log("Registration error"); 
                console.log(err.response);
                if(err.response.data.errors.email) setEmailError(err.response.data.errors.email.message)
                if(err.response.data.errors.firstName) setFnError(err.response.data.errors.firstName.message)
                if(err.response.data.errors.lastName) setLnError(err.response.data.errors.lastName.message)
                if(err.response.data.errors.password) setPwError(err.response.data.errors.password.message)
                if(err.response.data.errors.confirmPassword) setConfirmPwError(err.response.data.errors.confirmPassword.message)
            })
    }
    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-1">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: `1000px` }}>
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-cyan-600 py-5 px-10">
                        {/* <svg id="a87032b8-5b37-4b7e-a4d9-4dbfbe394641" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 744.84799 747.07702"><path id="fa3b9e12-7275-481e-bee9-64fd9595a50d" data-name="Path 1" d="M299.205,705.80851l-6.56-25.872a335.96693,335.96693,0,0,0-35.643-12.788l-.828,12.024-3.358-13.247c-15.021-4.29394-25.24-6.183-25.24-6.183s13.8,52.489,42.754,92.617l33.734,5.926-26.207,3.779a135.92592,135.92592,0,0,0,11.719,12.422c42.115,39.092,89.024,57.028,104.773,40.06s-5.625-62.412-47.74-101.5c-13.056-12.119-29.457-21.844-45.875-29.5Z" transform="translate(-227.576 -76.46149)" fill="#f2f2f2" /><path id="bde08021-c30f-4979-a9d8-cb90b72b5ca2" data-name="Path 2" d="M361.591,677.70647l7.758-25.538a335.93951,335.93951,0,0,0-23.9-29.371l-6.924,9.865,3.972-13.076c-10.641-11.436-18.412-18.335-18.412-18.335s-15.315,52.067-11.275,101.384l25.815,22.51-24.392-10.312a135.91879,135.91879,0,0,0,3.614,16.694c15.846,55.234,46.731,94.835,68.983,88.451s27.446-56.335,11.6-111.569c-4.912-17.123-13.926-33.926-24.023-48.965Z" transform="translate(-227.576 -76.46149)" fill="#f2f2f2" /><path id="b3ac2088-de9b-4f7f-bc99-0ed9705c1a9d" data-name="Path 22" d="M747.327,253.4445h-4.092v-112.1a64.883,64.883,0,0,0-64.883-64.883H440.845a64.883,64.883,0,0,0-64.883,64.883v615a64.883,64.883,0,0,0,64.883,64.883H678.352a64.883,64.883,0,0,0,64.882-64.883v-423.105h4.092Z" transform="translate(-227.576 -76.46149)" fill="#e6e6e6" /><path id="b2715b96-3117-487c-acc0-20904544b5b7" data-name="Path 23" d="M680.97,93.3355h-31a23.02,23.02,0,0,1-21.316,31.714H492.589a23.02,23.02,0,0,1-21.314-31.714H442.319a48.454,48.454,0,0,0-48.454,48.454v614.107a48.454,48.454,0,0,0,48.454,48.454H680.97a48.454,48.454,0,0,0,48.454-48.454h0V141.7885a48.454,48.454,0,0,0-48.454-48.453Z" transform="translate(-227.576 -76.46149)" fill="#fff" /><path id="b06d66ec-6c84-45dd-8c27-1263a6253192" data-name="Path 6" d="M531.234,337.96451a24.437,24.437,0,0,1,12.23-21.174,24.45,24.45,0,1,0,0,42.345A24.43391,24.43391,0,0,1,531.234,337.96451Z" transform="translate(-227.576 -76.46149)" fill="#ccc" /><path id="e73810fe-4cf4-40cc-8c7c-ca544ce30bd4" data-name="Path 7" d="M561.971,337.96451a24.43594,24.43594,0,0,1,12.23-21.174,24.45,24.45,0,1,0,0,42.345A24.43391,24.43391,0,0,1,561.971,337.96451Z" transform="translate(-227.576 -76.46149)" fill="#ccc" /><circle id="a4813fcf-056e-4514-bb8b-e6506f49341f" data-name="Ellipse 1" cx="364.43401" cy="261.50202" r="24.45" fill="#22D3EE" /><path id="bbe451c3-febc-41ba-8083-4c8307a2e73e" data-name="Path 8" d="M632.872,414.3305h-142.5a5.123,5.123,0,0,1-5.117-5.117v-142.5a5.123,5.123,0,0,1,5.117-5.117h142.5a5.123,5.123,0,0,1,5.117,5.117v142.5A5.123,5.123,0,0,1,632.872,414.3305Zm-142.5-150.686a3.073,3.073,0,0,0-3.07,3.07v142.5a3.073,3.073,0,0,0,3.07,3.07h142.5a3.073,3.073,0,0,0,3.07-3.07v-142.5a3.073,3.073,0,0,0-3.07-3.07Z" transform="translate(-227.576 -76.46149)" fill="#ccc" /><rect id="bb28937d-932f-4fdf-befe-f406e51091fe" data-name="Rectangle 1" x="218.56201" y="447.10197" width="218.552" height="2.047" fill="#ccc" /><circle id="fcef55fc-4968-45b2-93bb-1a1080c85fc7" data-name="Ellipse 2" cx="225.46401" cy="427.41999" r="6.902" fill="#22D3EE" /><rect id="ff33d889-4c74-4b91-85ef-b4882cc8fe76" data-name="Rectangle 2" x="218.56201" y="516.11803" width="218.552" height="2.047" fill="#ccc" /><circle id="e8fa0310-b872-4adf-aedd-0c6eda09f3b8" data-name="Ellipse 3" cx="225.46401" cy="496.43702" r="6.902" fill="#22D3EE" /><path d="M660.69043,671.17188H591.62207a4.50493,4.50493,0,0,1-4.5-4.5v-24.208a4.50492,4.50492,0,0,1,4.5-4.5h69.06836a4.50491,4.50491,0,0,1,4.5,4.5v24.208A4.50492,4.50492,0,0,1,660.69043,671.17188Z" transform="translate(-227.576 -76.46149)" fill="#22D3EE" /><circle id="e12ee00d-aa4a-4413-a013-11d20b7f97f7" data-name="Ellipse 7" cx="247.97799" cy="427.41999" r="6.902" fill="#22D3EE" /><circle id="f58f497e-6949-45c8-be5f-eee2aa0f6586" data-name="Ellipse 8" cx="270.492" cy="427.41999" r="6.902" fill="#22D3EE" /><circle id="b4d4939a-c6e6-4f4d-ba6c-e8b05485017d" data-name="Ellipse 9" cx="247.97799" cy="496.43702" r="6.902" fill="#22D3EE" /><circle id="aff120b1-519b-4e96-ac87-836aa55663de" data-name="Ellipse 10" cx="270.492" cy="496.43702" r="6.902" fill="#22D3EE" /><path id="f1094013-1297-477a-ac57-08eac07c4bd5" data-name="Path 88" d="M969.642,823.53851H251.656c-1.537,0-2.782-.546-2.782-1.218s1.245-1.219,2.782-1.219H969.642c1.536,0,2.782.546,2.782,1.219S971.178,823.53851,969.642,823.53851Z" transform="translate(-227.576 -76.46149)" fill="#3f3d56" /><path d="M792.25256,565.92292a10.09371,10.09371,0,0,1,1.41075.78731l44.8523-19.14319,1.60093-11.81526,17.92157-.10956-1.05873,27.0982-59.19987,15.65584a10.60791,10.60791,0,0,1-.44749,1.20835,10.2346,10.2346,0,1,1-5.07946-13.68169Z" transform="translate(-227.576 -76.46149)" fill="#ffb8b8" /><polygon points="636.98 735.021 624.72 735.021 618.888 687.733 636.982 687.734 636.98 735.021" fill="#ffb8b8" /><path d="M615.96281,731.51778h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H601.076a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,615.96281,731.51778Z" fill="#2f2e41" /><polygon points="684.66 731.557 672.459 732.759 662.018 686.271 680.025 684.497 684.66 731.557" fill="#ffb8b8" /><path d="M891.68576,806.12757h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H876.7989a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,891.68576,806.12757Z" transform="translate(-303.00873 15.2906) rotate(-5.62529)" fill="#2f2e41" /><circle cx="640.3925" cy="384.57375" r="24.56103" fill="#ffb8b8" /><path d="M849.55636,801.91945a4.47086,4.47086,0,0,1-4.415-3.69726c-6.34571-35.22559-27.08789-150.40528-27.584-153.59571a1.42684,1.42684,0,0,1-.01562-.22168v-8.58789a1.489,1.489,0,0,1,.27929-.87207l2.74024-3.83789a1.47845,1.47845,0,0,1,1.14355-.625c15.62207-.73242,66.78418-2.8789,69.25586.209h0c2.48242,3.10351,1.60547,12.50683,1.4043,14.36035l.00977.19336,22.98535,146.99512a4.51238,4.51238,0,0,1-3.71485,5.13476l-14.35644,2.36524a4.52127,4.52127,0,0,1-5.02539-3.09278c-4.44043-14.18847-19.3291-61.918-24.48926-80.38672a.49922.49922,0,0,0-.98047.13868c.25781,17.60546.88086,62.52343,1.0957,78.0371l.02344,1.6709a4.51811,4.51811,0,0,1-4.09277,4.53614l-13.84375,1.25781C849.83565,801.91359,849.695,801.91945,849.55636,801.91945Z" transform="translate(-227.576 -76.46149)" fill="#2f2e41" /><path id="ae7af94f-88d7-4204-9f07-e3651de85c05" data-name="Path 99" d="M852.38089,495.2538c-4.28634,2.548-6.85116,7.23043-8.32276,11.9951a113.681,113.681,0,0,0-4.88444,27.15943l-1.55553,27.60021-19.25508,73.1699c16.68871,14.1207,26.31542,10.91153,48.78049-.63879s25.03222,3.85117,25.03222,3.85117l4.49236-62.25839,6.41837-68.03232a30.16418,30.16418,0,0,0-4.86143-4.67415,49.65848,49.65848,0,0,0-42.44229-8.99538Z" transform="translate(-227.576 -76.46149)" fill="#ffffff" /><path d="M846.12661,580.70047a10.52561,10.52561,0,0,1,1.50061.70389l44.34832-22.1972.736-12.02551,18.2938-1.26127.98041,27.4126L852.7199,592.93235a10.4958,10.4958,0,1,1-6.59329-12.23188Z" transform="translate(-227.576 -76.46149)" fill="#ffb8b8" /><path id="a6768b0e-63d0-4b31-8462-9b2e0b00f0fd" data-name="Path 101" d="M902.76552,508.41151c10.91151,3.85117,12.83354,45.57369,12.83354,45.57369-12.8367-7.06036-28.24139,4.49318-28.24139,4.49318s-3.20916-10.91154-7.06034-25.03223a24.52987,24.52987,0,0,1,5.13436-23.10625S891.854,504.558,902.76552,508.41151Z" transform="translate(-227.576 -76.46149)" fill="#ffffff" /><path id="bfd7963f-0cf8-4885-9d3a-2c00bccda2e3" data-name="Path 102" d="M889.99122,467.53052c-3.06-2.44837-7.23517,2.00173-7.23517,2.00173l-2.4484-22.03349s-15.30095,1.8329-25.0935-.61161-11.32255,8.87513-11.32255,8.87513a78.57978,78.57978,0,0,1-.30582-13.77092c.61158-5.50838,8.56838-11.01675,22.6451-14.68932S887.6518,439.543,887.6518,439.543C897.44542,444.43877,893.05121,469.97891,889.99122,467.53052Z" transform="translate(-227.576 -76.46149)" fill="#2f2e41" /></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="100%" height="auto" viewBox="0 0 1099.09883 743.3527">
                            <path d="M801.80523,220.42655a67.60089,67.60089,0,0,0-97.12642-1.736L362.65439,560.71746a48.2952,48.2952,0,0,1-68.11864.10222l-50.65514-50.55353a67.43765,67.43765,0,0,0-95.391,0l-98.039,98.145H1149.54942V594.4196Z" transform="translate(-50.45058 -78.32365)" fill="#f0f0f0" />
                            <path d="M401.24912,790.65894c-57.79712-18.19287-114.629-18.19531-168.91662-.00537l-.6355-1.89648c54.69678-18.32715,111.94421-18.3291,170.15271-.00586Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M1004.24912,745.65894c-57.79687-18.19336-114.62866-18.1958-168.91675-.00537l-.63525-1.89648c54.69629-18.32715,111.94409-18.3291,170.15259-.00586Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <ellipse cx="909.63045" cy="286.85329" rx="216.76417" ry="140.55313" transform="translate(264.35953 954.11742) rotate(-68.92033)" fill="#11b981" />
                            <path d="M825.77409,649.63655a1.87392,1.87392,0,0,1-1.853-1.60989c-.07961-.55941-7.87821-56.80384-.87419-131.555,6.46825-69.03453,27.2404-168.46855,89.46567-250.13212a1.8741,1.8741,0,1,1,2.98126,2.27179c-61.68782,80.95836-82.29252,179.66277-88.71517,248.20988-6.96329,74.31625.77414,130.12207.85314,130.6772a1.87558,1.87558,0,0,1-1.85772,2.13819Z" transform="translate(-50.45058 -78.32365)" fill="#3f3d56" />
                            <path d="M856.88032,374.32139a1.874,1.874,0,0,1-1.10326-3.39c.22587-.1641,22.98965-16.56624,57.02117-29.02691,31.45959-11.51755,79.2986-21.959,128.548-6.28463a1.87383,1.87383,0,1,1-1.1365,3.57118c-48.24041-15.35226-95.21225-5.08347-126.1228,6.23338-33.54578,12.28254-55.88467,28.37782-56.10642,28.53888A1.86666,1.86666,0,0,1,856.88032,374.32139Z" transform="translate(-50.45058 -78.32365)" fill="#3f3d56" />
                            <ellipse cx="290.76286" cy="337.84206" rx="140.55313" ry="216.76417" transform="translate(-152.5033 48.86177) rotate(-21.07967)" fill="#11b981" />
                            <path d="M374.61922,700.62532a1.87392,1.87392,0,0,0,1.853-1.60989c.07961-.55941,7.87821-56.80385.87419-131.55505-6.46825-69.03453-27.2404-168.46855-89.46567-250.13212a1.8741,1.8741,0,1,0-2.98126,2.27179c61.68782,80.95836,82.29252,179.66277,88.71517,248.20988,6.96329,74.31625-.77414,130.12207-.85314,130.6772a1.87558,1.87558,0,0,0,1.85772,2.13819Z" transform="translate(-50.45058 -78.32365)" fill="#3f3d56" />
                            <path d="M343.513,425.31016a1.874,1.874,0,0,0,1.10326-3.39c-.22587-.1641-22.98965-16.56624-57.02117-29.02691-31.45959-11.51755-79.2986-21.959-128.548-6.28463a1.87383,1.87383,0,1,0,1.1365,3.57117c48.24041-15.35225,95.21225-5.08346,126.1228,6.23339,33.54578,12.28254,55.88467,28.37782,56.10642,28.53887A1.86663,1.86663,0,0,0,343.513,425.31016Z" transform="translate(-50.45058 -78.32365)" fill="#3f3d56" />
                            <path d="M277.17942,780.263c-.09607-.28809-9.41394-29.11865,7.077-54.84473l1.68383,1.0791c-15.96325,24.90332-6.95617,52.85449-6.86328,53.13379Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M295.38547,729.85692a13.11313,13.11313,0,0,1-25.24313-7.11345c1.96433-6.97069,13.85849-24.2638,20.82919-22.29948S297.3498,722.88622,295.38547,729.85692Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M293.65964,762.261c-6.32428,6.83412-17.63826,6.64871-17.63826,6.64871s-1.06029-11.26571,5.264-18.09983,17.63825-6.64871,17.63825-6.64871S299.98392,755.42691,293.65964,762.261Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M936.1793,731.263c-.096-.28809-9.41382-29.11865,7.07739-54.84473l1.68359,1.0791c-15.96337,24.90332-6.95629,52.85449-6.86352,53.13379Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M955.049,680.11788a13.11313,13.11313,0,1,1-25.6618-5.41187c1.49445-7.08632,14.16421-24.72239,21.25052-23.22794S956.54342,673.03157,955.049,680.11788Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M952.65964,713.261c-6.32428,6.83412-17.63826,6.64871-17.63826,6.64871s-1.06029-11.26571,5.264-18.09983,17.63825-6.64871,17.63825-6.64871S958.98392,706.42691,952.65964,713.261Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M376.54942,698.94947s125-266,264-225,43,254,43,254Z" transform="translate(-50.45058 -78.32365)" fill="#cacaca" />
                            <polygon points="323.889 627.22 340.889 604.22 512.889 548.22 802.099 576.626 802.818 587.72 710.889 683.22 323.889 627.22" fill="#3f3d56" />
                            <polygon points="507.088 698.2 516.184 698.2 520.512 663.114 507.087 663.114 507.088 698.2" fill="#a0616a" />
                            <path d="M555.21834,773.55407l17.91409-.00072h.00073a11.41687,11.41687,0,0,1,11.41626,11.41608v.371l-29.33054.00109Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <polygon points="471.876 679.566 464.507 684.898 440.433 659.01 451.309 651.14 471.876 679.566" fill="#a0616a" />
                            <path d="M529.3755,763.67318l-23.76265,17.1935-.21748-.30055a11.41687,11.41687,0,0,1,2.55641-15.94123l.00059-.00042,14.51345-10.50116Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M532.28289,621.50265s-9.54378-7.14846-19.86308,0l-7.1422,59.57047H526.723l3.17709-19.06255,7.14846-28.59383Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M553.76733,713.50475l-38.4888-12.5679-18.34846,14.56022,19.49211,29.79939-10.195,13.37049-.29161-.33206c-1.26481-1.44055-30.97677-35.39486-30.89075-45.02514A72.45433,72.45433,0,0,1,478.3262,694.064l9.65165-13.69971,13.69847-4.02845,45.351,6.36484.074.0106,18.32339,11.15278a14.39474,14.39474,0,0,1,6.53405,10.5996c.78686,7.08194,2.36906,63.79468,2.385,64.36694l.01042.37162H554.563Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M529.356,699.27516c-6.68948-2.97294-15.23263-14.58142-16.64068-16.53912-2.75252,1.49848-22.8259,12.22666-28.48478,9.46849-.822.45357-4.53731,2.67056-5.20654,6.01583l-.16779.83932-.485-.70509c-.08938-.13-8.80774-13.09353,2.4708-21.15044,10.28379-7.34511,13.05044-14.76581,13.34028-15.615l-5.57993-29.49278.14642-.136c.45764-.425,11.32023-10.41943,21.23169-11.60812l6.114-1.07776.26741,23.27629V672.3491c4.94019-.621,12.75567-52.68724,12.75567-52.68724l4.08407,1.49649c1.05533.20241,12.91461,2.5713,16.06189,7.29212l.10226.15331L538.5792,657.76732l-3.15469,4.74979v6.07977l18.42989,16.02621-.26175.27412c-.62808.65775-14.21811,14.79267-22.13477,14.79055A5.13246,5.13246,0,0,1,529.356,699.27516Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <circle cx="471.88034" cy="517.23356" r="17.76878" fill="#a0616a" />
                            <path d="M517.85689,704.567a6.95739,6.95739,0,0,1,8.97207-5.772l10.18443-12.20867,8.92866,4.37953-14.62453,17.039a6.99511,6.99511,0,0,1-13.46063-3.4379Z" transform="translate(-50.45058 -78.32365)" fill="#a0616a" />
                            <path d="M525.05523,694.21381l15.97746-21.5694-3.95762-21.37087,6.42065-24.07711.16162-.06923c.12946-.05582,3.20255-1.35047,5.54159-.3801a3.74543,3.74543,0,0,1,2.08523,2.16683c1.58962,3.97406,5.42185,44.44687,5.584,46.23785-.03268.3271-.81936,8.04631-2.41923,11.246-1.59245,3.18489-16.11752,19.2549-16.735,19.93809l-.25522.28189Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M537.5947,590.98383c-5.9147,7.43881-16.052,6.07569-24.16312,3.35358a25.70407,25.70407,0,0,1-4.57319,16.78073c1.04744-4.21945-3.36516-5.05915-5.94-6.62827-.99133-1.25484-.16776-3.12774-.57463-4.67409-4.62338-5.42065-7.687-9.51026-1.75226-15.8712,3.47409-4.65045,7.64393-10.45672,14.26315-9.23518,5.23755-6.10994,13.82064-4.5209,19.67693-.247a41.83446,41.83446,0,0,1,7.13563,6.70543,28.40281,28.40281,0,0,1-3.70654,9.31054" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M602.54942,716.94947l154.28994,23.09444,95-85s-45-185-207-198-279,249-279,249l16.96615.72508s88.03385-203.72508,208.03385-209.72508S602.54942,716.94947,602.54942,716.94947Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <path d="M633.04942,527.44947h-102a21,21,0,0,1,0-42h102a21,21,0,0,1,0,42Z" transform="translate(-50.45058 -78.32365)" fill="#cacaca" />
                            <path d="M730.3984,653.96048a6.871,6.871,0,0,1-1.63629-10.408l-8.929-89.60106,14.90956.98936,4.13039,88.22976a6.90824,6.90824,0,0,1-8.47469,10.79Z" transform="translate(-50.45058 -78.32365)" fill="#ffb8b8" />
                            <path d="M740.78287,550.63262,736.874,580.34144l.54263,18.208-16.3981,1.50139L717.732,584.907l-1.81064-40.092a11.96428,11.96428,0,0,1,10.57038-12.424l0,0a11.96429,11.96429,0,0,1,13.24269,10.31533Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <polygon points="627.534 733.711 617.587 733.71 612.855 695.342 627.536 695.343 627.534 733.711" fill="#ffb7b7" />
                            <path d="M680.52123,821.67635l-32.07368-.00119v-.40568a12.48465,12.48465,0,0,1,12.484-12.48377h.0008l19.58951.00079Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <polygon points="709.669 733.711 699.722 733.71 694.99 695.342 709.671 695.343 709.669 733.711" fill="#ffb7b7" />
                            <path d="M762.65666,821.67635l-32.07368-.00119v-.40568a12.48465,12.48465,0,0,1,12.484-12.48377h.00079l19.58951.00079Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <circle cx="670.98867" cy="418.3789" r="21.56632" fill="#ffb8b8" />
                            <path d="M718.65257,527.02442l14.96654,1.71046,0,0a39.82721,39.82721,0,0,1,5.09257,35.96323l-11.293,32.669s15.67661,31.42737,15.67661,60.60613,29.8552,133.33194,29.8552,133.33194l-42.02416,4.3836L712.58981,684.736,687.32118,795.24161l-28.84648-4.69593,15.888-144.88471,10.49875-47.688.44724-23.25608s-4.464-17.45033,6.70848-28.62286l13.64059-19.00738Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M696.29933,489.00056h31.691v-13.814c-6.95582-2.76342-13.76245-5.11355-17.877,0a13.81411,13.81411,0,0,0-13.814,13.814Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M729.74485,472.74877c18.94548,0,24.24834,23.74741,24.24834,37.14453,0,7.47142-3.37891,10.14368-8.68852,11.04787l-1.87514-10.00069-4.39188,10.431c-1.49146.00744-3.05832-.02143-4.6827-.05158l-1.48909-3.06616-3.32058,3.01116c-13.29941.01979-24.04837,1.95846-24.04837-11.37164C705.49691,496.49618,710.14748,472.74877,729.74485,472.74877Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <polygon points="651.277 525.592 650.476 490.806 648.351 475.362 643.098 490.66 651.277 525.592" opacity="0.2" />
                            <path d="M762.84642,628.03179l-34.297-2.93129L727.10554,527.691l16.7212,1.07352a6.2429,6.2429,0,0,1,5.09141,3.29883l21.94122,41.62616L769.5771,622.0143a6.20584,6.20584,0,0,1-6.18684,6.04073Q763.11981,628.055,762.84642,628.03179Z" transform="translate(-50.45058 -78.32365)" fill="#11b981" />
                            <path d="M685.77068,562.98849c0-21.5674,13.12907-39.1137,29.26689-39.1137s29.26689,17.5463,29.26689,39.1137-13.12907,39.1137-29.26689,39.1137S685.77068,584.55589,685.77068,562.98849Zm3.82931,0c0,19.45588,11.41128,35.28438,25.43758,35.28438s25.43758-15.8285,25.43758-35.28438-11.41128-35.28439-25.43758-35.28439S689.6,543.53261,689.6,562.98849Z" transform="translate(-50.45058 -78.32365)" fill="#11b981" />
                            <polygon points="711.359 544.591 713.614 495.412 690.512 450.251 689.537 450.749 712.508 495.651 710.266 544.541 711.359 544.591" fill="#3f3d56" />
                            <path d="M705.58746,657.58106A7.52841,7.52841,0,0,1,704.416,646.0968l-4.44215-98.55952,16.25311,1.96877-.72626,96.774a7.56916,7.56916,0,0,1-9.91324,11.301Z" transform="translate(-50.45058 -78.32365)" fill="#ffb8b8" />
                            <path d="M723.09136,545.15177l-6.04273,32.27078-.48877,19.95291-18.02973.66777-2.69536-16.76362.40248-43.97062a13.10892,13.10892,0,0,1,12.3032-12.96419h0a13.10893,13.10893,0,0,1,13.875,12.07281Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                            <path d="M461.3515,692.055a3.96758,3.96758,0,0,1-3.95543-3.862l-.81979-30.89549L470.604,630.68467a3.99129,3.99129,0,0,1,3.2551-2.109l10.69036-.68633-.92312,62.27681-21.9271,1.87406Q461.52463,692.05528,461.3515,692.055Z" transform="translate(-50.45058 -78.32365)" fill="#11b981" />
                            <path d="M492.26483,675.4626c-10.31739,0-18.7112-11.21788-18.7112-25.00657s8.39381-25.00656,18.7112-25.00656S510.976,636.66735,510.976,650.456,502.58223,675.4626,492.26483,675.4626Zm0-47.56493c-8.96743,0-16.263,10.11963-16.263,22.55836s7.29558,22.55837,16.263,22.55837,16.263-10.11964,16.263-22.55837S501.23227,627.89767,492.26483,627.89767Z" transform="translate(-50.45058 -78.32365)" fill="#11b981" />
                            <polygon points="411.912 610.445 410.47 579.003 425.24 550.13 425.863 550.449 411.177 579.156 412.61 610.413 411.912 610.445" fill="#3f3d56" />
                            <path d="M536.58118,712.86688a1.60643,1.60643,0,0,1-.35647.0919l-14.97034,2.08975a1.61108,1.61108,0,0,1-1.73416-1.02211l-12.88594-33.53031a1.618,1.618,0,0,1,1.15788-2.15968h.00009l14.07807-3.1416a1.28646,1.28646,0,0,0,.31247-.1143l13.69292-7.1591a1.60214,1.60214,0,0,1,.33287-.12955l15.06915-4.01728a1.61484,1.61484,0,0,1,1.92716.98293l11.23575,29.23634a1.60993,1.60993,0,0,1-.21257,1.54683l-3.88576,5.21816a1.61585,1.61585,0,0,1-.71738.54386l-8.492,3.26357a1.27572,1.27572,0,0,0-.17645.08388l-14.15071,8.11008A1.61845,1.61845,0,0,1,536.58118,712.86688Z" transform="translate(-50.45058 -78.32365)" fill="#fff" />
                            <path d="M543.54617,668.24436l-1.9136.51036-5.071,1.35249-.00906.00207-6.94262,3.63015-2.57646,1.34741-.00119.00046-3.86959,2.023-.10613.02391-4.01985.89645-1.94278.43438-7.924,1.76816,12.43966,32.369,8.16557-1.13945,2.00215-.28,4.2674-.59638.04953-.00636,13.7127-7.85924,8.34316-3.20635,3.80927-5.11517-10.82847-28.17659Z" transform="translate(-50.45058 -78.32365)" fill="#e4e4e4" />
                            <rect x="510.54471" y="678.72611" width="44.1941" height="1.9693" transform="translate(-258.83076 157.99062) rotate(-21.02215)" fill="#fff" />
                            <rect x="512.89955" y="684.85361" width="44.1941" height="1.9693" transform="translate(-260.87214 159.2432) rotate(-21.02215)" fill="#fff" />
                            <rect x="517.65632" y="697.2311" width="44.1941" height="1.96932" transform="translate(-264.9957 161.77341) rotate(-21.02215)" fill="#fff" />
                            <polygon points="493.095 589.921 505.446 622.057 503.608 622.763 491.182 590.431 493.095 589.921" fill="#fff" />
                            <polygon points="479.16 595.416 476.623 602.472 475.744 604.919 473.693 610.631 473.253 611.851 472.813 613.078 472.234 614.689 468.077 626.259 466.996 623.447 470.386 614.011 471.153 611.875 471.265 611.564 472.172 609.038 473.316 605.853 474.196 603.405 476.581 596.764 476.583 596.763 479.16 595.416" fill="#fff" />
                            <polygon points="468.586 599.707 481.326 632.859 479.324 633.139 466.643 600.141 468.586 599.707" fill="#fff" />
                            <path d="M524.00625,709.76072a6.9574,6.9574,0,0,0-8.97208-5.772l-10.18442-12.20867-8.92867,4.37953,14.62454,17.039a6.99511,6.99511,0,0,0,13.46063-3.4379Z" transform="translate(-50.45058 -78.32365)" fill="#a0616a" />
                            <path d="M504.26634,707.57369c-.91085-.68318-22.33541-16.7864-24.729-21.57293-2.39715-4.795-1.803-18.99314-1.7719-19.63888.03727-.22326,3.76723-22.4119,6.92228-30.29924,3.27356-8.18373,11.50744-5.0006,11.59028-4.96739l.24886.09961-3.5853,41.82859,19.55623,25.94227-7.96754,8.80579Z" transform="translate(-50.45058 -78.32365)" fill="#2f2e41" />
                        </svg>                    </div>
                    <div className="w-full md:w-1/2 py-5 px-5 md:px-10">
                        <div className="text-center mb-6">
                            <h1 className="font-extrabold text-4xl text-gray-900 font-megrim">REGISTER</h1>
                            <p>Enter your information to register</p>
                        </div>
                        <form onSubmit={e => handleRegistration(e, { firstName, lastName, email, password, confirmPassword })}>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3 mb-3">
                                    <label htmlFor="" className="text-xs font-semibold px-1">First name</label>
                                    <div className="flex mb-3">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><Icon icon="mdi:account" className={(fnVal ? "text-red-400 " : "text-gray-400 ") + "text-lg"} /></div>
                                        <input name="firstName" onChange={e => { frontEndValidation(e) }} type="text" className={"w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"} placeholder="John" />
                                    </div>
                                    {fnError ? 
                                            <div class="alert p-2 alert-warning text-xs">
                                                <div class="flex-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                    </svg>
                                                    <label>{fnError}</label>
                                                </div>
                                            </div> : null}
                                </div>
                                <div className="w-1/2 px-3 mb-3">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Last name</label>
                                    <div className="flex mb-3">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><Icon icon="mdi:account" className={(lnVal ? "text-red-400 " : "text-gray-400 ") + "text-lg"} /></div>
                                        <input name="lastName" onChange={e => { frontEndValidation(e) }} type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" />
                                    </div>
                                    {lnError ? 
                                            <div class="alert p-2 alert-warning text-xs">
                                                <div class="flex-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                    </svg>
                                                    <label>{lnError}</label>
                                                </div>
                                            </div> : null}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-3">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex mb-3">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><Icon icon="mdi:email" className={(emailVal ? "text-red-400 " : "text-gray-400 ") + "text-lg"} /></div>
                                        <input name="email" onChange={e => { frontEndValidation(e) }} type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" />
                                    </div>
                                    {emailError ? 
                                            <div class="alert p-2 alert-warning text-xs">
                                                <div class="flex-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                    </svg>
                                                    <label>{emailError}</label>
                                                </div>
                                            </div> : null}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-3">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex mb-3">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><Icon icon="mdi:lock" className={(pwVal ? "text-red-400 " : "text-gray-400 ") + "text-lg"} /></div>
                                        <input name="password" onChange={e => { frontEndValidation(e) }} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                                    </div>
                                    {pwError ? 
                                            <div class="alert p-2 alert-warning text-xs">
                                                <div class="flex-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                    </svg>
                                                    <label>{pwError}</label>
                                                </div>
                                            </div> : null}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1"> Confirm Password</label>
                                    <div className="flex mb-3">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><Icon icon="mdi:lock-check" className={(confirmPwVal ? "text-red-400 " : "text-gray-400 ") + "text-lg"} /></div>
                                        <input name="confirmPW" onChange={e => { frontEndValidation(e) }} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                                    </div>
                                    {confirmPwError ? 
                                            <div class="alert p-2 alert-warning text-xs">
                                                <div class="flex-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                    </svg>
                                                    <label>{confirmPwError}</label>
                                                </div>
                                            </div> : null}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-2">
                                    <button className="block w-full max-w-xs mx-auto bg-cyan-500 hover:bg-cyan-700 focus:bg-cyan-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3">
                                    <Link to="/login" className="block w-7/12 max-w-xs mx-auto bg-green-300 hover:bg-green-500 focus:bg-green-500 text-white rounded-lg px-2 py-1 font-semibold text-xs text-center">Already a user?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
