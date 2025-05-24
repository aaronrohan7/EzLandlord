PRISM Project – Optimizing Inference Efficiency of LLMs
Team Gen AI | Cambridge Institute of Technology
📌 Project Overview
This project aims to optimize the inference efficiency of Large Language Models (LLMs) using multiple performance-enhancing techniques without compromising output quality. We tested and integrated the following methods:
- Quantization (INT8)
- Speculative Decoding (via caching)
- Baseline comparison
- Combined optimization (Quant + Spec)
🎯 Goal
To build an inference pipeline that:
- Reduces inference time
- Minimizes memory usage
- Provides CLI-based modular control
- Enables integration-ready design for future deployment
🧪 Models Used
• distilgpt2 from Hugging Face → https://huggingface.co/distilgpt2
• Optimized for prompt generation tasks (text output)
📂 Folder Structure
root/
├── code/
│   ├── baseline.py             # Basic LLM inference
│   ├── quant_model.py          # Quantized model inference
│   ├── spec_decode.py          # Speculative decoding
│   └── inference.py            # Integrated CLI version
├── diagrams/
│   ├── architecture_1.2.png
│   ├── architecture_2.1.png
│   └── architecture_2.4.png
├── benchmark_results.csv       # Timing/memory results
├── demo_video.mp4              # Walkthrough of CLI execution
├── docs/
│   ├── End_Review_PPT.pptx
│   └── Monthly_Connect_PPTs/
└── README.md
⚙️ How to Run
Requirements:
• pip install torch transformers psutil
Scripts:
• Baseline:
  python code/baseline.py
• Quantized:
  python code/quant_model.py
• Speculative Decoding:
  python code/spec_decode.py
• Combined (Quant + Spec):
  python code/inference.py --both
📊 Benchmarked Metrics
Mode	Inference Time (s)	Memory Usage (MB)	Token Count
Baseline	2.04	1690	51
Quant	1.44	1740	50
Spec	1.48	1638	50
Both	0.89	1743	50
🧠 Key Contributions
• CLI integration of multiple optimization techniques
• Real-world benchmarking (time/memory/token analysis)
• Visual dashboards and architecture diagrams
• Clean, reproducible code structure
📎 Resources
• Hugging Face DistilGPT2: https://huggingface.co/distilgpt2
• Report: docs/End_Review_PPT.pptx
• Demo video: demo_video.mp4
• Monthly PPTs: docs/Monthly_Connect_PPTs/
🧑‍💻 Team
• Gagan R
• Aaron CIT
• Sachith CIT
• Tushar Mishra CIT
📅 Final Submission Deadline
All materials will be uploaded by May 30, 2025, as per SRI-B guidelines.
