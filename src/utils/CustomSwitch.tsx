import { ChangeEvent } from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 49,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        border: 0,
        backgroundColor: "#087B2F",
        opacity: 1,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 19,
    height: 19,
    color: "#F4F4F4",
  },
  "& .MuiSwitch-track": {
    borderRadius: 50,
    border: "1px solid #F4F4F4",
    backgroundColor: "white",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface Props {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const CustomSwitch = ({ checked, onChange, name }: Props) => {
  return (
    <IOSSwitch
      sx={{ m: 1 }}
      checked={checked}
      onChange={onChange}
      name={name}
    />
  );
};
