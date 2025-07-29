import { useState,useEffect } from "react";
import {useNavigate,useParams} from 'react-router-dom';
import EmployeeService from "../services/EmployeeService";
function UpdateEmployeeComponent()
{
    const [name,setName]=useState("");
    const [doj,setDoj]=useState("");
    const [department,setDepartment]=useState({deptName:"",designation:""});
    const {id}=useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        EmployeeService.getEmployeeById(id).then(res=>{
            setName(res.data.name);
            setDoj(res.data.doj);
            setDepartment({
                deptName:res.data.dept.deptName,
                designation:res.data.dept.designation
            })
        })    
    },[])

    const handleCancel=(e)=>{
        e.preventDefault();
        navigate("/");
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
     
        const updateEmployee = {
            name,
            doj,
            dept:{
                deptName: department.deptName,
                designation: department.designation
            }
        }

        EmployeeService.updateEmployee(id,updateEmployee).then(res=>{
            navigate("/");
        })
    }

    return (
        <div className="container pt-5">
           
        <div className="card col-md-6 offset-3 p-3">
            <h5 className="text-center"> Update Employee</h5>
            <form>
                <label className="my-2">Name:</label>
                <input type="text" name="name" id="name" className="form-control" autoComplete="off"
                value={name}
                onChange={(e)=>setName(e.target.value)}/>

                <label className="my-2">DOJ:</label>
                <input type="text" name="doj" id="doj" className="form-control"
                value={doj}
                onChange={(e)=>setDoj(e.target.value)}/>

                <label className="my-2">Department:</label>
                <input type="text" name="deptName" id="deptName" className="form-control"
                value={department.deptName}
                onChange={(e)=> setDepartment({...department,deptName:e.target.value})}
                />

                <label className="my-2">Designation:</label>
                <input type="text" name="designation" id="designation" className="form-control"
                value={department.designation}
                onChange={(e)=>setDepartment({...department,designation:e.target.value})}/>

                <button className="btn btn-danger mt-3 float-start" onClick={handleCancel}>cancel</button>
                <button className="btn btn-success mt-3 float-end" onClick={handleSubmit}>submit</button>
            </form>
        </div>

        </div>
    )
}
export default UpdateEmployeeComponent;