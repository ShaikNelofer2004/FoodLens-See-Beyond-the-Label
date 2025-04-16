document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("foodData"));
  if (!data) return;

  // Product name & image
  document.querySelector(".product-title").textContent = data.name || "Unnamed Product";
  document.getElementById("mainImage").src = data.image || "https://placehold.co/400x400";

  // Ratings
  document.querySelector(".rating-score").textContent = data.rating?.toFixed(1) || "0.0";
  document.querySelector(".rating-text").textContent = "Out of 5";
  document.querySelector(".rating-label").textContent = data.rating_text || "Unknown";

  // Eco, Nova, Nutri Scores
  document.querySelector(".score-card.eco .score-value").textContent = data.eco_score || "N/A";
  document.querySelector(".score-card.nova .score-value").textContent = data.nova_group || "N/A";
  document.querySelector(".score-card.nutri .score-value").textContent = data.nutri_score || "N/A";

  // What Concerns Us
  const concernItems = document.querySelectorAll(".nutrition-item.concern");
  concernItems[0].querySelector(".value").textContent = data.processing_level || "Unknown";
  concernItems[1].querySelector(".value").textContent = data.additives?.length || 0;
  concernItems[2].querySelector(".value").textContent = (data.nutritional_values?.["energy-kcal_value"] || 0) + " kcal";
  concernItems[3].querySelector(".value").textContent = (data.nutritional_values?.sugars || 0) + " g";
  concernItems[4].querySelector(".value").textContent = (data.nutritional_values?.["sugars_value"] || 0) + " g";

  // What We Like
  const benefitItems = document.querySelectorAll(".nutrition-item.benefit");
  benefitItems[0].querySelector(".value").textContent = (data.nutritional_values?.proteins || 0) + " g";
  benefitItems[1].querySelector(".value").textContent = (data.nutritional_values?.sodium || 0).toFixed(3) + " g";

  // Age-Based Consumption Guide
  const ageMap = {
    "0-12 months": "0-3 years",
    "1-5 years": "4-12 years",
    "6-12 years": "4-12 years",
    "12+ years": "Adults"
  };
  document.querySelectorAll(".consumption-item").forEach((item) => {
    const ageGroup = item.querySelector(".age-group span").textContent.trim();
    const mappedKey = ageMap[ageGroup] || ageGroup;
    const recommendationText = data.consumption_recommendation?.[mappedKey] || "Not Available";
    item.querySelector(".recommendation span").textContent = recommendationText;
  });

  // All Nutrients Accordion
  const nutrients = data.nutritional_values || {};
  const nutrientsList = document.querySelector("#nutrientsCollapse .accordion-body ul");
  nutrientsList.innerHTML = "";
  for (let key in nutrients) {
    if (typeof nutrients[key] === "number") {
      nutrientsList.innerHTML += `<li class="list-group-item">${key.replace(/[_-]/g, " ")}: ${nutrients[key]}</li>`;
    }
  }

  // All Ingredients Accordion
  const ingredientsText = data.allergens?.replace(/en:/g, "").split(",").join(", ") || "Not Available";
  document.querySelector("#ingredientsCollapse .accordion-body").innerHTML = `<p>${ingredientsText}</p>`;

  // Alternatives Section
  const alternativesList = document.querySelector(".alternative-points");
  alternativesList.innerHTML = "";
  if (data.alternative_suggestions && Array.isArray(data.alternative_suggestions)) {
    data.alternative_suggestions.forEach((point) => {
      if (point.trim().length > 0) {
        alternativesList.innerHTML += `<li><i class="fas fa-check-circle"></i> ${point}</li>`;
      }
    });
  }
});
