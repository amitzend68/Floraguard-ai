/**
 * FloraGuard AI - Diagnostic Report Renderer & Exporter Script
 * Dynamically populates printable A4 laboratory report and manages PDF export.
 */

const FALLBACK_DATA = {
  reportId: "FLORA-DIAG-716808",
  date: "10/04/2026",
  time: "01:11 PM",
  timestamp: "10/04/2026 | 01:11 PM",
  plant: "Tomato",
  disease: "Tomato Early Blight",
  diseaseKey: "tomato_early_blight",
  pathogen: "Alternaria solani",
  category: "Fungal Disease",
  severity: "Moderate",
  severityScore: 62,
  confidence: 0.946,
  confidencePercent: "94.6%",
  probabilities: {
    "Tomato Early Blight": 0.946,
    "Tomato Leaf Mold": 0.028,
    "Tomato Septoria Leaf Spot": 0.017,
    "Healthy": 0.009
  },
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
  ],
  description: "Early blight is a common fungal disease affecting tomato plants. It produces dark concentric target spots on older leaves, leading to chlorotic yellow halos, leaf wilting, defoliation, and reduced plant vigor as the infection progresses.",
  cause: "Fungal infection caused by soil-borne spores of Alternaria solani.",
  transmission: "Spores overwinter in infected plant debris and soil, spreading via wind, rain splashes, and gardening equipment.",
  favorableConditions: "Warm temperatures (24°C - 29°C / 75°F - 85°F) combined with high relative humidity and prolonged leaf moisture.",
  imageSrc: "assets/images/tomato_early_blight.png",
  imageResolution: "1024 × 768",
  imageFormat: "JPG / PNG",
  imageFileName: "IMG-2026-716808"
};

export class ReportRenderer {
  constructor() {
    this.data = this.loadPredictionData();
    this.init();
  }

  loadPredictionData() {
    try {
      const stored = sessionStorage.getItem('floraGuardActivePrediction');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Unable to load from sessionStorage:', e);
    }

    if (typeof window !== 'undefined' && window.floraGuardActivePrediction) {
      return window.floraGuardActivePrediction;
    }

    if (typeof window !== 'undefined' && window.DISEASE_DATABASE && window.DISEASE_DATABASE['tomato_early_blight']) {
      const db = window.DISEASE_DATABASE['tomato_early_blight'];
      return {
        ...FALLBACK_DATA,
        ...db,
        confidencePercent: `${(db.confidence * 100).toFixed(1)}%`
      };
    }

    return FALLBACK_DATA;
  }

  init() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      this.executeRender();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.executeRender();
      });
    }
  }

  executeRender() {
    this.renderAllSections();
    this.renderProbabilityChart();
    this.bindButtons();
  }

  renderAllSections() {
    const d = this.data;

    // Header & Meta
    this.setElementText('reportIdVal', d.reportId || 'FLORA-DIAG-716808');
    this.setElementText('reportDateVal', d.date || '10/04/2026');
    this.setElementText('reportTimeVal', d.time || '01:11 PM');
    this.setElementText('footerReportId', d.reportId || 'FLORA-DIAG-716808');
    this.setElementText('footerDateTime', d.timestamp || '10/04/2026 | 01:11 PM');

    // Summary Title Banner
    this.setElementText('sumPlant', d.plant || 'Tomato');
    this.setElementText('sumDisease', d.disease || 'Tomato Early Blight');
    this.setElementText('sumStatus', (d.severityScore && d.severityScore > 10) ? 'DISEASE DETECTED' : 'HEALTHY CANOPY');
    this.setElementText('sumConfidence', d.confidencePercent || '94.6%');
    this.setElementText('sumSeverity', d.severity || 'Moderate');

    // Executive Summary Text
    const execSummary = `FloraGuard AI analyzed the submitted leaf image using an image-classification model. The system identified visual characteristics associated with ${d.disease || 'Tomato Early Blight'} with a confidence score of ${d.confidencePercent || '94.6%'}. The detected condition is classified as ${(d.severity || 'moderate').toLowerCase()} severity based on the visible symptoms in the submitted image.`;
    this.setElementText('executiveSummaryText', execSummary);

    // Input Image Analysis Table & Image
    const leafImg = document.getElementById('inputLeafImage');
    if (leafImg) leafImg.src = d.imageSrc || 'assets/images/tomato_early_blight.png';
    this.setElementText('imgMetaId', d.imageFileName || 'IMG-2026-716808');
    this.setElementText('imgMetaPlant', d.plant || 'Tomato');
    this.setElementText('imgMetaFormat', d.imageFormat || 'JPG / PNG');
    this.setElementText('imgMetaResolution', d.imageResolution || '1024 × 768');

    // Detected Disease Card
    this.setElementText('dCardName', d.disease || 'Tomato Early Blight');
    this.setElementText('dCardPathogen', d.pathogen || 'Alternaria solani');
    this.setElementText('dCardCategory', d.category || 'Fungal Disease');
    this.setElementText('dCardPlant', d.plant || 'Tomato');
    this.setElementText('dCardStatus', (d.severityScore && d.severityScore > 10) ? 'Detected' : 'Normal');
    this.setElementText('dCardConfidence', d.confidencePercent || '94.6%');
    this.setElementText('dCardSeverity', d.severity || 'Moderate');

    // Description & Etiology
    this.setElementText('diseaseDescriptionText', d.description || FALLBACK_DATA.description);
    this.setElementText('dCauseText', d.cause || FALLBACK_DATA.cause);
    this.setElementText('dPathogenText', d.pathogen || 'Alternaria solani');
    this.setElementText('dConditionsText', d.favorableConditions || FALLBACK_DATA.favorableConditions);
    this.setElementText('dTransmissionText', d.transmission || FALLBACK_DATA.transmission);

    // Symptoms List Grid
    const symptomsContainer = document.getElementById('symptomsGrid');
    const symptomsList = d.symptoms || FALLBACK_DATA.symptoms;
    if (symptomsContainer && symptomsList) {
      symptomsContainer.innerHTML = symptomsList.map(s => `
        <div class="symptom-card">
          <span class="symptom-icon">✓</span>
          <span>${s}</span>
        </div>
      `).join('');
    }

    // Causes & Risk Factors
    const riskContainer = document.getElementById('riskFactorsList');
    const riskList = d.riskFactors || FALLBACK_DATA.riskFactors;
    if (riskContainer && riskList) {
      riskContainer.innerHTML = riskList.map(r => `<li>${r}</li>`).join('');
    }

    // Severity Progress Bar & Score
    const sevScore = d.severityScore || 62;
    this.setElementText('severityScoreVal', `${sevScore} / 100`);
    const severityBar = document.getElementById('severityBarFill');
    if (severityBar) {
      severityBar.style.width = `${sevScore}%`;
    }

    // AI Model Info Table
    this.setElementText('aiConfidenceVal', d.confidencePercent || '94.6%');

    // Crop Care Actions (Immediate & Preventive)
    const immediateContainer = document.getElementById('immediateActionsList');
    const immediateList = d.immediateActions || FALLBACK_DATA.immediateActions;
    if (immediateContainer && immediateList) {
      immediateContainer.innerHTML = immediateList.map((act, i) => `<li><strong>${i + 1}.</strong> ${act}</li>`).join('');
    }

    const prevContainer = document.getElementById('preventiveActionsList');
    const prevList = d.preventiveActions || FALLBACK_DATA.preventiveActions;
    if (prevContainer && prevList) {
      prevContainer.innerHTML = prevList.map(p => `<li>• ${p}</li>`).join('');
    }

    // Crop Care Plan Table
    const planTableBody = document.getElementById('cropCarePlanBody');
    const planList = d.cropCarePlan || FALLBACK_DATA.cropCarePlan;
    if (planTableBody && planList) {
      planTableBody.innerHTML = planList.map(row => `
        <tr>
          <td><strong>${row.action}</strong></td>
          <td><span class="badge-ai-diagnosis" style="background:${row.priority === 'High' ? '#fee2e2' : '#fef3c7'}; color:${row.priority === 'High' ? '#991b1b' : '#92400e'}">${row.priority}</span></td>
          <td>${row.time}</td>
        </tr>
      `).join('');
    }

    // Diagnostic Confidence Visual Meter
    const confPerc = d.confidencePercent || '94.6%';
    const confVal = d.confidence || 0.946;
    this.setElementText('confidenceBigVal', confPerc);
    const circleVal = document.getElementById('circleValMeter');
    if (circleVal) {
      const radius = 34;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (confVal * circumference);
      circleVal.style.strokeDasharray = `${circumference}`;
      circleVal.style.strokeDashoffset = `${offset}`;
    }

    // Summary Card at Bottom
    this.setElementText('finalSumPlant', d.plant || 'Tomato');
    this.setElementText('finalSumDisease', d.disease || 'Tomato Early Blight');
    this.setElementText('finalSumCategory', d.category || 'Fungal');
    this.setElementText('finalSumSeverity', d.severity || 'Moderate');
    this.setElementText('finalSumConfidence', confPerc);
  }

  renderProbabilityChart() {
    const tableBody = document.getElementById('probabilityTableBody');
    const probs = this.data.probabilities || { "Tomato Early Blight": 0.946, "Tomato Leaf Mold": 0.028, "Tomato Septoria Leaf Spot": 0.017, "Healthy": 0.009 };

    if (tableBody) {
      tableBody.innerHTML = Object.entries(probs).map(([cls, prob], idx) => `
        <tr style="${idx === 0 ? 'background:#f0fdf4; font-weight:bold;' : ''}">
          <td>${cls} ${idx === 0 ? '👑 (Predicted)' : ''}</td>
          <td>${(prob * 100).toFixed(1)}%</td>
        </tr>
      `).join('');
    }

    // Render Chart.js Canvas
    const ctx = document.getElementById('probabilityChart');
    if (ctx && window.Chart) {
      const labels = Object.keys(probs);
      const values = Object.values(probs).map(v => (v * 100).toFixed(1));

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Probability (%)',
            data: values,
            backgroundColor: values.map((_, i) => i === 0 ? '#059669' : '#cbd5e1'),
            borderRadius: 4
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { max: 100, grid: { color: '#f1f5f9' } },
            y: { grid: { display: false } }
          }
        }
      });
    }
  }

  setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  }

  bindButtons() {
    const backBtn = document.getElementById('backDashboardBtn');
    if (backBtn) {
      backBtn.onclick = () => { window.location.href = 'index.html'; };
    }

    const printBtn = document.getElementById('printReportBtn');
    if (printBtn) {
      printBtn.onclick = () => { window.print(); };
    }

    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
      downloadPdfBtn.onclick = () => {
        if (window.html2pdf) {
          const element = document.getElementById('printableReportPaper');
          const opt = {
            margin: 10,
            filename: `FloraGuard_Report_${this.data.reportId || '716808'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };
          html2pdf().set(opt).from(element).save();
        } else {
          window.print();
        }
      };
    }

    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    if (newAnalysisBtn) {
      newAnalysisBtn.onclick = () => {
        try { sessionStorage.removeItem('floraGuardActivePrediction'); } catch (e) {}
        window.location.href = 'index.html';
      };
    }
  }
}

if (typeof window !== 'undefined') {
  window.ReportRenderer = ReportRenderer;
  window.activeReportRenderer = new ReportRenderer();
}
