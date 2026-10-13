/**
 * FloraGuard AI - Main Dashboard Orchestrator
 */

import { PredictionEngine } from './prediction.js';
import { DISEASE_DATABASE } from '../data/diseases.js';

class FloraGuardDashboard {
  constructor() {
    this.engine = new PredictionEngine();
    this.initDOM();
  }

  initDOM() {
    document.addEventListener('DOMContentLoaded', () => {
      this.dropZone = document.getElementById('dropZone');
      this.fileInput = document.getElementById('fileInput');
      this.browseBtn = document.getElementById('browseFileBtn');
      this.scannerPreview = document.getElementById('scannerPreview');
      this.scannerImg = document.getElementById('scannerImg');
      this.laserOverlay = document.getElementById('laserOverlay');
      this.sampleList = document.getElementById('sampleGridList');

      this.chatToggleBtn = document.getElementById('chatToggleBtn');
      this.chatDrawer = document.getElementById('chatDrawer');
      this.closeChatBtn = document.getElementById('closeChatBtn');
      this.chatInput = document.getElementById('chatInput');
      this.sendChatBtn = document.getElementById('sendChatBtn');
      this.chatMessages = document.getElementById('chatMessages');

      this.bindEvents();
      this.renderSamples();
    });
  }

  bindEvents() {
    if (this.browseBtn && this.fileInput) {
      this.browseBtn.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleFile(e.target.files[0]);
        }
      });
    }

    if (this.dropZone) {
      this.dropZone.addEventListener('dragover', (e) => { e.preventDefault(); });
      this.dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleFile(e.dataTransfer.files[0]);
        }
      });
    }

    // Chatbot
    if (this.chatToggleBtn && this.chatDrawer) {
      this.chatToggleBtn.addEventListener('click', () => {
        this.chatDrawer.classList.toggle('open');
      });
    }

    if (this.closeChatBtn) {
      this.closeChatBtn.addEventListener('click', () => {
        this.chatDrawer.classList.remove('open');
      });
    }

    if (this.sendChatBtn && this.chatInput) {
      this.sendChatBtn.addEventListener('click', () => this.sendChatMessage());
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendChatMessage();
      });
    }
  }

  renderSamples() {
    if (!this.sampleList) return;

    const samples = [
      { key: "tomato_early_blight", title: "Tomato Early Blight", img: "assets/images/tomato_early_blight.png", desc: "Concentric target ring spots" },
      { key: "corn_common_rust", title: "Corn Common Rust", img: "assets/images/corn_rust.png", desc: "Brown cinnamon pustules" },
      { key: "potato_late_blight", title: "Potato Late Blight", img: "assets/images/potato_late_blight.png", desc: "Water-soaked dark lesions" },
      { key: "healthy_leaf", title: "Healthy Foliage", img: "assets/images/healthy_leaf.png", desc: "Clean green intact leaf" }
    ];

    this.sampleList.innerHTML = samples.map(s => `
      <div class="sample-item" data-key="${s.key}" data-img="${s.img}">
        <img src="${s.img}" alt="${s.title}" />
        <div>
          <strong style="font-size:14px; color:#fff;">${s.title}</strong>
          <p style="font-size:12px; color:#94a3b8;">${s.desc}</p>
        </div>
      </div>
    `).join('');

    this.sampleList.querySelectorAll('.sample-item').forEach(item => {
      item.addEventListener('click', () => {
        const key = item.getAttribute('data-key');
        const imgPath = item.getAttribute('data-img');
        this.runInference(imgPath, key);
      });
    });
  }

  handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.runInference(e.target.result, null, file.name);
    };
    reader.readAsDataURL(file);
  }

  runInference(src, hintKey = null, fileName = 'IMG-2026-716808') {
    if (this.scannerPreview && this.scannerImg) {
      this.scannerImg.src = src;
      this.scannerPreview.style.display = 'block';
    }

    if (this.laserOverlay) {
      this.laserOverlay.style.display = 'flex';
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setTimeout(() => {
        if (this.laserOverlay) this.laserOverlay.style.display = 'none';

        // Run prediction engine
        const prediction = this.engine.processImage(img, hintKey, fileName);

        // Redirect to official printable Report Page
        window.location.href = 'report.html';
      }, 1200);
    };
    img.src = src;
  }

  sendChatMessage() {
    const txt = this.chatInput.value.trim();
    if (!txt) return;

    this.appendChatMsg('user', txt);
    this.chatInput.value = '';

    setTimeout(() => {
      let reply = "I am FloraAI. You can upload a plant leaf image or test our preset samples to generate an official PDF Diagnostic Report!";
      if (txt.toLowerCase().includes('early blight') || txt.toLowerCase().includes('tomato')) {
        reply = "For Tomato Early Blight: Prune infected lower foliage, avoid overhead watering, and apply copper fungicide every 7 days.";
      }
      this.appendChatMsg('bot', reply);
    }, 800);
  }

  appendChatMsg(sender, text) {
    if (!this.chatMessages) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerText = text;
    this.chatMessages.appendChild(msg);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
}

new FloraGuardDashboard();
