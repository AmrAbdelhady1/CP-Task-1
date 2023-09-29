import { ChangeEvent, useState } from "react";
import DeleteIconSvg from "../../assets/svg/deleteIcon";
import classes from "./style.module.css";
import { AddChoiceSvg, MenuChoiceSvg } from "../../assets/svg/addQuestions";
import { CheckedSvg, UnCheckedSvg } from "../../assets/svg/checkedIcons";
import { Checkbox } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface QuestionData {
  type: string;
  question: string;
  choices: string[];
  disqualify: boolean;
  maxChoice: number;
  other: boolean;
}

interface Props {
  onClose: () => void;
  onSave: (question: QuestionData) => void;
}

export const AddQuestion = ({ onClose, onSave }: Props) => {
  const initailState = {
    type: "",
    question: "",
    choices: [""],
    disqualify: false,
    maxChoice: 0,
    other: false,
  };
  const types = [
    "Paragraph",
    "ShortAnswer",
    "YesNo",
    "Dropdown",
    "MultipleChoice",
    "Date",
    "Number",
    "FileUpload",
  ];
  const [question, setQuestion] = useState<QuestionData>(initailState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const name = event.target.name;
    setQuestion({
      ...question,
      [name]:
        name === "maxChoice"
          ? parseInt(event.target.value)
          : name === "disqualify" || name === "other"
          ? event.target.checked
          : event.target.value,
    });
  };

  const addChoice = () => {
    const data = [...question.choices];
    data.push("");
    setQuestion({ ...question, choices: data });
  };

  const handleChoiceChnage = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedData = [...question.choices];
    updatedData[index] = e.target.value;
    setQuestion({ ...question, choices: updatedData });
  };

  const handleSubmit = () => {
    onSave(question);
    setQuestion(initailState);
    onClose();
  };

  const handleDelete = () => {
    setQuestion(initailState);
    onClose();
  };

  return (
    <div>
      <p className={`mb-5 ${classes.question}`}>Type</p>
      <FormControl className={classes.input}>
        <Select value={question.type} name="type" onChange={handleChange}>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {question.type && (
        <>
          <p className={classes.question}>Question</p>
          <input
            type="text"
            name="question"
            value={question?.question}
            className={classes.input}
            placeholder="Type here"
            onChange={handleChange}
          />
        </>
      )}

      {(question.type === "MultipleChoice" || question.type === "Dropdown") && (
        <>
          <p className={`${classes.question} !font-medium ml-11`}>Choice</p>
          {question?.choices?.map((item, index) => (
            <div key={index} className="flex items-center gap-5">
              <MenuChoiceSvg />
              <input
                type="text"
                value={item}
                className={`${classes.input} !w-[441px] !border-[#A0A0A0]`}
                onChange={(e) => handleChoiceChnage(e, index)}
              />
              {question?.choices.length - 1 === index ? (
                <div className="cursor-pointer" onClick={addChoice}>
                  <AddChoiceSvg />
                </div>
              ) : (
                <p></p>
              )}
            </div>
          ))}
          <div className="flex items-center gap-1 mb-10">
            <Checkbox
              checked={question.other}
              name="other"
              onChange={handleChange}
              icon={<UnCheckedSvg />}
              checkedIcon={<CheckedSvg />}
            />
            <p className={classes.text}>Enable “Other” option </p>
          </div>
        </>
      )}
      {question.type === "MultipleChoice" && (
        <>
          <p className={classes.question}>Max choice allowed</p>
          <input
            type="text"
            value={question?.maxChoice ? question?.maxChoice : ""}
            name="maxChoice"
            className={classes.input}
            placeholder="Enter number of choice allowed here"
            onChange={handleChange}
          />{" "}
        </>
      )}

      {question.type === "YesNo" && (
        <div className="flex items-center gap-1 mb-10">
          <Checkbox
            checked={question.disqualify}
            name="disqualify"
            onChange={handleChange}
            icon={<UnCheckedSvg />}
            checkedIcon={<CheckedSvg />}
          />
          <p className={classes.text}>
            Disqualify candidate if the answer is no
          </p>
        </div>
      )}

      <div className="flex items-center justify-between my-5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleDelete}
        >
          <DeleteIconSvg />
          <p className={classes.delete}>Delete question</p>
        </div>
        <button className={classes.btn} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};
