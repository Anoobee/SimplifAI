import argparse

from SimplifAI.backend.simplifai.reports.qa import QA

def parse_arguments():
    parser = argparse.ArgumentParser(description="Ask questions to your documents.")
    parser.add_argument("--no-rag", action='store_true', help="Get your answer without RAG")
    return parser.parse_args()

def main():
    args = parse_arguments()
    qa = QA(args)

    while True:
        query = input("Query?: ")
        if args.no_rag: 
            response = qa._ask_non_rag(query)

        else: 
            response = qa._ask_rag(query)

        print(f'Simplify: {response}')
        print("\n")

if __name__ == "__main__": main()