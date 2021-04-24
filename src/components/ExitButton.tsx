import { NavLink } from "react-router-dom";

const ExitButton = () => {
  return (
    <NavLink
      to="/"
      style={{ backgroundColor: "#ffffff9c" }}
      className="absolute z-10 px-3 py-1 right-0 "
    >
      Exit
    </NavLink>
  );
};

export { ExitButton };
