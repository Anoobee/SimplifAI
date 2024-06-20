
# SimplifAI

This is our health assistant who was developed to reduce the gap between you and complex medical terminology 

This is using Ollama as the inference engine, and it's running the anoob/simp2 quantized version


## Original Creator

- [BioMistral](https://huggingface.co/BioMistral)
- [paper]( https://arxiv.org/abs/2402.10373)

### Requirement

   - 8GB RAM
   - Strong CPU
   
## Prerequisites:


Install ollama:
```
curl -fsSL https://ollama.com/install.sh | sh
```

To pull the required model using Ollama, use the command below:
```
ollama run anoob/simp2
```

Test if the model is correctly installed and running by sending a request:
```
curl http://localhost:11434/api/generate -d '{
  "model": "anoob/simp2",
  "prompt":"Who are you?"
}'
```

Set up a virtual environment and activate it:
```
python3 -m venv .env
source .env/bin/activate
```

Install all the necessary Python packages from the requirements file:
```
pip3 install -r requirements.txt
```
