import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";

const QuestionData = ({ id, question, options, value, onChange }) => {
  const t = useTranslations("QuestionList");

  return (
    <FormControl className="p-4 my-4 w-full">
      <Typography className="mb-8 text-xl sm:text-2xl" gutterBottom>
        {id} {t(`${question}`)}
      </Typography>
      <RadioGroup name="option" row value={value} onChange={onChange}>
        {options &&
          options.length > 0 &&
          options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={t(option.toLowerCase())}
              className="text-base sm:text-lg"
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default QuestionData;
