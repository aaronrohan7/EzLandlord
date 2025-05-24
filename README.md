# PRISM Project – Optimizing Inference Efficiency of LLMs

**Team Gen AI | Cambridge Institute of Technology**

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-Latest-red.svg)](https://pytorch.org)
[![Transformers](https://img.shields.io/badge/🤗-Transformers-yellow.svg)](https://huggingface.co/transformers)

## 📌 Project Overview

This project focuses on optimizing the inference efficiency of Large Language Models (LLMs) using multiple performance-enhancing techniques without compromising output quality. We have implemented and tested various optimization methods to create a comprehensive inference pipeline.

### Optimization Techniques Implemented:
- **Quantization (INT8)** - Reduces model precision for faster computation
- **Speculative Decoding** - Uses caching mechanisms for improved performance
- **Baseline Comparison** - Reference implementation for performance benchmarking
- **Combined Optimization** - Integration of quantization and speculative decoding

## 🎯 Goals

Our inference pipeline is designed to:
- ✅ Reduce inference time significantly
- ✅ Minimize memory usage while maintaining quality
- ✅ Provide CLI-based modular control for easy testing
- ✅ Enable integration-ready design for future deployment scenarios

## 🧪 Model Information

**Primary Model:** [DistilGPT-2](https://huggingface.co/distilgpt2) from Hugging Face
- Lightweight variant of GPT-2 optimized for prompt generation tasks
- Ideal for text completion and generation workflows
- Reduced parameter count while maintaining competitive performance

## 📂 Project Structure

```
PRISM/
├── code/
│   ├── baseline.py             # Standard LLM inference implementation
│   ├── quant_model.py          # INT8 quantized model inference
│   ├── spec_decode.py          # Speculative decoding with caching
│   └── inference.py            # Unified CLI with all optimizations
├── diagrams/
│   ├── architecture_1.2.png    # System architecture diagrams
│   ├── architecture_2.1.png
│   └── architecture_2.4.png
├── benchmark_results.csv       # Performance metrics and timing data
├── demo_video.mp4              # CLI demonstration walkthrough
├── docs/
│   ├── End_Review_PPT.pptx     # Final presentation
│   └── Monthly_Connect_PPTs/   # Progress presentations
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
```bash
pip install torch transformers psutil
```

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-username/prism-llm-optimization.git
cd prism-llm-optimization

# Install dependencies
pip install -r requirements.txt
```

## 🚀 Usage

### Individual Optimization Modes

**Baseline Inference:**
```bash
python code/baseline.py
```

**Quantized Model (INT8):**
```bash
python code/quant_model.py
```

**Speculative Decoding:**
```bash
python code/spec_decode.py
```

**Combined Optimizations:**
```bash
python code/inference.py --both
```

### CLI Options
The unified CLI (`inference.py`) supports various flags:
- `--mode baseline` - Run standard inference
- `--mode quant` - Use INT8 quantization
- `--mode spec` - Enable speculative decoding
- `--both` - Apply both quantization and speculative decoding
- `--prompt "Your text here"` - Custom input prompt
- `--max-tokens 100` - Control output length

## 📊 Performance Benchmarks

| Optimization Mode | Inference Time (s) | Memory Usage (MB) | Token Count | Speed Improvement |
|-------------------|-------------------|-------------------|-------------|-------------------|
| **Baseline**      | 2.04              | 1690              | 51          | -                 |
| **Quantization**  | 1.44              | 1740              | 50          | 29.4% faster      |
| **Speculative**   | 1.48              | 1638              | 50          | 27.5% faster      |
| **Combined**      | 0.89              | 1743              | 50          | **56.4% faster**  |

> **Note:** Benchmarks conducted on standard hardware configuration. Results may vary based on system specifications.

## 🏗️ Architecture

Our optimization pipeline employs a modular architecture that allows for:
- Independent testing of optimization techniques
- Easy integration of new optimization methods
- Scalable deployment configurations
- Performance monitoring and analysis

Detailed architecture diagrams are available in the `diagrams/` directory.

## 🧠 Key Contributions

- **Modular CLI Integration** - Seamless switching between optimization modes
- **Comprehensive Benchmarking** - Real-world performance analysis across time, memory, and quality metrics
- **Visual Documentation** - Architecture diagrams and performance dashboards
- **Production-Ready Code** - Clean, documented, and reproducible implementation
- **Extensible Design** - Framework for adding additional optimization techniques

## 📎 Additional Resources

- 📋 **Model Documentation:** [Hugging Face DistilGPT-2](https://huggingface.co/distilgpt2)
- 📊 **Final Report:** `docs/End_Review_PPT.pptx`
- 🎥 **Demo Video:** `demo_video.mp4`
- 📈 **Progress Presentations:** `docs/Monthly_Connect_PPTs/`
- 📋 **Benchmark Data:** `benchmark_results.csv`

## 👥 Team Members

- **Gagan R** - Team Lead & Architecture Design
- **Aaron Rohan Raj** - Quantization Implementation
- **Sachith R** - Speculative Decoding Development
- **Tushar Mishra** - Benchmarking & Documentation

## 📅 Project Timeline

**Final Submission:** July 31, 2025  
**Guidelines:** SRI-B Academic Standards

## 🤝 Contributing

We welcome contributions to improve the optimization techniques or extend the framework. Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description


## 🙏 Acknowledgements

Special thanks to the Hugging Face team for providing the DistilGPT-2 model and the open-source community for the foundational tools that made this project possible.

