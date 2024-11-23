import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteData, updateData } from "../redux/slice";
import "../styles/modal.css";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

interface ModalProps {
  index: number;
  setIsModalOpen: (isOpen: boolean) => void;
}

function Modal({ index, setIsModalOpen }: ModalProps) {
  const data = useSelector((state: RootState) => state.data.items);
  const dispatch = useDispatch();
  const singleData = data[index];
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<UserData>({
    firstName: singleData.firstName,
    lastName: singleData.lastName,
    email: singleData.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(
      updateData({
        id: index,
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
      })
    );
    setIsEdit(false);
  };

  return (
    <div className="modal">
      <div className="modal__data__container">
        <div className="modal__nav">
          <h2>
            {singleData.firstName} {singleData.lastName}
          </h2>
          <X onClick={() => setIsModalOpen(false)} className="modal__x" />
        </div>
        <div className="modal__data">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={isEdit ? details.firstName : singleData.firstName}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={isEdit ? details.lastName : singleData.lastName}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEdit ? details.email : singleData.email}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
        </div>
        <div className="modal__button">
          {!isEdit ? (
            <>
              <button className="edit__button" onClick={() => setIsEdit(true)}>
                Edit
              </button>
              <button
                className="delete__button"
                onClick={() => {
                  dispatch(deleteData(index));
                  setIsModalOpen(false);
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <button className="edit__button" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
