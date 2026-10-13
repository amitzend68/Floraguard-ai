/**
 * FloraGuard AI - Plant Disease Knowledge Base & Pathogen Dataset
 */

export const DISEASE_DATABASE = {
  "tomato_early_blight": {
    diseaseKey: "tomato_early_blight",
    plant: "Tomato",
    disease: "Tomato Early Blight",
    pathogen: "Alternaria solani",
    category: "Fungal Disease",
    severity: "Moderate",
    severityScore: 62,
    confidence: 0.946,
    probabilities: {
      "Tomato Early Blight": 0.946,
      "Tomato Leaf Mold": 0.028,
      "Tomato Septoria Leaf Spot": 0.017,
      "Healthy": 0.009
    },
    description: "Early blight is a common fungal disease affecting tomato plants. It produces dark concentric target spots on older leaves, leading to chlorotic yellow halos, leaf wilting, defoliation, and reduced plant vigor as the infection progresses.",
    cause: "Fungal infection caused by soil-borne spores of Alternaria solani.",
    transmission: "Spores overwinter in infected plant debris and soil, spreading via wind, rain splashes, and gardening equipment.",
    favorableConditions: "Warm temperatures (24°C - 29°C / 75°F - 85°F) combined with high relative humidity and prolonged leaf moisture.",
    symptoms: [
      "Dark circular lesions with characteristic concentric target rings",
      "Brown necrotic spots on lower mature foliage",
      "Yellowing (chlorosis) halo surrounding infected spots",
      "Progressive leaf curling, drying, and premature leaf drop",
      "Reduced leaf canopy health and sunscald vulnerability on fruit"
    ],
    riskFactors: [
      "High ambient relative humidity (>80%)",
      "Poor air circulation within dense canopy",
      "Wet foliage due to overhead sprinkler irrigation",
      "Infected crop debris left on soil surface",
      "Warm environmental temperatures"
    ],
    immediateActions: [
      "Remove severely infected leaves and dispose of them safely (do not compost).",
      "Maintain proper spacing between tomato plants (24-36 inches).",
      "Avoid unnecessary overhead irrigation; use drip lines at soil level.",
      "Improve canopy air circulation by pruning lower sucker leaves.",
      "Clear infected plant debris around the base of the crop.",
      "Monitor adjacent plants daily for early spot formation."
    ],
    preventiveActions: [
      "Use certified disease-free healthy planting seed material.",
      "Maintain strict field sanitation and tool disinfection.",
      "Avoid excessive moisture accumulation on leaf blades.",
      "Monitor crops regularly during warm, humid weather cycles.",
      "Follow locally recommended crop rotation (3-year interval)."
    ],
    cropCarePlan: [
      { action: "Remove infected leaves", priority: "High", time: "Immediately" },
      { action: "Improve ventilation & pruning", priority: "High", time: "Immediately" },
      { action: "Apply copper fungicide / bio-agent", priority: "High", time: "Within 24 Hours" },
      { action: "Monitor nearby plants", priority: "Medium", time: "Daily" },
      { action: "Maintain field sanitation", priority: "Medium", time: "Regularly" },
      { action: "Expert consultation", priority: "High", time: "If symptoms worsen" }
    ]
  },

  "tomato_late_blight": {
    diseaseKey: "tomato_late_blight",
    plant: "Tomato",
    disease: "Tomato Late Blight",
    pathogen: "Phytophthora infestans",
    category: "Oomycete / Water Mold",
    severity: "High",
    severityScore: 88,
    confidence: 0.962,
    probabilities: {
      "Tomato Late Blight": 0.962,
      "Tomato Early Blight": 0.024,
      "Tomato Leaf Mold": 0.010,
      "Healthy": 0.004
    },
    description: "Late blight is a devastating water mold infection causing rapid leaf collapse, water-soaked dark lesions, and white downy sporangia growth under humid conditions.",
    cause: "Oomycete pathogen Phytophthora infestans.",
    transmission: "Windborne sporangia travelling miles in cool damp air.",
    favorableConditions: "Cool, wet weather (15°C - 22°C) with continuous humidity >90%.",
    symptoms: [
      "Large, irregular water-soaked dark brown leaf spots",
      "White cottony fungal bloom on lower leaf surfaces in morning humidity",
      "Rapid stem browning and total foliage collapse",
      "Firm, dark brown leathery rot on tomato fruits"
    ],
    riskFactors: [
      "Cool foggy mornings and persistent rainfall",
      "Presence of infected potato cull piles nearby",
      "Dense unpruned plant canopy retaining dampness"
    ],
    immediateActions: [
      "Immediately isolate infected plants and cut off diseased stems.",
      "Apply protective copper soap fungicide spray across all leaves.",
      "Stop all sprinkler irrigation immediately."
    ],
    preventiveActions: [
      "Plant resistant cultivars such as Defiant or Mountain Merit.",
      "Eliminate weed nightshades near field borders.",
      "Apply preventative bio-fungicides prior to cool rain events."
    ],
    cropCarePlan: [
      { action: "Isolate & rogue infected shoots", priority: "High", time: "Immediately" },
      { action: "Apply systemic fungicide spray", priority: "High", time: "Within 12 Hours" },
      { action: "Inspect neighboring nightshades", priority: "Medium", time: "Daily" }
    ]
  },

  "potato_late_blight": {
    diseaseKey: "potato_late_blight",
    plant: "Potato",
    disease: "Potato Late Blight",
    pathogen: "Phytophthora infestans",
    category: "Oomycete",
    severity: "High",
    severityScore: 85,
    confidence: 0.938,
    probabilities: {
      "Potato Late Blight": 0.938,
      "Potato Early Blight": 0.042,
      "Healthy": 0.020
    },
    description: "Potato late blight attacks both leaves and underground tubers, causing dark brown purplish spots and internal tuber dry rot.",
    cause: "Phytophthora infestans.",
    transmission: "Infected seed tubers and airborne sporangia.",
    favorableConditions: "Cool damp weather with rain or heavy dew.",
    symptoms: [
      "Dark water-soaked lesions near leaf edges",
      "White fungal mold on undersides of leaves",
      "Reddish-brown tuber flesh rot under skin"
    ],
    riskFactors: [
      "Uncertified seed tubers",
      "High soil moisture and overcast weather"
    ],
    immediateActions: [
      "Apply protective copper or Mancozeb spray.",
      "Hill soil heavily to shield tubers from washing spores."
    ],
    preventiveActions: [
      "Use certified pathogen-free seed potatoes.",
      "Destroy cull piles before planting season."
    ],
    cropCarePlan: [
      { action: "Foliar fungicide application", priority: "High", time: "Immediately" },
      { action: "Hill up row soil", priority: "Medium", time: "Within 2 days" }
    ]
  },

  "corn_common_rust": {
    diseaseKey: "corn_common_rust",
    plant: "Corn",
    disease: "Corn Common Rust",
    pathogen: "Puccinia sorghi",
    category: "Fungal Disease",
    severity: "Moderate",
    severityScore: 58,
    confidence: 0.951,
    probabilities: {
      "Corn Common Rust": 0.951,
      "Northern Corn Leaf Blight": 0.035,
      "Healthy": 0.014
    },
    description: "Common rust produces small cinnamon-brown pustules on upper and lower leaf surfaces, erupting with powdery rust spores.",
    cause: "Puccinia sorghi fungus.",
    transmission: "Airborne urediniospores carried from southern growing zones.",
    favorableConditions: "Cool temperatures (16°C - 25°C) and heavy dew.",
    symptoms: [
      "Elongated cinnamon-brown powdery pustules",
      "Chlorotic yellow rings surrounding dense pustules",
      "Premature leaf drying under heavy pressure"
    ],
    riskFactors: [
      "Late planting dates",
      "High relative humidity and dew cycles"
    ],
    immediateActions: [
      "Apply foliar triazole or strobilurin fungicide if infection reaches upper canopy before silking."
    ],
    preventiveActions: [
      "Plant rust-resistant hybrid corn cultivars with Rp resistance genes."
    ],
    cropCarePlan: [
      { action: "Canopy rust inspection", priority: "High", time: "Daily" },
      { action: "Fungicide application at silking", priority: "Medium", time: "As needed" }
    ]
  },

  "healthy_leaf": {
    diseaseKey: "healthy_leaf",
    plant: "General Crop",
    disease: "Healthy Leaf Canopy",
    pathogen: "None (Healthy Tissue)",
    category: "Healthy Condition",
    severity: "Low / Normal",
    severityScore: 5,
    confidence: 0.985,
    probabilities: {
      "Healthy": 0.985,
      "Tomato Early Blight": 0.008,
      "Tomato Leaf Mold": 0.004,
      "Septoria Spot": 0.003
    },
    description: "The submitted leaf exhibits vibrant green chlorophyll pigmentation, intact vascular veining, and normal cell structure with no visible pathogen spots.",
    cause: "Optimal plant nutrition and environmental care.",
    transmission: "N/A",
    favorableConditions: "Balanced sunlight, water, and soil fertility.",
    symptoms: [
      "Uniform vibrant green leaf color",
      "Clean leaf margins without brown lesions",
      "Strong turgid stem structure"
    ],
    riskFactors: [
      "Over-watering or nitrogen imbalance could trigger future stress"
    ],
    immediateActions: [
      "Maintain current watering and organic feeding regimen.",
      "Perform routine bi-weekly field monitoring."
    ],
    preventiveActions: [
      "Maintain balanced N-P-K soil fertilization.",
      "Keep field clear of invasive weed hosts."
    ],
    cropCarePlan: [
      { action: "Routine health check", priority: "Low", time: "Weekly" },
      { action: "Soil moisture monitoring", priority: "Low", time: "Regularly" }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.DISEASE_DATABASE = DISEASE_DATABASE;
}
