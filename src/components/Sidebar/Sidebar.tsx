import classes from "./style.module.css";
import MenuIconSvg from "../../assets/svg/sidebarSvgs";
import homeIcon from "../../assets/images/homeIcon.png";
import listIcon from "../../assets/images/listIcon.png";

export const Sidebar = () => {
  return (
    <div className={`${classes.layout} min-h-screen z-50`}>
      <MenuIconSvg />
      <img
        alt="home-icon"
        className={`${classes.icons} mt-[70px]`}
        src={homeIcon}
      />
      <img alt="home-icon" className={classes.icons} src={listIcon} />
    </div>
  );
};
