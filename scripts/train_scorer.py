#!/usr/bin/env python3
"""Train ML model (pure Python linear regression) and validate against manual scores."""
import json, csv, pickle

def mean(xs): return sum(xs) / len(xs)

def ridge_regression(X, y, alpha=0.1):
    """Ridge regression (L2 regularization). Returns (betas, intercept, mae)."""
    n = len(X)
    k = len(X[0]) if X else 0
    if n < 2 or k == 0:
        return (None, 0), float('inf')
    
    # Standardize features
    x_means = [mean([X[i][j] for i in range(n)]) for j in range(k)]
    x_stds = []
    for j in range(k):
        values = [X[i][j] for i in range(n)]
        avg = x_means[j]
        std = (sum((v - avg)**2 for v in values) / n) ** 0.5
        x_stds.append(std if std > 1e-10 else 1.0)
    
    X_std = [[(X[i][j] - x_means[j]) / x_stds[j] for j in range(k)] for i in range(n)]
    y_mean = mean(y)
    y_centered = [yi - y_mean for yi in y]
    
    # Ridge: (X^T X + alpha*I)^(-1) X^T y
    # Build augmented system
    aug = [[0.0] * (k + 1) for _ in range(k)]
    for j in range(k):
        for m in range(k):
            aug[j][m] = sum(X_std[i][j] * X_std[i][m] for i in range(n))
        aug[j][j] += alpha  # Ridge penalty
        aug[j][k] = sum(X_std[i][j] * y_centered[i] for i in range(n))
    
    # Gaussian elimination
    for col in range(k):
        pivot = col
        for row in range(col + 1, k):
            if abs(aug[row][col]) > abs(aug[pivot][col]):
                pivot = row
        aug[col], aug[pivot] = aug[pivot], aug[col]
        if abs(aug[col][col]) < 1e-10:
            return (None, 0), float('inf')
        piv = aug[col][col]
        for j in range(col, k + 1):
            aug[col][j] /= piv
        for row in range(k):
            if row != col:
                f = aug[row][col]
                for j in range(col, k + 1):
                    aug[row][j] -= f * aug[col][j]
    
    betas_std = [aug[i][k] for i in range(k)]
    betas = [betas_std[j] / x_stds[j] for j in range(k)]
    intercept = y_mean - sum(betas[j] * x_means[j] for j in range(k))
    
    # Train MAE on full data
    errors = []
    for i in range(n):
        pred = intercept + sum(betas[j] * X[i][j] for j in range(k))
        errors.append(abs(pred - y[i]))
    
    mae = mean(errors)
    return (betas, intercept), mae

def main():
    with open("data/feature_matrix.csv") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    
    codes = [r["code"] for r in rows]
    feature_names = [k for k in reader.fieldnames if k != "code"]
    X = [[float(r[k]) for k in feature_names] for r in rows]
    
    with open("data/programs_dataset.json") as f:
        programs = json.load(f)
    score_map = {p["code"]: p["scores"] for p in programs if p["scores"]}
    
    all_dims = sorted(set().union(*[set(s.keys()) for s in score_map.values()]))
    
    models = {}
    model_info = {}
    validation = {}
    report_lines = ["# ML Scoring Validation Report\n",
                     f"Pure Python linear regression. {len(codes)} programs, {len(feature_names)} features.\n"]
    
    for dim in all_dims:
        y = [score_map.get(code, {}).get(dim, 0) for code in codes]
        if len(set(y)) < 2:
            print(f"  {dim}: insufficient variance, skipping")
            continue
        
        result = ridge_regression(X, y)
        if result[0] is None:
            print(f"  {dim}: singular matrix, skipping")
            continue
        
        (betas, intercept), mae = result
        models[dim] = (betas, intercept)
        model_info[dim] = {"coefficients": {feature_names[j]: round(betas[j], 4) for j in range(len(betas))},
                           "intercept": round(intercept, 4)}
        validation[dim] = {"mae": round(mae, 2), "samples": len(y)}
        print(f"  {dim}: MAE={mae:.2f} (n={len(y)})")
    
    # Save
    with open("data/trained_model.pkl", "wb") as f:
        pickle.dump({"models": models, "features": feature_names, "info": model_info}, f)
    with open("data/model_validation.json", "w") as f:
        json.dump(validation, f, indent=2)
    print(f"Saved {len(models)} models")
    
    # Validate
    anomalies = []
    for i, code in enumerate(codes):
        manual = score_map.get(code, {})
        report_lines.append(f"## {code}")
        report_lines.append("| Dimension | Manual | ML Pred | Diff |")
        report_lines.append("|-----------|--------|---------|------|")
        
        for dim in sorted(manual.keys()):
            if dim in models:
                betas, intercept = models[dim]
                pred = intercept + sum(betas[j] * X[i][j] for j in range(len(betas)))
                pred = max(0, min(3, round(pred, 1)))
                manual_val = manual[dim]
                diff = round(abs(manual_val - pred), 1)
                flag = " ⚠️" if diff > 1.0 else ""
                report_lines.append(f"| {dim} | {manual_val} | {pred} | {diff}{flag} |")
                if diff > 1.0:
                    anomalies.append({"code": code, "dimension": dim, "manual": manual_val, "predicted": pred, "diff": diff})
        report_lines.append("")
    
    report_lines.append(f"## Anomalies ({len(anomalies)})")
    for a in anomalies:
        report_lines.append(f"- **{a['code']}** — {a['dimension']}: manual={a['manual']}, ML={a['predicted']} (Δ{a['diff']:.1f})")
    
    report = "\n".join(report_lines)
    with open("data/validation_report.md", "w") as f:
        f.write(report)
    print(report)

if __name__ == "__main__":
    main()
