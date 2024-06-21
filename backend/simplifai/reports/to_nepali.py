
from transformers import pipeline


pipe = pipeline("text2text-generation", model="/Users/aashishkarki/Desktop/MobileDev/Projects/my_awesome_english_to_nepali_tst")

def nepali_translator(text):
    return pipe(text)[0]['generated_text']


# sample_text = "Are you gay?"


# translated_text = translate_text(sample_text)

