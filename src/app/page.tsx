'use client'

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { addData } from "./redux/slice";
import './styles/app.css'
import Card from "./components/Card";
import Modal from "./components/Modal";

export default function Page() {
  const [isAdd, setIsAdd] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedID, setSelectedId] = useState<number>(0);
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClick = (index : number) => {
    setSelectedId(index);
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (!details.firstName || !details.lastName || !details.email) {
      alert('Please fill in all fields');
      return;
    }
    dispatch(addData(details));
    setDetails({ firstName: '', lastName: '', email: '' });
    setIsAdd(false);
  };

  return (
    <div className="">
      <div className="nav">
        <h1 className="">User Admin</h1>
        <button 
          onClick={() => setIsAdd(!isAdd)}
          className=""
        >
          {isAdd ? <Minus /> : <Plus />}
        </button>
      </div>

      {isAdd && (
        <div className="add-modal">
          <form className="add-form">
            <section className="title">
              <h1>Add</h1>
              <div onClick={()=>{setIsAdd(false)}}>
                <X/>
              </div>
            </section>
          <div className="">
            <label htmlFor="firstName" className="">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={details.firstName}
              onChange={handleChange}
              className=""
            />
          </div>

          <div className="">
            <label htmlFor="lastName" className="">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={details.lastName}
              onChange={handleChange}
              className=""
            />
          </div>

          <div className="">
            <label htmlFor="email" className="">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={details.email}
              onChange={handleChange}
              className=""
            />
          </div>

          <button
            onClick={handleSubmit}
            className=""
          >
            Add User
          </button>
        </form>
        </div>
      )}

      <div className="container">
        {data.items.map((item : any , index : number) => (
          <div key={index} onClick={()=>{
              handleClick(index);
          }}>
            <Card id={index}/>
          </div>
        ))}
      </div>

      <div>
        {isModalOpen && <div>
            <Modal index={selectedID} setIsModalOpen={setIsModalOpen}/>
          </div>}
      </div>
    </div>
  );
}