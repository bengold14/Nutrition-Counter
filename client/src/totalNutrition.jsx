import React from "react";
import rdi from "./RDI.jsx";

let TotalNutrition = function(props) {
  return (
    <div className="total-nutrition-container">
      <div className="sidebar-title">Total Nutrition Count</div>
      <div className="nutrients-container">
        {props.nutrition.totalNutrition &&
          Object.values(JSON.parse(props.nutrition.totalNutrition)).map(
            (nutrient, index) => {
              let nutrientPercent = nutrient.value / rdi[nutrient.name].value;
              return (
                <div className="nutrient" key={index}>
                  <div className="nutrient-name">
                    {nutrient.name
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}{" "}
                    ({rdi[nutrient.name].value} {rdi[nutrient.name].unit})
                  </div>
                  {nutrientPercent > 1.1 ? (
                    <div>
                      <span className="nutrient-value">
                        {Number(nutrient.value).toFixed(2)} {nutrient.unit}
                      </span>
                      <div
                        className="nutrient-bar-over"
                        style={{
                          width: "100%"
                        }}
                      />
                    </div>
                  ) : nutrientPercent > 0.8 ? (
                    <div>
                      <span className="nutrient-value">
                        {Number(nutrient.value).toFixed(2)} {nutrient.unit}
                      </span>
                      <div
                        className="nutrient-bar-at"
                        style={{
                          width: "100%"
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <span className="nutrient-value">
                        {Number(nutrient.value).toFixed(2)} {nutrient.unit}
                      </span>
                      <div
                        className="nutrient-bar-under"
                        style={{
                          width: JSON.stringify(nutrientPercent * 100) + "%"
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default TotalNutrition;
