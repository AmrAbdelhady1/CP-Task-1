import NavbarArrowSvg from "../../assets/svg/navbarArrow";
import classes from "./style.module.css";

export const Navbar = () => {
  return (
    <div className={classes.layout}>
      <p className={classes.container}>Program Details</p>
      <p className={`${classes.container} bg-[#00635B] !text-white`}>
        Application Form
      </p>
      <NavbarArrowSvg />
      <p
        className={`${classes.container} border-r border-r-[#C4C4C4] !h-[78px]`}
      >
        Workflow
      </p>
      <p className={classes.container}>Preview</p>
    </div>
  );
};
