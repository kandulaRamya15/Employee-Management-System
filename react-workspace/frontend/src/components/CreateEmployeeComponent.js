import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
function CreateEmployeeComponent()
{
    const navigate= useNavigate();

    const [employees,setEmployees]=useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
        }
    })

    const [errors,setErrors]=useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    })

    const handleCancel=(e)=>{
        e.preventDefault();
        navigate("/employees");
    }

    const handleChange=(e)=>{
        e.preventDefault();

        const {name,value}=e.target;

        if(name=="name" || name=="doj")
        {
            setEmployees({... employees,[name]:value});
        }
        else
        {
            setEmployees({... employees,dept:{... employees.dept,[name]:value}});
        }

        setErrors({...errors,[name]:""})
    }

    const dateFormat=(date)=>{
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,"0");
        const month = String(d.getMonth()+1).padStart(2,"0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }


    const handleSubmit=(e)=>{
        e.preventDefault();

        if(validate())
        {
            const formattedDate = dateFormat(employees.doj);
            const employeeData={
                ...employees,doj:formattedDate
            } 

            EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/employees");
            })
        }
    }

    const validate=()=>{
        
        const tempErrors={};
        let isValid=true;

        if(!employees.name)
        {
            tempErrors.name="Name is mandatory";
            isValid=false;
        }
        if(!employees.doj)
        {
            tempErrors.doj="Date is mandatory";
            isValid=false;
        }
        if(!employees.dept.deptName)
        {
            tempErrors.deptName="Department is mandatory";
            isValid=false;
        }
        if(!employees.dept.designation)
        {
            tempErrors.designation="Designation is mandatory";
            isValid=false;
        }
        setErrors(tempErrors);
        return isValid;
    }

    return (
       <div className="container pt-3">
           
        <div className="card col-md-6 offset-3 p-3">
            <h5 className="text-center"> Add Employee</h5>
            <form>
                <label className="my-2">Name:</label>
                <input type="text" name="name" id="name" className="form-control" autoComplete="off"
                value={employees.name}
                onChange={handleChange}/>
                {errors.name && <small className="text-danger"> {errors.name}</small>}
                <br/>
                <label className="my-2">DOJ:</label>
                <input type="date" name="doj" id="doj" className="form-control"
                value={employees.doj}
                onChange={handleChange}/>
                {errors.doj && <small className="text-danger"> {errors.doj}</small>}
                <br/>
                <label className="my-2">Department:</label>
                <input type="text" name="deptName" id="deptName" className="form-control"
                value={employees.dept.deptName}
                onChange={handleChange}/>
                {errors.deptName && <small className="text-danger"> {errors.deptName}</small>}
                <br/>
                <label className="my-2">Designation:</label>
                <input type="text" name="designation" id="designation" className="form-control"
                value={employees.dept.designation}
                onChange={handleChange}/>
                {errors.designation && <small className="text-danger"> {errors.designation}</small>}
                <br/>
                <button className="btn btn-danger mt-3 float-start" onClick={handleCancel}>cancel</button>
                <button className="btn btn-success mt-3 float-end" onClick={handleSubmit}>submit</button>
            </form>
        </div>
            
       </div>
    )
}
export default CreateEmployeeComponent;