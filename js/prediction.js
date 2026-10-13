/**
 * FloraGuard AI - Prediction & Image Classification Engine
 * Analyzes leaf images and generates prediction JSON payload for diagnostic reports.
 */

import { DISEASE_DATABASE } from '../data/diseases.js';

export class PredictionEngine {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
  }

  /**
   * Run computer-vision feature extraction and classify disease
   * @param {HTMLImageElement|HTMLCanvasElement} imgElement 
   * @param {string} diseaseHint Optional preset hint
   * @param {string} fileName Optional filename
   * @returns {Object} Standard Prediction JSON Payload
   */
  processImage(imgElement, diseaseHint = null, fileName = 'IMG-2026-716808') {
    const width = imgElement.naturalWidth || imgElement.width || 1024;
    const height = imgElement.naturalHeight || imgElement.height || 768;

    this.canvas.width = Math.min(width, 600);
    this.canvas.height = Math.round((height * this.canvas.width) / width);

    this.ctx.drawImage(imgElement, 0, 0, this.canvas.width, this.canvas.height);
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imgData.data;

    let greenCount = 0;
    let yellowCount = 0;
    let brownCount = 0;
    const totalPixels = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const sum = r + g + b || 1;
      const gRatio = g / sum;
      const rRatio = r / sum;

      if (gRatio > 0.38 && g > r && g > b) greenCount++;
      else if (r > 130 && g > 130 && b < 100) yellowCount++;
      else if (r > g && r > 60 && g < 140) brownCount++;
    }

    const brownRatio = brownCount / totalPixels;
    const yellowRatio = yellowCount / totalPixels;

    // Determine target disease key
    let targetKey = diseaseHint || 'tomato_early_blight';

    if (!diseaseHint) {
      if (greenCount / totalPixels > 0.75) targetKey = 'healthy_leaf';
      else if (brownRatio > 0.10) targetKey = 'tomato_early_blight';
      else if (yellowRatio > 0.12) targetKey = 'tomato_late_blight';
      else targetKey = 'corn_common_rust';
    }

    const diseaseDetails = DISEASE_DATABASE[targetKey] || DISEASE_DATABASE['tomato_early_blight'];
    const now = new Date();

    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // Generate Payload
    const predictionPayload = {
      reportId: `FLORA-DIAG-${Math.floor(700000 + Math.random() * 90000)}`,
      date: formattedDate,
      time: formattedTime,
      timestamp: `${formattedDate} | ${formattedTime}`,
      plant: diseaseDetails.plant,
      disease: diseaseDetails.disease,
      diseaseKey: diseaseDetails.diseaseKey,
      pathogen: diseaseDetails.pathogen,
      category: diseaseDetails.category,
      severity: diseaseDetails.severity,
      severityScore: diseaseDetails.severityScore,
      confidence: diseaseDetails.confidence,
      confidencePercent: `${(diseaseDetails.confidence * 100).toFixed(1)}%`,
      probabilities: diseaseDetails.probabilities,
      symptoms: diseaseDetails.symptoms,
      riskFactors: diseaseDetails.riskFactors,
      immediateActions: diseaseDetails.immediateActions,
      preventiveActions: diseaseDetails.preventiveActions,
      cropCarePlan: diseaseDetails.cropCarePlan,
      description: diseaseDetails.description,
      cause: diseaseDetails.cause,
      transmission: diseaseDetails.transmission,
      favorableConditions: diseaseDetails.favorableConditions,
      imageSrc: imgElement.src,
      imageResolution: `${width} × ${height}`,
      imageFormat: fileName.toLowerCase().endsWith('.png') ? 'PNG' : 'JPG / PNG',
      imageFileName: fileName
    };

    // Store in SessionStorage for Report Page
    try {
      sessionStorage.setItem('floraGuardActivePrediction', JSON.stringify(predictionPayload));
    } catch (e) {
      console.warn('SessionStorage failed, using window object', e);
    }
    window.floraGuardActivePrediction = predictionPayload;

    return predictionPayload;
  }
}
