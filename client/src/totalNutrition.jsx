import React from "react";

let TotalNutrition = function(props) {
  return (
    <div className="total-nutrition-container">
      <div className="sidebar-title">Total Nutrition Count</div>
      <div className="nutrients-container">
        {props.nutrition.totalNutrition &&
          Object.values(JSON.parse(props.nutrition.totalNutrition)).map(
            (nutrient, index) => {
              return (
                <div className="nutrient" key={index}>
                  <div className="nutrient-name">{nutrient.name}</div>
                  <div>
                    <span className="nutrient-value">
                      {Number(nutrient.value).toFixed(2)}
                    </span>
                    <span className="nutrient-unit">{nutrient.unit}</span>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default TotalNutrition;
