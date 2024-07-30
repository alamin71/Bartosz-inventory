"use client";
import { useState, useEffect } from "react";
import QuestionData from "../../components/QuestionData";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import qusImage from "../../../public/images/qusImage.png";
import Image from "next/image";
import questionsData from "../../utils/questions";
import {useTranslations} from 'next-intl';

export default function Question() {
  const t = useTranslations('Question');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndices, setCurrentIndices] = useState({});
  const router = useRouter();

  useEffect(() => {
    setCurrentQuestion(findFirstVisibleQuestion(questionsData));
  }, []);

  const handleOptionChange = (event) => {
    const answer = event.target.value;
    const updatedAnswers = { ...answers };
    if (!Array.isArray(currentQuestion.answer[answer])) {
      const id = currentQuestion.id.split('.')[0];
      updatedAnswers[currentQuestion.id] = { id: id, answer: currentQuestion.answer[answer].answer };
      setAnswers(updatedAnswers);
    }
    let nextQuestion = findNextQuestion(currentQuestion, answer);

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("answers", JSON.stringify(Object.values(updatedAnswers)));
      }
      router.push("/suggestedPackages");
    }
  };

  const findFirstVisibleQuestion = (questions) => {
    for (let question of questions) {
      if (!question.hidden) {
        return question;
      }
      const nextVisibleSubQuestion = findNextVisibleSubQuestion(question);
      if (nextVisibleSubQuestion) {
        return nextVisibleSubQuestion;
      }
    }
    return null;
  };

  const findNextVisibleSubQuestion = (question) => {
    if (question.answer) {
      for (let key of Object.keys(question.answer)) {
        const subQuestions = question.answer[key];
        if (Array.isArray(subQuestions)) {
          for (let subQuestion of subQuestions) {
            if (!subQuestion.hidden) {
              return subQuestion;
            }
            const nextVisibleSubQuestion = findNextVisibleSubQuestion(subQuestion);
            if (nextVisibleSubQuestion) {
              return nextVisibleSubQuestion;
            }
          }
        }
      }
    }
    return null;
  };

  const findNextQuestion = (question, answer) => {
    if (!question.answer || !question.answer[answer]) {
      return null;
    }

    const nextStep = question.answer[answer];
    if (Array.isArray(nextStep)) {
      return findFirstVisibleQuestion(nextStep);
    }

    if (nextStep.end) {
      if (typeof window !== "undefined") {
        localStorage.setItem("answers", JSON.stringify(Object.values(answers)));
      }
      router.push("/suggestedPackages");
    }

    if (nextStep.next) {
      const nextQuestion = findNextVisibleQuestion(question);
      if (nextQuestion) {
        return nextQuestion;
      }
      const nextId = (parseInt(question.id.split('.')[0]) + 1).toString();
      return findFirstVisibleQuestion(questionsData.filter(q => q.id.startsWith(nextId)));
    }

    if (nextStep.subNext || nextStep.subSubNext) {
      const parentQuestionId = question.id.split('.').slice(0, -1).join('.');
      const parentAnswer = answers[parentQuestionId] || "TRUE";
      const parentQuestion = findQuestionById(parentQuestionId);
      const parentAnswerArray = parentQuestion.answer[parentAnswer];
      const currentIndex = currentIndices[parentQuestionId] || 0;

      const nextIndex = currentIndex + 1;
      if (nextIndex < parentAnswerArray.length) {
        setCurrentIndices({ ...currentIndices, [parentQuestionId]: nextIndex });
        return parentAnswerArray[nextIndex];
      } else {
        setCurrentIndices({ ...currentIndices, [parentQuestionId]: 0 });
        if (question.id.includes('.')) {
          const nextIdParts = question.id.split('.');
          const nextSubId = parseInt(nextIdParts[nextIdParts.length - 1]) + 1;
          const nextId = `${nextIdParts[0]}.${nextSubId}`;
          return questionsData.find(q => q.id === nextId);
        } else {
          const nextId = (parseInt(question.id) + 1).toString();
          return questionsData.find(q => q.id === nextId);
        }
      }
    }

    return null;
  };

  const findNextVisibleQuestion = (currentQuestion) => {
    const nextId = (parseInt(currentQuestion.id.split('.')[0]) + 1).toString();
    const nextQuestion = questionsData.find(q => q.id === nextId);
    if (nextQuestion && nextQuestion.hidden) {
      return findNextVisibleSubQuestion(nextQuestion);
    }
    return nextQuestion;
  };

  const findQuestionById = (id) => {
    const queue = [...questionsData];
    while (queue.length) {
      const current = queue.shift();
      if (current.id === id) {
        return current;
      }
      if (current.answer) {
        Object.values(current.answer).forEach(answer => {
          if (Array.isArray(answer)) {
            queue.push(...answer);
          }
        });
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 mt-16 md:mt-32 px-4 lg:mx-60">
      <div className="pt-8 md:pt-16 w-full md:w-1/2">
        <h1 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4">
          {t('title')}
        </h1>
        {currentQuestion ? (
          <div className="flex flex-col">
            <QuestionData
              question={currentQuestion.question}
              options={currentQuestion.options}
              value={answers[currentQuestion.id] || ""}
              onChange={handleOptionChange}
            />
            <Button
              variant="contained"
              className="mt-4 bg-[#CC006E] hover:bg-[#CC006E] w-full md:w-80 h-12 md:h-16 rounded-xl text-lg md:text-2xl normal-case"
              onClick={handleOptionChange}
              disabled={!answers[currentQuestion.id]}
            >
              {t('button-1')}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={qusImage}
          height={400}
          width={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}
