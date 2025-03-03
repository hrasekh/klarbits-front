// src/components/AnswerOptionStyles.js
export const getAnswerOptionStyles = (answer, selectedAnswer, isSelectionEnabled) => {
    let bgColor = "bg-white hover:bg-gray-50";
    let borderColor = "border-gray-200 hover:border-indigo-400";
    let textColor = "text-gray-800";
    let iconColor = "text-gray-400";
    let hasSelected = selectedAnswer ? true : false;
  
    if (hasSelected) {
      if (answer.is_correct) {
        bgColor = "bg-green-50";
        borderColor = "border-green-500";
        textColor = "text-green-800";
        iconColor = "text-green-600";
      } else if (selectedAnswer == answer.id) {
        bgColor = "bg-red-50";
        borderColor = "border-red-500";
        textColor = "text-red-800";
        iconColor = "text-red-600";
      } else {
        bgColor = "bg-gray-50";
        textColor = "text-gray-500";
        borderColor = "border-gray-200";
      }
    }
  
    let cursorStyle = "cursor-pointer transform hover:translate-x-1";
    if (!isSelectionEnabled) {
      cursorStyle = "cursor-default";
    }
  
    return { bgColor, borderColor, textColor, iconColor, cursorStyle };
  };
  