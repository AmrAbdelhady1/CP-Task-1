import { CustomisedQuestion } from "../../types/FormData";
import classes from "./style.module.css";
import editIcon from "../../assets/images/editIcon.png";
import { ChangeEvent, useEffect, useState } from "react";
import { AddChoiceSvg, MenuChoiceSvg } from "../../assets/svg/addQuestions";
import DeleteIconSvg from "../../assets/svg/deleteIcon";
import { Checkbox } from "@mui/material";
import { UnCheckedSvg, CheckedSvg } from "../../assets/svg/checkedIcons";

interface FormData {
  question: CustomisedQuestion;
  onSave: (customisedQuestion: CustomisedQuestion) => void;
  onDelete: () => void;
}

export const EditQuestion = ({ question, onSave, onDelete }: FormData) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<CustomisedQuestion>(question);

  useEffect(() => {
    setSelectedQuestion(question);
  }, [question]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const name = event.target.name;
    setSelectedQuestion({
      ...selectedQuestion,
      [name]:
        name === "maxChoice"
          ? parseInt(event.target.value)
          : name === "disqualify" || name === "other"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleChoiceChnage = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedData = [...selectedQuestion.choices];
    updatedData[index] = e.target.value;
    setSelectedQuestion({ ...selectedQuestion, choices: updatedData });
  };

  const addChoice = () => {
    const updatedData = [...selectedQuestion.choices];
    updatedData.push("");
    setSelectedQuestion({ ...selectedQuestion, choices: updatedData });
  };

  const handleSubmit = () => {
    setIsEditable(false);
    onSave(selectedQuestion);
  };

  const handleDelete = () => {
    setIsEditable(false);
    onDelete();
  };

  return (
    <div
      className="pb-[25px] mb-[23px] border-b border-b-[#C4C4C4]"
      key={selectedQuestion?.id}
    >
      <p className={classes.type}>{selectedQuestion?.type}</p>
      <div className="flex item-center gap-[60px] justify-between">
        <p className={classes.question}>{question?.question}</p>
        <img
          src={editIcon}
          alt="edit-icon"
          className="w-[18px] h-[17px] cursor-pointer"
          onClick={() => setIsEditable(true)}
        />
      </div>
      {isEditable && (
        <div className="mt-[30px]">
          <p className={classes.question}>Question</p>
          <input
            type="text"
            name="question"
            value={selectedQuestion?.question}
            className={classes.input}
            onChange={handleChange}
          />
          {selectedQuestion.type !== "YesNo" && (
            <>
              <p className={`${classes.question} !font-medium ml-11`}>Choice</p>
              {selectedQuestion?.choices?.map((item, index) => (
                <div key={index} className="flex items-center gap-5">
                  <MenuChoiceSvg />
                  <input
                    type="text"
                    value={item}
                    className={`${classes.input} !w-[441px] !border-[#A0A0A0]`}
                    onChange={(e) => handleChoiceChnage(e, index)}
                  />
                  {selectedQuestion?.choices.length - 1 === index ? (
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
                  checked={selectedQuestion.other}
                  name="other"
                  onChange={handleChange}
                  icon={<UnCheckedSvg />}
                  checkedIcon={<CheckedSvg />}
                />
                <p className={classes.text}>Enable “Other” option </p>
              </div>
            </>
          )}
          {selectedQuestion.type === "MultipleChoice" && (
            <>
              <p className={classes.question}>Max choice allowed</p>
              <input
                type="text"
                value={
                  selectedQuestion?.maxChoice ? selectedQuestion?.maxChoice : ""
                }
                name="maxChoice"
                className={classes.input}
                placeholder="Enter number of choice allowed here"
                onChange={handleChange}
              />{" "}
            </>
          )}

          {selectedQuestion.type === "YesNo" && (
            <div className="flex items-center gap-1 mb-10">
              <Checkbox
                checked={selectedQuestion.disqualify}
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
      )}
    </div>
  );
};
