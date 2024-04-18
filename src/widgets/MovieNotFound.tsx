import "./MovieNotFound.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { reset } from "../features/Search/searchSlice";

export default function MovieNotFound() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(reset());
    navigate("/");
  }

  return (
    <div onClick={onClick} className="modal-not-found">
      <h3 className="modal-not-found__title">Фильм не найден</h3>
    </div>
  );
}