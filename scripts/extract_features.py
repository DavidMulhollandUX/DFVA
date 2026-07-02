#!/usr/bin/env python3
"""Extract NLP features from handbook course data."""
import json, re, csv
from collections import Counter

AI_TERMS = {
    "machine learning", "artificial intelligence", "neural network",
    "deep learning", "natural language processing", "computer vision",
    "data science", "ai ethics", "robotics", "automation", "algorithm",
    "llm", "transformer", "generative ai", "prompt engineering"
}
RESEARCH_TERMS = {
    "research", "thesis", "dissertation", "methodology", "experiment",
    "literature review", "hypothesis", "data collection", "analysis",
    "publication", "peer review", "conference", "journal"
}
CAREER_TERMS = {
    "career", "industry", "professional", "workplace", "employer",
    "graduate", "internship", "placement", "job", "role", "salary"
}
QUANT_TERMS = {
    "statistics", "mathematics", "calculus", "algebra", "probability",
    "modelling", "simulation", "quantitative", "numerical", "computation"
}

def extract_features(markdown: str) -> dict:
    text = markdown.lower()
    words = set(re.findall(r'\b[a-z]{3,}\b', text))
    
    features = {}
    features["word_count"] = len(text.split())
    features["link_count"] = len(re.findall(r'\[([^\]]+)\]\(([^)]+)\)', markdown))
    features["subject_count"] = len(re.findall(r'subject|core|elective|credit points', text))
    
    for name, terms in [("ai", AI_TERMS), ("research", RESEARCH_TERMS),
                         ("career", CAREER_TERMS), ("quant", QUANT_TERMS)]:
        count = sum(text.count(t) for t in terms)
        features[f"{name}_terms"] = count
        features[f"{name}_density"] = round(count / max(len(text.split()), 1), 6)
    
    features["has_course_structure"] = 1 if "course structure" in text else 0
    features["has_career_outcomes"] = 1 if "career" in text else 0
    return features

def main():
    with open("data/handbook_data.json") as f:
        handbooks = json.load(f)
    with open("data/programs_dataset.json") as f:
        programs = json.load(f)
    
    hb_map = {h["code"]: h for h in handbooks}
    
    with open("data/feature_matrix.csv", "w", newline="") as csvfile:
        # Get feature names from first successful extraction
        first = next((h for h in handbooks if h["success"]), None)
        if not first:
            print("ERROR: no successful scrapes")
            return
        sample_features = extract_features(first["markdown"])
        fieldnames = ["code"] + list(sample_features.keys())
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for p in programs:
            hb = hb_map.get(p["code"])
            if not hb or not hb["success"]:
                continue
            features = extract_features(hb["markdown"])
            features["code"] = p["code"]
            writer.writerow(features)
    
    with open("data/feature_matrix.csv") as f:
        rows = list(csv.reader(f))
    print(f"Feature matrix: {len(rows)-1} rows, {len(rows[0])-1} features")

if __name__ == "__main__":
    main()
