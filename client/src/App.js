import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
      alert("Employee added successfully!")
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
      alert("Employee deleted successfully!")
    });
  };

  return (
    <div className="App">
      <div>
        <nav>
          <div className="logo">
            <img src="logo.svg" alt="" />
            <h1
              style={{
                color: "blue",
                fontSize: "1.5rem",
                fontStyle: "oblique",
              }}
            >
              VIA
            </h1>
          </div>

          <div className="links"></div>
        </nav>

        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Employee Management System</h1>

            <h2 className="hero-subtitle">
              Utilize this tool to keep a track of all the employees in your
              company.
            </h2>
            <div onClick={() => window.location.replace("/#about")}>
              <button type="button" className="p-5 m-5 rounded-md text-xl bg-purple-400 font-bold">
                Let's Get Started
              </button>
            </div>
          </div>
        </section>
      </div>
      <h1 id="about" className="text-2xl font-bold text-center mx-auto mt-36">
        Please fill in your details
      </h1>
      <div className="grid grid-cols-1 gap-2 w-2/5 mx-auto my-10">
        <div className="flex flex-col">
          <label>Name:</label>
          <input
            className="rounded-md border-2 border-blue-300 p-2 shadow-md my-2"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className="flex flex-col">
          <label>Age:</label>
          <input
            className="rounded-md border-2 border-blue-300 p-2 shadow-md my-2"
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </div>

        <div className="flex flex-col">
          <label>Country:</label>
          <input
            className="rounded-md border-2 border-blue-300 p-2 shadow-md my-2"
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
        </div>

        <div className="flex flex-col">
          <label>Position:</label>
          <input
            className="rounded-md border-2 border-blue-300 p-2 shadow-md my-2"
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />
        </div>

        <div className="flex flex-col">
          <label>Salary per annum:</label>
          <input
            className="rounded-md border-2 border-blue-300 p-2 shadow-md my-2"
            type="number"
            onChange={(event) => {
              setWage(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-center mb-10">
        <button
          className="p-2 rounded-md mx-4 bg-gray-400 text-white text-lg"
          onClick={getEmployees}
        >
          Show Employees
        </button>
        <button
          className="p-2 rounded-md mx-4 bg-blue-600 text-white text-lg"
          onClick={addEmployee}
        >
          Add Employee
        </button>
      </div>

      <div className="employees">
        {employeeList.map((val, key) => {
          return (
            <div className="flex rounded-md border-2 border-black shadow-lg m-4 p-8 h-auto w-3/7">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  className="rounded-md border-2 border-blue-500 p-2 mx-4"
                  placeholder="Enter New Salary"
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  className="mx-2 p-2 rounded-md text-white bg-yellow-500"
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  className="mx-2 p-2 rounded-md text-white bg-red-600"
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
